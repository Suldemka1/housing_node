import { AfterLoad, ViewColumn, ViewEntity } from 'typeorm';
import { ParticipantEntity } from '../../participant/participant.entity';
import FamilyEntity from '../../family/family.entity';
import { QueueEntity } from '../../queue/queue.entity';
import { DocumentFilesView } from '../../files/view/document_files.view';
import { ParticipantView } from '../../participant/views/participant_view';
import { ParticipantDocumentView } from '../../document/views/participant_document.view';

type ApplicationParticipantView = Pick<
  ParticipantEntity,
  'id' | 'surname' | 'name' | 'patronymic'
> & {
  documents: string;
};

@ViewEntity({
  dependsOn: [DocumentFilesView, ParticipantView, ParticipantDocumentView],
  expression: `
      SELECT a.id                                                               as id,
             jsonb_build_object(
                     'id', a.id,
                     'reason', a.reason,
                     'status', a.status,
                     'acceptedAt', a.accepted_at,
                     'createdAt', a.created_at
             )                                                                  AS application,
             jsonb_build_object(
                     'id', p.id,
                     'surname', p.surname,
                     'name', p.name,
                     'patronymic', p.patronymic,
                     'documents', pdv_p.documents::text
             )                                                                  AS applicant,
             jsonb_build_object(
                     'id', s.id,
                     'surname', s.surname,
                     'name', s.name,
                     'patronymic', s.patronymic,
                     'documents', pdv_s.documents::text
             )                                                                  AS spouse,
             json_agg(
                     jsonb_build_object(
                             'id', c.id,
                             'surname', c.surname,
                             'name', c.name,
                             'patronymic', c.patronymic,
                             'documents', pdv_c.documents::text
                     )
             )                                                                  AS children,
             jsonb_build_object(
                     'id', f.id,
                     'is_married', f.is_married,
                     'isLarge', f.is_large
             )                                                                  AS family,
             jsonb_build_object(
                     'id', re.id,
                     'sqm_price', re.sqm_price,
                     'full_price', re.full_price,
                     'area', re.area,
                     'support_amount', re.support_amount
             )                                                                  AS real_estate,
             jsonb_build_object('id', q.id, 'type', q.type, 'number', q.number) as queue
      FROM application a
               LEFT JOIN participant p ON p.id = a.applicant_id
               LEFT JOIN participant_document_view pdv_p
                         ON pdv_p.id = p.id
               LEFT JOIN participant s ON s.id = p.spouse_id
               LEFT JOIN participant_document_view pdv_s ON pdv_s.id = s.id
               LEFT JOIN parent_children pc ON pc.parent_id = p.id
               LEFT JOIN participant c ON c.id = pc.children_id
               LEFT JOIN participant_document_view pdv_c ON pdv_c.id = c.id
               LEFT JOIN documents cd ON cd.participant_id = c.id
               LEFT JOIN family f ON f.id = p.family_id
               LEFT JOIN real_estate re ON re.id = a.real_estate_id
               LEFT JOIN queue q ON q.application_id = a.id
      GROUP BY a.id, p.id, s.id, c.id, f.id, re.id, q.id,
               pdv_p.documents::text, pdv_s.documents::text, pdv_c.documents::text;
  `,
})
class ApplicationViewEntity {
  @ViewColumn()
  id: number;

  @ViewColumn()
  application: {
    id: number;
    reason: string;
    status: string;
    createdAt: string;
    acceptedAt: string;
  };

  @ViewColumn()
  applicant: ApplicationParticipantView;

  @ViewColumn()
  spouse: ApplicationParticipantView;

  @ViewColumn()
  children: Array<ApplicationParticipantView>;

  @ViewColumn({
    name: 'family',
  })
  family: Pick<FamilyEntity, 'id' | 'isLarge' | 'isMarried'>;

  @ViewColumn()
  real_estate: {
    id: number;
    pricePerMeter: number;
    realEstatePrice: number;
    area: number;
    supportAmount: number;
  };

  @ViewColumn()
  queue: Pick<QueueEntity, 'id' | 'type' | 'number'>;

  @AfterLoad()
  console() {
    this.applicant.documents = JSON.parse(this.applicant.documents);
    this.spouse.documents = JSON.parse(this.spouse.documents);

    for (const child of this.children) {
      child.documents = JSON.parse(child.documents);
    }
  }
}

export { ApplicationViewEntity };

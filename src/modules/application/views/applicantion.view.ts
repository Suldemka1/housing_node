import { AfterLoad, ViewColumn, ViewEntity } from 'typeorm';
import { ParticipantEntity } from '../../participant/participant.entity';
import FamilyEntity from '../../family/family.entity';
import { QueueEntity } from '../../queue/queue.entity';
import { DocumentFilesView } from '../../files/view/document_files.view';
import { ParticipantView } from '../../participant/views/participant_view';
import { ParticipantDocumentView } from '../../document/views/participant_document.view';
import { FamilyDocumentsView } from '../../family/views/family_documents.view';

type ApplicationParticipantView = Pick<
  ParticipantEntity,
  'id' | 'surname' | 'name' | 'patronymic'
> & {
  documents: string;
};

type ApplicationFamilyView = Pick<
  FamilyEntity,
  'id' | 'isLarge' | 'isMarried'
> & {
  documents: string;
};

@ViewEntity({
  dependsOn: [
    DocumentFilesView,
    ParticipantView,
    ParticipantDocumentView,
    FamilyDocumentsView,
  ],
  expression: `
      SELECT a.id                                                               as id,
             jsonb_build_object(
                     'id', a.id,
                     'reason', a.reason,
                     'status', a.status,
                     'accepted_at', a.accepted_at,
                     'created_at', a.created_at
             )                                                                  AS application,
             jsonb_build_object(
                     'id', p.id,
                     'surname', p.surname,
                     'name', p.name,
                     'patronymic', p.patronymic,
                     'documents', pdv_p.documents::text
             )                                                                  AS applicant,
             CASE WHEN s.id IS NULL THEN NULL ELSE jsonb_build_object(
                     'id', s.id,
                     'surname', s.surname,
                     'name', s.name,
                     'patronymic', s.patronymic,
                     'documents', pdv_s.documents::text
             ) END                                                                 AS spouse,
             CASE
                 WHEN count(c) = 0 THEN '[]'::json
                 ELSE json_agg(
                         jsonb_build_object(
                                 'id', c.id,
                                 'surname', c.surname,
                                 'name', c.name,
                                 'patronymic', c.patronymic,
                                 'documents', pdv_c.documents::text
                         )
                      ) END                                                     AS children,
             jsonb_build_object(
                     'id', f.id,
                     'is_married', f.is_married,
                     'is_large', f.is_large,
                     'documents', fdv.documents::text
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
                         ON pdv_p.participant_id = p.id
               LEFT JOIN participant s ON s.id = p.spouse_id
               LEFT JOIN participant_document_view pdv_s ON pdv_s.participant_id = s.id
               LEFT JOIN parent_children pc ON pc.parent_id = p.id
               LEFT JOIN participant c ON c.id = pc.children_id
               LEFT JOIN participant_document_view pdv_c ON pdv_c.participant_id = c.id
               LEFT JOIN documents cd ON cd.participant_id = c.id
               LEFT JOIN family f ON f.id = p.family_id
               LEFT JOIN family_documents_view fdv ON fdv.id = f.id
               LEFT JOIN real_estate re ON re.id = a.real_estate_id
               LEFT JOIN queue q ON q.application_id = a.id
      GROUP BY a.id, p.id, s.id, c.id, f.id, re.id, q.id,
               pdv_p.documents::text, pdv_s.documents::text, pdv_c.documents::text, fdv.documents::text;
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
    created_at: string;
    accepted_at: string;
  };

  @ViewColumn()
  applicant: ApplicationParticipantView;

  @ViewColumn()
  spouse: ApplicationParticipantView | null;

  @ViewColumn()
  children: Array<ApplicationParticipantView>;

  @ViewColumn({
    name: 'family',
  })
  family: ApplicationFamilyView;

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
    if (this.spouse != null) {
      this.spouse.documents = JSON.parse(this.spouse.documents);
    }

    this.family.documents = JSON.parse(this.family.documents);

    for (const child of this.children) {
      child.documents = JSON.parse(child.documents);
    }
  }
}

export { ApplicationViewEntity };

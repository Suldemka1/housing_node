import { ViewColumn, ViewEntity } from 'typeorm';
import { DocumentFilesView } from '../../files/view/document_files.view';

@ViewEntity({
  dependsOn: [DocumentFilesView],
  expression: `
      SELECT p.id AS participant_id,
             json_agg(
                     json_build_object(
                             'id', d.id,
                             'type', d.type,
                             'data', CASE
                                         WHEN d.type = 'PASSPORT' THEN json_build_object(
                                                 'series', pass.series,
                                                 'number', pass.number,
                                                 'birthdate', pass.birthdate,
                                                 'issued_date', pass.issued_date,
                                                 'issuer', pass.issuer
                                                                       )
                                         WHEN d.type = 'BIRTH_CERTIFICATE' THEN json_build_object(
                                                 'series', bc.series,
                                                 'number', bc.number,
                                                 'birthdate', bc.birthdate,
                                                 'issued_date', bc.issued_date,
                                                 'issuer', bc.issuer
                                                                                )
                                         WHEN d.type = 'MARRIAGE_CERTIFICATE' THEN json_build_object(
                                                 'series', mc.series,
                                                 'number', mc.number,
                                                 'issued_date', mc.issued_date,
                                                 'issuer', mc.issuer
                                                                                   )
                                         WHEN d.type = 'DIVORCE_CERTIFICATE' THEN json_build_object(
                                                 'number', dc.id
                                                                                  )
                                 END
                     )
             )    AS documents
      FROM participant p
               left join documents d on p.id = d.participant_id
               LEFT JOIN passports pass ON pass.id = d.id
               LEFT JOIN birth_certificate bc ON bc.id = d.id
               LEFT JOIN marriage_certificates mc ON mc.id = d.id
               LEFT JOIN divorce_certificates dc ON dc.id = d.id
      GROUP BY p.id, d.type;
  `,
})
class ParticipantDocumentView {
  @ViewColumn()
  participant_id: string;

  @ViewColumn()
  type: string;

  @ViewColumn()
  document_data: any;

  @ViewColumn()
  documents: DocumentFilesView[];
}

export { ParticipantDocumentView };

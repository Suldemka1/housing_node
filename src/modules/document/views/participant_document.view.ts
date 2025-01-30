import { ViewColumn, ViewEntity } from 'typeorm';
import { DocumentFilesView } from '../../files/view/document_files.view';

@ViewEntity({
  dependsOn: [DocumentFilesView],
  expression: `
      SELECT p.id AS participant_id,
             case when count(d) = 0 then '[]'::json else json_agg(json_build_object('id', d.id, 'type', d.type, 'data',
                                                                                    case
                                                                                        WHEN d.type::text = 'PASSPORT'::text THEN json_build_object('series', pass.series, 'number', pass.number, 'birthdate', pass.birthdate, 'issued_date', pass.issued_date, 'issuer', pass.issuer)
                                                                                        WHEN d.type::text = 'BIRTH_CERTIFICATE'::text THEN json_build_object('series', bc.series, 'number', bc.number, 'birthdate', bc.birthdate, 'issued_date', bc.issued_date, 'issuer', bc.issuer)
                                                                                        WHEN d.type::text = 'MARRIAGE_CERTIFICATE'::text THEN json_build_object('series', mc.series, 'number', mc.number, 'issued_date', mc.issued_date, 'issuer', mc.issuer)
                                                                                        WHEN d.type::text = 'DIVORCE_CERTIFICATE'::text THEN json_build_object('number', dc.id)
                                                                                        ELSE NULL::json
                                                                                        END)) end AS documents
      FROM participant p
               LEFT JOIN documents d ON p.id = d.participant_id
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
  documents: DocumentFilesView[];
}

export { ParticipantDocumentView };

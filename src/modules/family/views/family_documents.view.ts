import { Column, ViewColumn, ViewEntity } from 'typeorm';
import { DocumentEntity } from '../../document/entities';

@ViewEntity({
  expression: `
      SELECT f.id                              AS id,
             f.is_large                        AS is_large,
             f.is_married                      AS is_married,
             case
                 when count(d) = 0 then '[]'::json
                 else json_agg(
                         json_build_object(
                                 'id', d.id,
                                 'type', d.type,
                                 'data', case
                                             WHEN d.type::text = 'MARRIAGE_CERTIFICATE'::text THEN
                                                 json_build_object(
                                                         'series', mc.series,
                                                         'number', mc.number,
                                                         'issued_date', mc.issued_date,
                                                         'issuer', mc.issuer
                                                 )
                                             WHEN d.type::text = 'DIVORCE_CERTIFICATE'::text
                                                 THEN json_build_object('number', dc.id)
                                             ELSE NULL::json
                                     END)) end AS documents
      FROM family f
               LEFT JOIN documents d ON f.id = d.family_id
               LEFT JOIN document_files_view dfv ON d.id = dfv.document_id
               LEFT JOIN divorce_certificates dc ON dc.id = d.id
               LEFT JOIN marriage_certificates mc ON mc.id = d.id
      group by f.is_large, f.is_married, f.id

  `,
})
class FamilyDocumentsView {
  @ViewColumn()
  id: number;

  @Column()
  is_married: boolean;

  @Column()
  is_large: boolean;

  @Column()
  documents: DocumentEntity[];
}

export { FamilyDocumentsView };

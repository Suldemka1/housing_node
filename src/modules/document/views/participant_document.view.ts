import { ViewColumn, ViewEntity } from 'typeorm';
import { DocumentFilesView } from '../../files/view/document_files.view';

@ViewEntity({
  dependsOn: [DocumentFilesView],
  expression: `
      SELECT d.participant_id AS id,
             json_agg(
                     json_build_object(
                             'id', d.id,
                             'files', df.files
                     )
             )                AS documents
      FROM documents d
               LEFT JOIN document_files_view df ON df.document_id = d.id
      GROUP BY d.id;
  `,
})
class ParticipantDocumentView {
  @ViewColumn()
  participant_id: string;

  @ViewColumn()
  documents: DocumentFilesView[];
}

export { ParticipantDocumentView };

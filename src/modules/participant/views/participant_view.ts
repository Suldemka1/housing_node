import { DocumentFilesView } from '../../files/view/document_files.view';
import { ViewColumn, ViewEntity } from 'typeorm';
import { ParticipantDocumentView } from '../../document/views/participant_document.view';

@ViewEntity({
  dependsOn: [DocumentFilesView, ParticipantDocumentView],
  expression: `
      SELECT p.id          AS id,
             p.name        as name,
             p.surname     as surname,
             p.patronymic  as patronymic,
             pdv.documents as documents
      FROM participant p
               LEFT JOIN participant_document_view pdv ON pdv.id = p.id;
  `,
})
class ParticipantView {
  @ViewColumn()
  id: string;

  @ViewColumn()
  surname: string;

  @ViewColumn()
  name: string;

  @ViewColumn()
  patronymic: string;

  @ViewColumn()
  documents: Array<DocumentFilesView>;
}

export { ParticipantView };

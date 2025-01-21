// import { ViewColumn, ViewEntity } from 'typeorm';
// import { DocumentFilesView } from '../../files/view/document_files.view';
//
// @ViewEntity({
//   name: 'participant_passport_view',
//   expression: `
//       SELECT d.participant_id AS id,
//              json_build_object(
//                      'id', d.id,
//                      'series', d.series,
//                      'number', d.number,
//                      'birthdate', d.birthdate,
//                      'files', df.files
//              )
//       FROM passport d
//                LEFT JOIN document_files_view df ON df.document_id = d.id
//       WHERE d.type = 'PASSPORT'
//          OR d.type = 'CERTIFICATE'
//       LIMIT 1;
//   `,
// })
// class ParticipantPassportView {
//   @ViewColumn()
//   participant_id: string;
//
//   @ViewColumn()
//   passport: DocumentFilesView;
// }
//
// export { ParticipantPassportView };

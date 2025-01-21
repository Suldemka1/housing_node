import { ViewColumn, ViewEntity } from 'typeorm';
import { FileEntity } from '../files.entity';

@ViewEntity({
  expression: `
      SELECT f.document_id,
             json_agg(
                     jsonb_build_object(
                             'id', f.id,
                             'path', f.filename_disk,
                             'filename', f.filename)
             ) AS files
      FROM files f
      GROUP BY f.document_id
  `,
})
class DocumentFilesView {
  @ViewColumn()
  id: string;

  @ViewColumn()
  files: Omit<FileEntity, 'documents'>[];
}

export { DocumentFilesView };

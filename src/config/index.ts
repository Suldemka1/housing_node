import * as process from 'node:process';

export default () => ({
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },

  secret: process.env.SECRET,

  upload: {
    uploadPath: process.env.UPLOAD_PATH,
  },
});

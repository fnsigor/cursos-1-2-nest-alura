import 'dotenv/config';
import { DataSourceOptions, DataSource } from 'typeorm';

// este projeto roda em ESM ("type": "module"), onde __dirname não existe.
// import.meta.dirname (Node >= 20.11) aponta para a pasta do arquivo atual.
const __dirname = import.meta.dirname;

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

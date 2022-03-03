import { Pool } from 'pg';

// Hardcoded just because it is a playground project
export default new Pool({
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
  host: 'localhost',
  port: 5433,
});

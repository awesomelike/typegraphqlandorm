import pool from './config';

async function run() {
  const client = await pool.connect();
  await client.query(
    `CREATE TABLE IF NOT EXISTS categories(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255)
    );`
  );
  await client.query(
    `CREATE TABLE IF NOT EXISTS products(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      description VARCHAR(255),
      price FLOAT,
      category INTEGER,
      FOREIGN KEY (category) REFERENCES categories (id)
    );`
  );
  console.log('Migration has been run successfully!');
}

run();

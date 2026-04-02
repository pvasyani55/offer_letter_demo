const { DataSource } = require('typeorm');
const { Employee } = require('./dist/app/employees/employee.entity');

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.SUPABASE_URL,
  entities: [Employee],
  synchronize: false,
  logging: false
});

async function main() {
  try {
    await dataSource.initialize();
    await dataSource.query('TRUNCATE TABLE employees RESTART IDENTITY CASCADE');
    console.log('✓ Employees table cleared successfully');
    await dataSource.destroy();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();

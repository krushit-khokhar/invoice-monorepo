export default () => {
  const nestAppPort = process.env.NEST_APP_PORT;
  const dbPort = process.env.DB_PORT;
  
  return {
    port: nestAppPort ? parseInt(nestAppPort, 10) : 5000,
    database: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: dbPort ? parseInt(dbPort, 10) : 3306,
      username: process.env.DB_USERNAME || 'dev_user',
      password: process.env.DB_PASSWORD || 'dev_password',
      database: process.env.DB_DATABASE || 'invoice_db',
    },
  };
};
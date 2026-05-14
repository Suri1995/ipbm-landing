export default ({ env }) => {
  const isProduction = env("NODE_ENV") === "production";
  
  if (isProduction) {
    // Production: Use Neon PostgreSQL
    return {
      connection: {
        client: "postgres",
        connection: {
          connectionString: env("DATABASE_URL"),
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        pool: {
          min: 0,
          max: 10,
          acquireTimeoutMillis: 60000,
          createTimeoutMillis: 30000,
          idleTimeoutMillis: 30000,
          reapIntervalMillis: 1000,
          createRetryIntervalMillis: 100,
        },
      },
    };
  }
  
  // Development: Use SQLite
  return {
    connection: {
      client: "sqlite",
      connection: {
        filename: env("DATABASE_FILENAME", ".tmp/data.db"),
      },
      useNullAsDefault: true,
    },
  };
};
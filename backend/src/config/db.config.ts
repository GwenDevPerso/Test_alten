const dbConfig = {
  HOST: "localhost",
  PORT: 8889,
  USER: "root",
  PASSWORD: "root",
  DB: "alten",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
  dialectOptions: {
    useUTC: false, // for reading from the database
    dateStrings: true,
    typeCast(field: { type: string; string: () => any }, next: () => any) {
      // for reading from the database
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    },
  },
  timezone: "Europe/Paris", // for writing to the database
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbConfig;

exports.env = process.env.NODE_ENV || "development";

exports.serverPort = process.env.PORT || 4002;

exports.dbPoolConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

exports.sessionConfig = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: {
    // domain: "asd", // TODO: set domain
    httpOnly: true,
    secure: (env = "development" ? true : true),
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  saveUninitialized: false,
};

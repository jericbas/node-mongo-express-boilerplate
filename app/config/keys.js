// dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';

const {
  MONGODB_URI,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DEV_DB,
  MONGODB_DB,
  NODE_ENV
} = process.env;

const dbName = NODE_ENV === "development" ? MONGODB_DEV_DB : MONGODB_DB;

const db = `${MONGODB_URI}${MONGODB_HOST}:${MONGODB_PORT}/${dbName}`;
module.exports = {
  db
};

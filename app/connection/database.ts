import { connect, ConnectionOptions } from "mongoose";
import { config } from "../utils/config";

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
};

export const dbConnection = async () => {
  return new Promise((resolve, reject) => {
    connect(config.database_connection_string, dbOptions, (error) => {
      if (error) {
        reject({ ...error, message: "Unable to connect to database" });
      }

      resolve("Connected to database successfully");
    });
  });
};

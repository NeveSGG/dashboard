import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import typeDefs from "./models/typeDefs";
import colors from 'colors';

const MONGO_URI = "mongodb://192.168.0.48:27017/test";

colors.enable();
export const errorLog = (str: string) => {
  console.error(str.red);
}
export const infoLog = (str: string) => {
  console.info(str.green);
}
export const warnLog = (str: string) => {
  console.info(str.yellow);
}

warnLog(`Attempt to connect to MongoDB...`);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    infoLog(`Db Connected`);

    const server = new ApolloServer({ typeDefs, resolvers });

    startStandaloneServer(server, {
      listen: { port: 4000 },
    }).then(({ url }) => {
      infoLog(`Server ready at ${url}`);
    }).catch((error) => {
      errorLog(error.message);
    })
    ;
  })
  .catch(err => {
    errorLog(err.message);
  });


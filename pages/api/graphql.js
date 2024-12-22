import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from '../../graphql/resolvers';
import { typeDefs } from '../../graphql/typeDefs';
import { GraphQLError } from 'graphql';
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "";
const GRAPHQL_TOKEN = process.env.GRAPHQL_TOKEN;


// Database connection
let connection = {};
connectDB(MONGODB_URL);

const server = new ApolloServer({
    resolvers: resolvers,
    typeDefs: typeDefs,
});


export default startServerAndCreateNextHandler(server, {
    context: async (req, res) => {
        const token = req.headers.authorization || '';
        if(token !== GRAPHQL_TOKEN) {
            throw new GraphQLError('Authenticated failed', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                }
            })
        }
    }
});


async function connectDB(url) {
    if (connection.isConnected) {
      console.log('DB is already connected');
      return;
    }
  
    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) {
        console.log('Use previous connection');
        return;
      }
      await mongoose.disconnect();
    }
  
    const db = await mongoose.connect(url);
    console.log('🚀 MongoDB Database Connected Successfully');
    connection.isConnected = db.connections[0].readyState;
  }
  
async function disconnectDB() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not discounted');
    }
  }
}
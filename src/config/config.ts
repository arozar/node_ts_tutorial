import * as mongoose from 'mongoose';
import * as chalk from 'chalk'

const connString = process.env.MONGO_CONNECTION ||'';
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

export const dbConfig: mongoose.ConnectionOptions =  {
      useMongoClient: true
  }

export async function  connectDb  (cb: ()=>void ) {

  (<any>mongoose).Promise = global.Promise;

    try {
        const db = await mongoose.connect(connString, dbConfig);

        mongoose.set('debug', true);
    

    } catch (error) {        
        console.error(chalk.red('Could not connect to MongoDB!', error));
    }
};
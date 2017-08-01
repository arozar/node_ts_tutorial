import * as mongoose from 'mongoose';
import * as chalk from 'chalk'

const connString = process.env.MONGO_CONNECTION ||'';

export const dbConfig: mongoose.ConnectionOptions =  {
      useMongoClient: true
  }

export async function  connectDb  (appStart: ()=>void ) {
  //as we should be using node > 7 we should have native promises
  (<any>mongoose).Promise = global.Promise;

    try {
        //try to connect using our configuration
        const db = await mongoose.connect(connString, dbConfig);
        //so we can see what is running as we develop
        mongoose.set('debug', true);
    
        if(appStart)//if we get this far launch the app
            appStart();

    } catch (error) {
        //using chalk to give any errors a forboding red colour        
        console.error(chalk.red('Could not connect to MongoDB!', error));
    }
};
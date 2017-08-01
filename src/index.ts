import * as express from 'express';
import { connectDb } from './config/config';
import * as chalk from 'chalk';
import * as exphbs from 'express-handlebars';
import  profiles  from './Profiles/Routes/profiles.routes';

//declare out start up logic
const appStart = () => {

    const app: express.Express = express();
    //setup our features (of which there is one)
    const profilesViews = profiles(app);
    //setup our view engine
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    app.set('views', profilesViews);
    //start the app
    app.listen('3002', () => console.log(chalk.green('Server listening on port 3002')));
}

//connect to the db then start our app
connectDb(appStart);




import * as express from 'express';
import { connectDb } from './config/config';
import * as chalk from 'chalk';
import * as exphbs from 'express-handlebars';
import  profiles  from './Profiles/Routes/profiles.routes';


connectDb(() => {

    const app: express.Express = express();

    const profilesViews = profiles(app);

    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    app.set('views', profilesViews);

    app.listen('3002', () => console.log(chalk.green('Server listening on port 3002')));
});




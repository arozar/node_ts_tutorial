import  * as express from 'express';
import * as bodyParser from 'body-parser';

var app: express.Express = express();

app.use(bodyParser.json());


app.get('/', (req: express.Request, res: express.Response) => {

    let person = { name : 'bob' };

    const name = req.query.name;

    Object.assign({});

    res.json({name});
});

app.listen('3002',() => console.log('Server listening on port 3002'));

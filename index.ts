import  * as express from 'express';

const app: express.Express = express();

app.get('/', (req: express.Request, res: express.Response) => {

    let person = { name : 'bob' };
    
    person = Object.assign(person, req.query);

    res.json(person);
});

app.listen('3002',() => console.log('Server listening on port 3002'));

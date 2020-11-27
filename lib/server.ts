import app from "./config/app";
import * as mongoose from "mongoose";
import {childRoutes} from "./resources/child/childRoutes";
import {parentRoutes} from "./resources/parent/parentRoutes";
import {gameRoutes} from "./resources/game/gameRoutes";

const username = 'lorenzofman';
const password = 'TeOzakxnrHciqWDO';
const database = 'development';
const uri = `mongodb+srv://${username}:${password}@cluster0.1balv.mongodb.net/${database}?retryWrites=true&w=majority`;
const port = process.env.PORT || 4242;

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", '*');
   res.header("Access-Control-Allow-Credentials", "true");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
   next();
});

async function run(): Promise<void>
{
   await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).catch(error => console.log(error));
   // await clearDatabase();
   // console.log(`Database cleared`);
   // await createSample();
   parentRoutes(app);
   childRoutes(app);
   gameRoutes(app);
   console.log(`Start listening to ${port}`);
   app.listen(port);
}

run().catch(err => console.log(err));
import app from "./config/app";
import * as mongoose from "mongoose";
import {childRoutes} from "./resources/child/childRoutes";
import {parentRoutes} from "./resources/parent/parentRoutes";
import {gameRoutes} from "./resources/game/gameRoutes";
import {binaryRoutes} from './resources/binaries/binaryRoutes';
import {genericRoute} from "./resources/generic/genericRoute";

const username = 'lorenzofman';
const password = 'TeOzakxnrHciqWDO';
const database = 'development';
const uri = `mongodb+srv://${username}:${password}@cluster0.1balv.mongodb.net/${database}?retryWrites=true&w=majority`;
const port = process.env.PORT || 4242;

const cors = require('cors');
const fs = require('fs');

app.use(cors())

async function run(): Promise<void>
{
   await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).catch(error => console.log(error));
   const connection = mongoose.connection;
   // await clearDatabase();
   // console.log(`Database cleared`);
   // await createSample();
   parentRoutes(app);
   childRoutes(app);
   gameRoutes(app);
   binaryRoutes(app);
   genericRoute(app, connection);
   console.log(`Start listening to ${port}`);
   app.listen(port);
}

run().catch(err => console.log(err));
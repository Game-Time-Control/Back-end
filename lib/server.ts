console.log(`Wakey wakey!`);
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

async function run(): Promise<void>
{
   console.log(`Server started running`);
   await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).catch(error => console.log(error));
   console.log(`Mongoose connected`);

   const connection = mongoose.connection;

   parentRoutes(app);
   console.log(`Parents routes configured!`);
   
   childRoutes(app);
   console.log(`Child routes configured!`);
   
   gameRoutes(app);
   console.log(`Game routes configured!`);
   
   binaryRoutes(app);
   console.log(`Binary routes configured!`);
   
   genericRoute(app, connection);
   console.log(`Generic routes configured!`);
   
   console.log(`Start listening to ${port}`);
   app.listen(port);
}

run().catch(err => console.log(err));
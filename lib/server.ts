console.log(`Wakey wakey!`);
import app from "./config/app";
console.log(`Import app`);
import * as mongoose from "mongoose";
console.log(`Import mongoose`);
import {childRoutes} from "./resources/child/childRoutes";
console.log(`Import child routes`);
import {parentRoutes} from "./resources/parent/parentRoutes";
console.log(`Import parent routes`);
import {gameRoutes} from "./resources/game/gameRoutes";
console.log(`Import game routes`);
import {binaryRoutes} from './resources/binaries/binaryRoutes';
console.log(`Import binary routes`);
import {genericRoute} from "./resources/generic/genericRoute";
console.log(`Import generic routes`);

const username = 'lorenzofman';
const password = 'TeOzakxnrHciqWDO';
const database = 'development';
const uri = `mongodb+srv://${username}:${password}@cluster0.1balv.mongodb.net/${database}?retryWrites=true&w=majority`;

console.log(`Constants`);
const cors = require('cors');
console.log(`Require Cors`);
app.use(cors())
console.log(`Use Cors`);
const port = process.env.PORT || 4242;
console.log(`After port fetch`);

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
import app from "./config/app";
import * as mongoose from "mongoose";
import {childRoutes} from "./resources/child/childRoutes";
import {parentRoutes} from "./resources/parent/parentRoutes";
import {gameRoutes} from "./resources/game/gameRoutes";
import {binaryRoutes} from './resources/binaries/binaryRoutes';
import {genericRoute} from "./resources/generic/genericRoute";
require("dotenv-safe").config();

const username = 'lorenzofman';
const password = 'TeOzakxnrHciqWDO';
const database = 'development';
const uri = `mongodb+srv://${username}:${password}@cluster0.1balv.mongodb.net/${database}?retryWrites=true&w=majority`;
const port = process.env.PORT || 4242;

const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

app.use(cors())

async function run(): Promise<void>
{
   await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).catch(error => console.log(error));
   const connection = mongoose.connection;
   // await clearDatabase();
   // console.log(`Database cleared`);
   // await createSample();
   //TODO DESCOMENTA o post de baixo

   // app.post('/login', (req, res, next) => {
   //    //esse teste abaixo deve ser feito no seu banco de dados
   //    if (req.body.user === 'luiz@gmail.com' && req.body.password === '123456789') {
   //       //auth ok
   //       const id = 1; //esse id viria do banco de dados
   //       const token = jwt.sign({id}, process.env.SECRET);
   //       return res.json({auth: true, token: token});
   //    }
   //
   //    res.status(500).json({message: 'Login inválido!'});
   // })
   //TODO criar arquivo separado para colocar questões relativas a cadastro e login (retirar rota acima)

   parentRoutes(app);
   childRoutes(app);
   gameRoutes(app);
   binaryRoutes(app);
   genericRoute(app, connection);
   console.log(`Start listening to ${port}`);
   app.listen(port);
}

run().catch(err => console.log(err));
import app from "./config/app";
import * as mongoose from "mongoose";
import {createSchema, Type, typedModel} from "ts-mongoose";
const uri = "mongodb+srv://lorenzofman:TeOzakxnrHciqWDO@cluster0.1balv.mongodb.net/test?retryWrites=true&w=majority";

const connection = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, function (err)
{
   if (err)
   {
      console.log("Error connecting to Atlas");
   }
   else
   {
      console.log("Successful Connection");
   }
});

interface IChild extends mongoose.Document
{
   name: string;
   parentId: number;
}

const childSchema = createSchema
({
   name: Type.string( {required:true} ),
   parentId: Type.number( {required:true} )
});

const childModel = mongoose.model<IChild>('Children', childSchema);
const childDoc = new childModel({ name: 'Steve Jobs', parentId: 42 });

app.get('/', (request, response) =>
{
   childModel.findOne({parentId: 42}, 'name', function (err, child)
   {
      if (err)
      {
         console.error("Failed to find one");
         response.send(404);
      }
      else
      {
         response.send(child.name);
      }
   });
});

const port = process.env.PORT || 4242;
console.log(`Start listening to ${port}`);
app.listen(port);
import app from "./config/app";
import * as mongoose from "mongoose";
import {createSchema, Type, typedModel} from "ts-mongoose";
const uri = "mongodb+srv://lorenzofman:TeOzakxnrHciqWDO@cluster0.1balv.mongodb.net/test?retryWrites=true&w=majority";

app.get('/', (request, response) =>
{
   response.send('Hello world!');
});

const port = process.env.PORT || 4242;
console.log(`Start listening to ${port}`);
app.listen(port);

// const connection = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, function (err)
// {
//    if (err)
//    {
//       console.log("Error connecting to Atlas");
//    }
//    else
//    {
//       console.log("Successful Connection");
//    }
// });
//
// const childSchema = createSchema
// ({
//    name: Type.string( {required:true} ),
//    parentId: Type.number( {required:true} )
// });
//
// const childModel = mongoose.model('Children', childSchema);
// const childDoc = new childModel({ name: 'Steve Jobs', parentId: 42 });


// childDoc.save(function (err)
// {
//    if (err)
//    {
//       console.log("Failed to save");
//    }
//    else
//    {
//       console.log("Saved");
//    }
// });
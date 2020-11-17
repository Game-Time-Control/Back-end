import app from "./config/app";
import * as mongoose from "mongoose";

/* Models */
import { parentModel } from "./resources/parent/parentModel";
import { childModel} from "./resources/child/childModel";

const uri = "mongodb+srv://lorenzofman:TeOzakxnrHciqWDO@cluster0.1balv.mongodb.net/development?retryWrites=true&w=majority";

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


// app.get('/', (request, response) =>
// {
//    childModel.findOne({childId: "5fb4196b0f737137a08ecf89"}, 'name', function (err, child)
//    {
//       if (err)
//       {
//          console.error("Failed to find one");
//          response.send(404);
//       }
//       else
//       {
//          response.send(child.name);
//       }
//    });
// });

const port = process.env.PORT || 4242;
console.log(`Start listening to ${port}`);
app.listen(port);
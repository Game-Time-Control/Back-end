import { childModel } from "./childModel"
import {dayModel} from "../day/dayModel";

export function childRoutes(app)
{
   app.get('/child/:child_id', (request, response) =>
   {
      childModel.findById({_id: request.params.child_id}, function (err, child)
      {
         if (err)
         {
            console.error("Unexpected error");
            response.send({response: 201});
         }
         else if (child == null)
         {
            console.error("Failed to find the child configs");
            response.send({response: 404});
         }
         else
         {
            let configs =
            {
               name: child.name,
               parent: child.parent,
               maxWeekTime: child.maxWeekTime,
               days: child.days,
               timePlayedToday: child.timePlayedToday,
               lastDayPlayed: child.lastDayPlayed
            }
            
           response.send(
           {
              response: 200,
              payload: configs
           });
         }
      });
   });

   app.get('/parent/:parent_id/children', (request, response) =>
   {
      childModel.find({parent: request.params.parent_id}, function (err, child)
      {
         if (err)
         {
            console.error("Unexpected error");
            response.send({response: 201});
         }
         else if (child == null)
         {
            console.error("Failed to find the parent");
            response.send({response: 404});
         }
         else
         {
            let children = []
            for(let i=0;i<child.length;i++){
               children[i] = {id: child[i]._id,
                  name: child[i].name,}
            }
            console.log(children)
            response.send(
            	{
            		response: 200,
            		payload: children
            	});
         }
      });
   });

   app.post('/parent/:parent_id/child/add', async function(request, response) {
      let tempPeriod = []
      for(let i=0;i<48;i++){
         tempPeriod[i] = true;
      }
      const day = new dayModel(
          {
             maxTime: 0,
             period: tempPeriod
          });

      let name = request.body.name;

      const childDoc = new childModel(
          {
             name: name,
             parent: request.params.parent_id,
             maxWeekTime: 0,
             days : [day, day, day, day, day, day, day],
             timePlayedToday: 0,
             lastDayPlayed: Date.now()
          });

      await childDoc.save();
      console.log("Child Saved");
      response.send(
          {
             response: 200,
          });
   })
}


import { childModel } from "./childModel"

export function childRoutes(app)
{
   app.get('/child/:child_id/configs', (request, response) =>
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
            console.log("aa", child)
            let configs =
            {
               childName: child.name,
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
}


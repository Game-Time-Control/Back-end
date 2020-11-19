import { childModel } from "./childModel"

module.exports = function(app){
   app.get('/child/:child_id/configs', (request, response) =>
   {
      childModel.findById({_id: request.params.child_id}, function (err, child)
      {
         if (err) {
            console.error("Failed to find the child configs");
            response.send({response: 201});
         } else {
            console.log("aa", child)

            let configs = {childName: child.name,
            maxWeekTime: child.maxWeekTime,
            maxDayTime: child.maxDayTime,
            period: child.period,
            timePlayedToday: child.timePlayedToday,
            lastDayPlayed: child.lastDayPlayed}

            response.send({response: 200,
               payload: configs});
         }
      });
   });
}


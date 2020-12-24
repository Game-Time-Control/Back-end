import { childModel } from "./childModel"
import {dayModel} from "../day/dayModel";
import {send, verifyJWT} from "../../utils/responseUtils";
export function childRoutes(app)
{
   app.get('/child/:child_id', (request, response) =>
   {
       console.log(request.params.child_id)
       childModel.findById({_id: request.params.child_id}, function (err, child)
       {
           send(err, child, response);
       });
   })
    // TODO DESCOMENTA aqui e substitui pela linha de baixo
    //app.get('/parent/:parent_id/children', verifyJWT,  (request, response) =>
   app.get('/parent/:parent_id/children', (request, response) =>
   {
      childModel.find({parent: request.params.parent_id}, function (err, child)
      {
          if (err)
          {
              console.error("Unexpected error");
              response.sendStatus(500);
          }
         else if (child == null)
         {
            console.error("Failed to find the parent");
            response.sendStatus(404);
         }
         else
         {
             let children = []
             for (let i = 0; i <child.length ;i++)
             {
                 children[i] = { id: child[i]._id, name: child[i].name}
             }
             console.log(children);
             response.send(children);
         }
      });
   });
    
    app.get('/parent/:parent_id/childrenComplete', (request, response) =>
    {
        childModel.find({parent: request.params.parent_id}, function (err, children)
        {
            send(err, children, response);
        });
    });

   app.post('/parent/:parent_id/child/add', async function(request, response) {
      let tempPeriod = []
      for(let i=0;i<24;i++){
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

      await childDoc.save(function(err, child)
      {
         if (err)
         {
            response.sendStatus(500);
         }
         else
         {
            response.send(child);
         }
      });
      console.log("Child Saved");

   })

   app.put('/parent/:parent_id/child/:child_id/update', async function(request, response)
   {
       childModel.findByIdAndUpdate(request.params.child_id, request.body, {new: true}, (err, child) =>
       {
           if (err)
           {
                response.sendStatus(500);
           }
           else
           {
               response.send(child);
           }
       });
   });

    app.delete('/child/:child_id/delete', async function(request, response)
    {
        childModel.findByIdAndDelete(request.params.child_id, function (err)
        {
            if (err)
            {
                response.sendStatus(500);
            }
            else
            {
                response.sendStatus(200);
            }
        });
    })

}



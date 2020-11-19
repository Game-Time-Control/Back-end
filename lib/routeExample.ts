import app from "./config/app";
import {childModel} from "./resources/child/childModel";

export function routeExample()
{
    app.get('/', (request, response) =>
    {
	childModel.findOne({childId: "5fb4196b0f737137a08ecf89"}, 'name', function (err, child)
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
}
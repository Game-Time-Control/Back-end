import { parentModel } from "./parentModel"

export function parentRoutes(app)
{
    app.get('/parent/:parental_id/configs', (request, response) =>
    {
	parentModel.findById({_id: request.params.parental_id}, function (err, parent)
	{
	    if (err)
	    {
		console.error("Unexpected error");
		response.send({response: 201});
	    }
	    else if (parent == null)
	    {
		console.error("Failed to find the parent configs");
		response.send({response: 404});
	    }
	    else
	    {
		let configs =
		{
		    name: parent.name,
		    email: parent.email
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


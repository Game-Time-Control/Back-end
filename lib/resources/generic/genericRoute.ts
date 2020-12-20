import {Connection} from "mongoose";

export function genericRoute(app, connection: Connection)
{
    app.get('/store/:collection', (request, response) =>
    {
	const name = request.params.collection;
	connection.collection(name).findOne(function(err, document)
	{
	    if (err)
	    {
	        throw err;
	    }
	    response.send(document);
	});
    });
    
    app.put('/store/:collection/2042D48FD6A1731D624CEBDD341FF1564864A81FBCD915A425F7A2783034CD23/', (request, response) =>
    {
        const name = request.params.collection;
	const json = JSON.parse(request.body);
	console.log(`Replacing document at collection <${name}>:`);
	console.log(json);
 
	connection.db.collections().then(function (collections)
	{
	    connection.collection(name).replaceOne({}, json, {upsert: true}, function (err)
	    {
		response.sendStatus(err ? 500 : 200);
	    });
	});
    });
}
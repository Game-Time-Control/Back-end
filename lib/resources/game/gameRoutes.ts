import { gameModel } from "./gameModel"

export function gameRoutes(app)
{
    app.get('/game/:game_id/configs', (request, response) =>
    {
	gameModel.findById({_id: request.params.game_id}, function (err, game)
	{
	    if (err)
	    {
		console.error("Unexpected error");
		response.send({response: 201});
	    }
	    else if (game == null)
	    {
		console.error("Failed to find the game configs");
		response.send({response: 404});
	    }
	    else
	    {
		let configs =
		{
		    name: game.name,
		    child: game.child,
		    computer: game.computer,
		    maxWeekTime: game.maxWeekTime,
		    days: game.days,
		    timePlayedToday: game.timePlayedToday,
		    lastDayPlayed: game.lastDayPlayed
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


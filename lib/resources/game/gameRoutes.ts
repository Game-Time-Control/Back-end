import { gameModel } from "./gameModel"
import {verifyJWT} from "../../utils/responseUtils";

export function gameRoutes(app)
{
    app.get('/game/:game_id/configs', verifyJWT, (request, response) =>
    {
	gameModel.findById({_id: request.params.game_id}, function (err, game)
	{
	    if (err)
	    {
		console.error("Unexpected error");
		response.sendStatus(500);
	    }
	    else if (game == null)
	    {
		console.error("Failed to find the game configs");
		response.sendStatus(404);
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
		
		response.send(configs);
	    }
	});
    });
}


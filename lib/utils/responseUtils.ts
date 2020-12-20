import {Response} from "express"

export function send(err: any, result: any, response: Response)
{
    if (err)
    {
	console.error("Unexpected error");
	response.status(500).send();
    }
    else if (result == null)
    {
	console.error("Failed to find the parent");
	response.status(404).send();
    }
    else
    {
	response.send(result);
    }
}
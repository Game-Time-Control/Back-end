import {Response} from "express"
const jwt = require('jsonwebtoken');
require("dotenv").config();

export function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    console.log(token)
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, "mySecret", function(err, decoded) { //TODO change this to an .env
        if (err) return res.status(500).json({ auth: false, message: 'Failed trso authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

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
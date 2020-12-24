import {Response} from "express"
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

export function verifyJWT(req, res, next){
    console.log(req)
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
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
import {parentModel} from "./parentModel"
import {dayModel} from "../day/dayModel";
import {childModel} from "../child/childModel";
import * as bcrypt from 'bcrypt';

require("dotenv").config();
const jwt = require('jsonwebtoken');

export function parentRoutes(app)
{
    app.get('/parent/:parental_id/configs', (request, response) =>
    {
	parentModel.findById({_id: request.params.parental_id}, function (err, parent)
	{
	    if (err)
	    {
		console.error("Unexpected error");
		response.sendStatus(500);
	    }
	    else if (parent == null)
	    {
		console.error("Failed to find the parent configs");
		response.sendStatus(404);
	    }
	    else
	    {
		let configs =
			{
			    name: parent.name,
			    email: parent.email
			}
		
		response.send(configs);
	    }
	});
    });
    
    
    app.post('/register', async function (request, response)
    {
	const hashedPassword = await bcrypt.hash(request.body.password, 10);
	
	try
	{
	    const parentDoc = new parentModel(
		    {
			name: request.body.parentName,
			email: request.body.email,
			password: hashedPassword,
		    });
	    
	    let tempPeriod = []
	    for (let i = 0; i < 24; i++)
	    {
		tempPeriod[i] = true;
	    }
	    const day = new dayModel(
		    {
			maxTime: 0,
			period: tempPeriod
		    });
	    
	    let childDoc;
	    let parentReference;
	    
	    await parentDoc.save();
	    
	    parentReference = parentDoc._id;
	    
	    for (let i = 0; i < request.body.children.length; i++)
	    {
		childDoc = new childModel(
			{
			    name: request.body.children[i].name,
			    parent: parentReference,
			    maxWeekTime: 0,
			    days: [day, day, day, day, day, day, day],
			    timePlayedToday: 0,
			    lastDayPlayed: Date.now()
			});
		await childDoc.save();
	    }
	    
	    response.send(childDoc);
	}
	catch (err)
	{
	    console.log(err)
	    if (err.name === 'MongoError' && err.code === 11000)
	    {
		// Duplicate username
		return response.sendStatus(422);
	    }
	    else
	    {
		return response.sendStatus(500);
	    }
	}
	
    })
    
    app.post('/login', async function (request, response)
    {
	parentModel.findOne({email: request.body.email}, async function (err, user)
	{
	    console.log(user);
	    if (err)
	    {
		console.error("Failed to find one");
		response.sendStatus(500);
	    } else if (user === null) {
			response.sendStatus(404);
		}
	    else
	    {
		await bcrypt.compare(request.body.password, user.password, function (err, result)
		{
		    if (result == true)
		    {
			
			const token = jwt.sign({
			    userId: user._id,
			    name: user.name,
			    email: user.email
			}, process.env.jwt_secret);
			
			response.send({
			    data:
				    {
					auth: true,
					token: token,
					userId: user._id,
					name: user.name,
					email: user.email
				    }
			});
		    }
		    else
		    {
			response.sendStatus(404);
		    }
		})
	    }
	}).catch(err => console.log(err))
    })
    
    
}

import {binaryModel} from "./binaryModel";
import * as fs from "fs";

function updateBinary(request, response, name: string)
{
    binaryModel.findOne({name: name}, function (err, result)
    {
        const binary = new binaryModel
        ({
            name: name,
            data: request.body
        });
        if (err)
        {
            response.send({response: 500});
            console.log(name + ': Binary fetch failure');
            console.log(err);
        }
        else if (result != null)
        {
            binaryModel.findOneAndUpdate({name: name}, {data: binary.data}, function (err, result)
            {
                if (err)
                {
                    console.log(name + ': Binary update failure');
                    console.log(err);
                    response.send({response: 500});
                }
                else
                {
                    console.log(name + ': Binary update successfully');
                    response.send({response: 200});
                }
            });
            
        }
        else
        {
            binary.save().then(() => console.log(name + ': New binary created'));
            response.send({response: 200});
        }
    });
}

function getBinary(request, response, name: string)
{
    binaryModel.findOne({name: name}, function (err, bin)
    {
        if (err)
        {
            console.error("Unexpected error");
            response.send({response: 201});
        }
        else if (bin == null)
        {
            console.error("Failed to find the binary");
            response.send({response: 404});
        }
        else
        {
            response.send(bin.data);
        }
    });
}

function downloadBinary(request, response, name: string, downloadTitle: string)
{
    binaryModel.findOne({name: name}, function (err, bin)
    {
        if (err)
        {
            console.error("Unexpected error");
            response.send({response: 201});
        }
        else if (bin == null)
        {
            console.error("Failed to find the binary");
            response.send({response: 404});
        }
        else
        {
            let array = Buffer.from(bin.data, 'base64');
            const { Readable } = require('stream');
            const readableStream = Readable.from(array);
            response.attachment(downloadTitle);
            readableStream.pipe(response);
        }
    });
}

export function binaryRoutes(app)
{
    app.get('/download', (request, response) =>
    {
        downloadBinary(request, response, 'setup', 'GameHub.exe');
    });
    
    app.get('/binaries/x86', (request, response) =>
    {
        getBinary(request, response, 'x86');
    });
    
    app.get('/binaries/x64', (request, response) =>
    {
        getBinary(request, response, 'x64');
    });
    
    /* Encoded lorenzo-dev as SHA-256 and appended to download URL to avoid unwanted people messing with our binaries */
    app.put('/binaries/setup/2042D48FD6A1731D624CEBDD341FF1564864A81FBCD915A425F7A2783034CD23/', (request, response) =>
    {
        updateBinary(request, response, 'setup');
    });
    
    app.put('/binaries/x86/2042D48FD6A1731D624CEBDD341FF1564864A81FBCD915A425F7A2783034CD23/', (request, response) =>
    {
        updateBinary(request, response, 'x86');
    });
    
    app.put('/binaries/x64/2042D48FD6A1731D624CEBDD341FF1564864A81FBCD915A425F7A2783034CD23/', (request, response) =>
    {
        updateBinary(request, response, 'x64');
    });
}
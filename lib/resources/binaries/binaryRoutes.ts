import {binaryModel} from "./binaryModel";
import {send} from "../../utils/responseUtils";

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
                    response.sendStatus(500);
                }
                else
                {
                    console.log(name + ': Binary update successfully');
                    response.sendStatus(200)
                }
            });
            
        }
        else
        {
            binary.save().then(() => console.log(name + ': New binary created'));
            response.sendStatus(200);
        }
    });
}

function getBinary(request, response, name: string)
{
    binaryModel.findOne({name: name}, function (err, bin)
    {
        send(err, bin, response);
    });
}

function downloadBinary(request, response, name: string, downloadTitle: string)
{
    binaryModel.findOne({name: name}, function (err, bin)
    {
        if (err)
        {
            console.error("Unexpected error");
            response.sendStatus(500);
        }
        else if (bin == null)
        {
            console.error("Failed to find the binary");
            response.sendStatus(404);
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
        downloadBinary(request, response, 'setup', 'GameHub-Setup.exe');
    });
    
    app.get('/binaries/:binaryCode/', (request, response) =>
    {
        getBinary(request, response, request.params.binaryCode);
    });
    
    /* Encoded lorenzo-dev as SHA-256 and appended to download URL to avoid unwanted people messing with our binaries */
    app.put('/binaries/:binaryCode/2042D48FD6A1731D624CEBDD341FF1564864A81FBCD915A425F7A2783034CD23/', (request, response) =>
    {
        updateBinary(request, response, request.params.binaryCode);
    });
}
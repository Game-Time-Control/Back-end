import {binaryModel} from "./binaryModel";

function updateBinary(request, response, name: string)
{
    const binary = new binaryModel
    ({
        name: name,
        data: request.body
    });
    binaryModel.findOne({name: name}, function (err, result)
    {
        if (err)
        {
            response.send({response: 500});
            console.log(name + ': Binary fetch failure');
            console.log(err);
        }
        else if (result != null)
        {
            binaryModel.findOneAndUpdate({name: name}, {data: request.body}, function (err, result)
            {
                if (err)
                {
                    console.log(name + ': Binary update failure');
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

export function binaryRoutes(app)
{
    app.get('/download', (request, response) =>
    {
        //getBinary(request, response, 'setup');
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
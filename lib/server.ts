import app from "./config/app";

const PORT = 4242;

app.listen(PORT, () => 
{
   console.log('Express server listening on port ' + PORT);
})
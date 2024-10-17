const express = require('express');
const path = require('path'); 
const app = express();

const PORT = 8000;

app.set('viewengine', 'ejs');
app.set('views',path.resolve('./views') );

app.listen(PORT, ()=>{console.log(`Server started on the port:${PORT}`)});

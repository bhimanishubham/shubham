let mongoose = require('./config/mongoose')
let mongodb = mongoose()
let express = require('./config/express')
let app = express()
let port = 5000

app.get('/image/:filename', (req, res) => {
    console.log(filename);
    const { filename } = req.params;
    const imagePath = `./uploads/${filename}`;
    res.sendFile(imagePath);
});


app.listen(port, () => {
    console.log('Server Listning at ' + port)
})
const mongoose = require('mongoose');
const express = require('express');
const myRouter = require('./routers/index')


mongoose.connect('mongodb://localhost:27017/nodejs-api-vexere',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to mongodb')
    })
    .catch(err => console.log(err))
const app = express();
app.use(express.json())
app.use('/api', myRouter);

const port = 5000;
app.listen(port, () => {
    console.log(`Server listen on port : ${port}`)
})

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const setModels = require('./models/setModels');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then( () => console.log('Connected to MongoDB') )
    .catch( (err) => console.log(err) )
setModels();

app.use(express.json())
app.use('/api', require('./routes/AuthRoutes').getRouter())
app.use('/api', require('./routes/UserRouter').getRouter())

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started. PORT : ${port}`)
});

const express = require('express');
const bodyParser = require('body-parser');

const HttpError = require('./models/http-error')
const placesRoutes = require('./routes/places-route')
const usersRoutes = require('./routes/users-route');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json())

app.use("/api/places",placesRoutes)
app.use("/api/users", usersRoutes)

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404)
    throw error
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({
        message: error.message || 'An unknown error occurred!'
    })
})

mongoose.connect(
    'mongodb+srv://Aidan:Sonick11@cluster0.qqns7.mongodb.net/UdemyMern?retryWrites=true&w=majority'
).then(() => {
    app.listen(5000);
}).catch(err => {
    console.log(err)
})
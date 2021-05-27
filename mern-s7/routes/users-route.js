const express = require('express');

const route = express()

route.get('/', (req, res, next) => {
    console.log("GET user request")
    res.json({
        message: 'new user'
    })
})

module.exports = route

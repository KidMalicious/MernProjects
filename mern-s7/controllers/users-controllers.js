const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const User = require('../models/user')

const getUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find({}, '-password')
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        )
        return next(error)
    }

    res.json({
        users: users.map(
            user => user.toObject({
                getter: true
            })
        )
    })
}

const signup = async (req, res, next) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422))
    }

    const { name, email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({
            email
        })
    } catch (err) {
        const error = new HttpError(
            "Signing up failed, please try again later.", 500
        )

        return next(error)
    }

    if (existingUser) {
        const error = new HttpError(
            "User exists already, please login instead",
            422
        )
        return next(error)
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://cdn.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg',
        password,
        places: []
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again.', 500
        )
        return next(error)
    }

    res.status(201).json({
        user: createdUser.toJSON({
            getters: true
        })
    })
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({
            email
        })
    } catch (err) {
        const error = new HttpError(
            "Logging in failed, please try again later.", 500
        )
        return next(error)
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            "Invalid credentials, could not log in",
            401
        )
        return next(error)
    }
    res.json({
        message: 'Logged in!'
    })
}

module.exports = {
    getUsers,
    signup,
    login
};


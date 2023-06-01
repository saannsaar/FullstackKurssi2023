const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body
    // Etsitään pyynnön mukana olevaa "username"a vastaavaa käyttäjää tietokannasta
    const user = await User.findOne({username})
    // Tsekataan onko pyynnön mukana oleva "password" oikea, koska
    //tietokantaan ei ole talletettu salasanaa vaan hash, tehdään bcrypt.compare metodilla vertailu
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    // Jos väärä käyttäjä tai ei ole olemassa vastataan 401 unauthorized
    if (!(user && passwordCorrect)) {
        return response.status(401).json({error: "invalid username or password"})
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }


    // Token on digitaalisesti allekirjoitettu käyttämällä SALAISUUTENA ympäristömuuttujassa 
    // SECRET olevaa merkkijonoa
    //Tokenin voimassaoloaika on 60*60 sekuntia, eli 1 tunti
    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60})

    response.status(200).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter
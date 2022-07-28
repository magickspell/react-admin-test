const { MongoClient } = require("mongodb");
const cors = require('cors')
const express = require('express')
const app = express()
//подключаем монгу
// пароль надо написать вместо <pass> включая крыжики! (т.е. получиться ...magic:123Qwerty...) *пароль скинул в личку
const uri = 'mongodb+srv://magic:<pass>@cluster0.wh26qcf.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);
const database = client.db('magicDB');
//подключаем монгу

app.use(cors())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/promos', async function (req, res) {
    try {
        const promosCollection = database.collection('promos');
        const promos = await promosCollection.find().toArray();
        console.log(promos);
        res.send(promos)
    } catch (e) {
        console.warn(e)
    }
/*    finally {
        await client.close();
    }*/
})
app.get('/promos-pagination', async function (req, res) {
    //http://localhost:3001/promos-pagination?start=0&end=10
    let start = Number(req.query.start)
    let end = Number(req.query.end)
    console.log(start)
    console.log(end)
    try {
        const promosCollection = database.collection('promos');
        const promos = await promosCollection.find().skip(start).limit(end).toArray();
        console.log(promos);
        res.send(promos)
    } catch (e) {
        console.warn(e)
    }
})

app.get('/users', async function (req, res) {
    try {
        const usersCollection = database.collection('users');
        const users = await usersCollection.find().toArray();
        console.log(users);
        res.send(users)
    } catch (e) {
        console.warn(e)
    }
})
app.get('/user', async function (req, res) {
    let start = Number(req.query.start)
    try {
        const usersCollection = database.collection('users');
        const user = await usersCollection.find().skip(start).limit(1).toArray();
        res.send(user)
    } catch (e) {
        console.warn(e)
    }
})

app.listen(3001, () => console.log(`app started on port ${3001}`))


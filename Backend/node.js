const cor = require('cors')
const express1 = require('express');
const Jwt = require('jsonwebtoken')

const jwtkey = "mykey"

require('./db/config.js')
const user = require('./db/Schema.js')
const Product = require('./db/Product.js')
const app = express1();
app.use(express1.json())
app.use(cor())




app.post('/Signup', async (req, res) => {
    if (req.body.Name && req.body.Number && req.body.Password) {
        let data = await user.findOne({ 'Number': req.body.Number })
        // console.log(data);
        // console.log(req.body);
        if (data == null) {
            let collection = new user(req.body)
            let result = await collection.save()
            result = result.toObject()
            delete result.Password

            Jwt.sign({ result }, jwtkey, { expiresIn: '2h' }, async (err, token) => {
                if (err) {
                    res.send({ result: 'Something went wrong' })
                }
                else {




                    res.send({ result, auth: token })
                }
            })

        }
        else {

            data = data.toObject()
            delete data.Password

            Jwt.sign({ data }, jwtkey, { expiresIn: '2h' }, async (err, token) => {
                if (err) {
                    res.send({ result: 'Something went wrong' })
                }
                else {

                    res.send({ data, auth: token })
                }
            })
        }
    }
    else {
        res.send({ result: 'User not valid' })
        // res.send(req.body)
    }


})

app.post('/login', async (req, res) => {
    if (req.body.Number && req.body.Password) {
        let data = await user.findOne(req.body).select("-Password")
        if (data != null) {
            Jwt.sign({ data }, jwtkey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    res.send({ result: 'Something went wrong' })
                }
                else {
                    data = data.toObject()
                    res.send({ data, auth: token })
                }
            })


        }
        else {
            res.send({ result: 'User Not Found!' })
        }
    }
    else {
        res.send({ result: 'User Not Found!' })
    }
    // console.log(req.body);

})


const verifytoken = (req, res, next) => {
    let token = req.headers['authorization']
    // token=token.split(' ')
    // res.send({token})
    // console.log(token);
    if (token) {
        token = token.split(' ')[1]
        Jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: 'Please provide valid token' })
            }
            else {
                next()
            }
        })
    }
    else {
        res.status(404).send({ result: 'Please add token with header' })

    }
}


app.post('/Add-Product',verifytoken,async (req, res) => {
    if (req.body.Name && req.body.Price && req.body.Category) {

        // console.log(data);
        // console.log(req.body);

        let collection = await new Product(req.body)
        let result = await collection.save()
        result = result.toObject()
        res.send(result)

    }
    else {
        res.send({ result: 'Something went Wrong' })
        
    }


})

app.get('/Product', verifytoken, async (req, res) => {

    let collection = await Product.find()

    res.send(collection)

})

app.delete('/delete/:id', verifytoken, async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
    console.log(result);
})

app.get('/Product/:id', verifytoken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
        console.log(result);
    }
    else {
        res.send({ result: "Product not found" })
    }

})
app.put('/Product/:id', verifytoken, async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body })
    if (result) {
        res.send(result)
        console.log(result);
    }
    else {
        res.send({ result: "Product not Updated" })
    }

})

app.get('/Search/:key', verifytoken, async (req, res) => {
    let data = await Product.find({
        "$or": [{ Name: { $regex: req.params.key } },
        { Category: { $regex: req.params.key } }
        ]
    });

    // data=await data.json()
    res.send(data)
})




app.listen(4500, () => {
    console.log("APP is running");
})
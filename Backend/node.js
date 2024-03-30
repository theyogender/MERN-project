const cor = require('cors')
const express1 = require('express');

require('./db/config.js')
const user = require('./db/Schema.js')
const app = express1();
app.use(express1.json())
app.use(cor())

app.post('/Signup', async (req, res) => {
    if ( req.body.Name&&req.body.Number && req.body.Password ) {
        let data = await user.findOne({'Number' :req.body.Number})
        // console.log(data);
        // console.log(req.body);
        if (data == null) {
            let collection = new user(req.body)
            let result = await collection.save()
            result = result.toObject()
            console.log(result);

            delete result.Password
            res.send(result)
        }
        else {
            
            data = data.toObject()
            delete data.Password
            res.send(data)
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
            data = data.toObject()
            res.send(data)
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

app.listen(4500, () => {
    console.log("APP is running");
})
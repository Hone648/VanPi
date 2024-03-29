require('./mongoose');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const User = require('./models/user');

app.listen(5000, () => { console.log("Server started on port 5000") })

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404);
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404);
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

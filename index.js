const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
    
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/users');
    console.log('db connected');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Schema
const userSchema = new mongoose.Schema({
    name: String,  // Add name field to the schema 
    username: String,
    password: String
});

// Model
const User = mongoose.model('User', userSchema);

const server = express();

// Middleware
server.use(cors());
server.use(bodyParser.json());

// API
server.post('/user', async (req, res) => {
    const { name, email, password } = req.body;

    let user = new User({
        name: name,
        username: email,
        password: password
    });

    try {
        const doc = await user.save();
        console.log(doc);
        res.status(201).json(doc);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

server.get('/user', async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Port 
server.listen(8080, () => {
    console.log('server is started');
});

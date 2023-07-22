// create web server with express
const express = require('express');
const app = express();
// use body-parser to parse the body of the HTTP request
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// use cors to allow cross origin resource sharing
const cors = require('cors');
app.use(cors());
// use mongoose to connect to mongodb
const mongoose = require('mongoose');
// connect to the database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });
// create schema for comments
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
// create model for comments
const Comment = mongoose.model('Comment', commentSchema);
// create a new comment
app.post('/comment', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    try {
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// get all comments
app.get('/comments', async (req, res) => {
    try {
        let comments = await Comment.find();
        res.send(comments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// delete a comment
app.delete('/comments/:id', async (req, res) => {
    try {
        await Comment.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// update a comment
app.put('/comments/:id', async (req, res) => {
    try {
        let comment = await Comment.findOne({
            _id: req.params.id
        });
        comment.name = req.body.name;
        comment.comment = req.body.comment;
        await comment.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// listen on port 3000
app.listen(3000, () => console.log('Server listening on port 3000!'));
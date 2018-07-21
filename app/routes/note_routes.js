//note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    // PUT Route
    app.put('/notes/:id',(req,res)=>{
        const id = req.params.id;
        const details = {
            '_id':new ObjectID(id)
        }
        const note = {
            title: req.body.title,
            text: req.body.body
        };
        db.collection('notes').update(details,note,(err,item)=>{
            if(err){
                res.send({
                    'error':'An error occurred while updating the resource.'
                })
            } else {
                res.send(note);
            }
        })
    })

    // DEL Route
    app.delete('/notes/:id',(req,res)=>{
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id)
        }
        db.collection('notes').remove(details, (err,item)=>{
            if(err){
                res.send({
                    'error':'An error occurred while removing the resource.'
                })
            } else {
                res.send('Note with id: '+id+' deleted successfully!');
            }
        })
    })

    // GET Route
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            // 'id': '5b53333d013704c2a215cce7'
            '_id': new ObjectID(id)
        };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error occurred while fetching the notes.'
                })
            } else {
                res.send(item);
            }
        });
    });

    // POST Route
    app.post('/notes', (req, res) => {
        const note = {
            text: req.body.body,
            title: req.body.title
        };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error occured while writing to database.'
                })
            } else {
                res.send(result.ops[0]);
            }
        })
        // // 2 Checked with Postman
        // console.log(req.body);
        // // 1
        // res.send('Hello from Notes!')
    });
};
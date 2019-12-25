var bodyParser =require('body-parser');
// install mongoose for database (npm install mongoose -save).
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://test:test@cluster0-i2lwe.mongodb.net/test?retryWrites=true&w=majority');

//Create a schema -this is like a blueprint
// schema means what mongoose or what mongodb is going to expect from our to do data
//and object with just one property which is an item and that is a string .
var todoSchema = new mongoose.Schema({
  item: String
});
//create a module (and base this modul in a schema)
// varible in module most be in captel (pass an object to the database and save it )
var Todo =mongoose.model('Todo', todoSchema);
//create an item and save it in the database
/*
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
  if(err) throw err;
  console.log('item saved');
});
*/
//add a dummy data
//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
/*
app.get('/todo', function(req, res){
  res.render('todo', {todos: data});
});
*/
app.get('/todo', function(req, res){
  //get data from mongodb and pass it to view
  Todo.find({}, function(err, data){
    if (err) throw err;
    res.render('todo', {todos: data});
  });
});
/*
app.post('/todo', urlencodedParser, function(req, res){
  data.push(req.body); // this for add some data to the array.
  res.json({todos: data});    // this for sending the data back to the front end .
});
*/
app.post('/todo', urlencodedParser, function(req, res){
  //get data from the view and it to mongodb
  var newTodo = Todo(req.body).save(function(err, data){
    if (err) throw err;
    res.json(data);
  })
});

/*
app.delete('/todo/:item', function(req, res){
  data = data.filter(function(todo){
    return todo.item.replace(/ /g, '-') !== req.params.item;
  });
  res.json({todos: data});
});
*/
app.delete('/todo/:item', function(req, res){
  //delete the requested item from mongodb
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
    if (err) throw err;
    res.json(data);
  });
});

};

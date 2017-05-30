var express = require('express');
var Handlebars = require('handlebars');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData  = db.get('userdata');
var userRoutine = db.get('exercises');
var globalId;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/log', function(req, res, next) {
  res.render('log');
});

router.get('/registro', function(req, res, next) {
  res.render('registro');
});

router.post('/', function(req, res, next) {
    var data = userData.findOne({username: req.body.username},  function(err, doc){
      if (doc){
        var items = doc;
        res.render('index', {'items' : items});
        globalId = items._id;
        console.log(globalId);
      }

    })
    //data.on('success', function(docs) {
    //res.render('index', {items: data});
    //console.log("error");
  });
//});

router.post('/insert', function(req, res, next) {
   //var pecho = req.body.pecho ? true : false;
  var item = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    estado: 0,
    injuries: {
      pecho: req.body.pecho ? true : false,
      espalda: req.body.espalda ? true : false,
      bicep: req.body.bicep ? true : false,
      tricep: req.body.tricep ? true : false,
      hombro: req.body.hombro ? true : false,
      pierna: req.body.pierna ? true : false,
      abdomen: req.body.abdomen ? true : false

    }
  };
  userData.insert(item);
  res.redirect('/');
});

router.get('/routines', function(req, res, next) {
  res.render('routines');
});


router.get('/profile', function(req, res, next) {
  res.render('profile');
});

router.get('/get-data', function(req, res, next) {

   var data = userData.find({},  function(err, doc){
      if (doc){
        var items = doc;
        res.render('admin', {'items' : doc});
      }

    });
  //var data = userData.find({});
  //data.on('success', function(docs) {
    //res.render('admin', {items: docs});
  //});
});

router.post('/update', function(req, res, next) {
  var item = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  //var id = req.body.id;

  //userData.update({"username": username})
  userData.update({"_id": db.id(globalId)}, item);
  res.render('index');
  //userData.updateById(id, item);
});

router.get('/admin', function(req, res, next) {
  res.render('admin');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.username; 
   userData.remove({"username": id});
  //userData.removeById(id);
  res.render('admin');
});

//Handlebars Managements
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});


module.exports = router;



//Pecho, espalda, biceps, triceps, hombro, pierna, abdomen
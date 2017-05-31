var express = require('express');
var Handlebars = require('handlebars');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData  = db.get('userdata');
var userRoutine = db.get('ejercicios');
var globalId;
var globalUser;
var globalExercise;
var sesion = false;

/* GET home page. */


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
        globalUser = items;
        sesion = true;
      }
    })
  });
<<<<<<< HEAD

  router.get('/', function(req, res, next) {
    if (sesion) {
      res.render('index', {'items' : globalUser});
    } else {
      res.render('index');
    }
  });

  router.get('/log-out', function(req, res, next) {
    sesion = false;
    res.render('index');
  });
=======
>>>>>>> origin/master

router.post('/insert', function(req, res, next) {
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

router.get('/aumento', function(req, res, next) {
  res.render('aumento', {'ejercicio': globalExercise, 'user' : globalUser});
});
router.get('/fuerza', function(req, res, next) {
  res.render('fuerza', {'ejercicio': globalExercise, 'user' : globalUser});
});
router.get('/tonificar', function(req, res, next) {
  res.render('tonificar', {'ejercicio': globalExercise, 'user' : globalUser});
});

router.get('/exercises', function(req, res, next) {
  res.render('exercises');
});

router.get('/get-exercises', function(req, res, next) {
  var data = userRoutine.find({},  function(err, doc){
     if (doc){
       globalExercise = doc;
       res.render('exercises', {'ejercicio' : doc, 'user' : globalUser});
     }
   });
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
});

router.post('/update', function(req, res, next) {
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
  userData.update({"_id": db.id(globalId)}, item);
  res.render('index');
});

router.get('/admin', function(req, res, next) {
  res.render('admin');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.username;
   userData.remove({"username": id});
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

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});


module.exports = router;



//Pecho, espalda, biceps, triceps, hombro, pierna, abdomen

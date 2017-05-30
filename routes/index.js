var express = require('express');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData  = db.get('userdata');

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
        console.log(items);
      }

    })
    //data.on('success', function(docs) {
    //res.render('index', {items: data});
    //console.log("error");
  });
//});

router.post('/insert', function(req, res, next) {
  var item = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  userData.insert(item);

  res.redirect('/');
});

router.get('/routines', function(req, res, next) {
  res.render('routines');
});

router.post('/update', function(req, res, next) {
  var item = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  var id = req.body.id;

  userData.update({"_id": db.id(id)}, item);
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
  res.render('index');
});

module.exports = router;

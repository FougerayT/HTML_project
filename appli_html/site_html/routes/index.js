var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

<<<<<<< Updated upstream
/*___________________________________________________USERS___________________________________________________*/
/* GET pour afficher la liste des utilisateurs */
router.get('/userlist', function(req, res) {
=======
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});

router.get('/signup', function(req, res) {
    res.render('signup', { title: 'signup' });
});

router.post('/login', function(req, res) {

    // On récupère les données du formulaire
	var test2 = req.body.typeuser;
	var test8 = test2[0].checked;
});
if (document.getElementById('client').checked) {
 valeur = document.getElementById('choix1').value;
}
var test = true;
/*___________________________________________________LIBRAIRES___________________________________________________*/
/* GET pour afficher la liste des libraires */
router.get('/librairelist', function(req, res) {
>>>>>>> Stashed changes
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET page pour un nouvel utilisateur. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST pour ajouter un utilisateur */
router.post('/adduser', function(req, res) {

    // On positionne la variable db sur la base de données
    var db = req.db;

    // On récupère les données du formulaire
	var userNom = req.body.usernom;
	var userPrenom = req.body.userprenom;
	var userEmail = req.body.useremail;
	var userSociete = req.body.usersociete;

    // On récupère la collection
    var collection = db.get('usercollection');

	// On insère les données dans la base
    collection.insert({
        "usernom" : userNom,
		"userprenom" : userPrenom,
        "useremail" : userEmail,
		"usersociete" : userSociete
    }, function (err, doc) {
        if (err) {
            // En cas de problème, on renvoie une erreur
            res.send("Il y a un problème pour insérer les données dans la base.");
        }
        else {
            // En cas de succès on revient sur la page /userlist
            res.location("userlist");
            res.redirect("userlist");
        }
    });
});

/*___________________________________________________BOOKS___________________________________________________*/
/* GET pour afficher la liste des livres */
router.get('/booklist', function(req, res) {
    var db = req.db;
    var collection = db.get('bookcollection');
    collection.find({},{},function(e,docs){
        res.render('booklist', {
            "booklist" : docs
        });
    });
});
/* GET pour afficher la liste des livres d'un libraire*/
router.get('/mybook', function(req, res) {
	
	var db = req.db;
	var collection = db.get('bookcollection');
    collection.find({'bookvendeur':"Librairie La Nuit des temps"},{},function(e,docs){
        console.log(docs);
		res.render('mybook', { 'booklist': docs});
    });
});

/* GET page pour un nouveau livre */
router.get('/newbook', function(req, res) {
    res.render('newbook', { title: 'Add New Book' });
});


/* POST pour ajouter un livre */
router.post('/addbook', function(req, res) {

    // On positionne la variable db sur la base de données
    var db = req.db;

    // On récupère les données du formulaire
	var bookTitre = req.body.booktitre;
	var bookAuteur = req.body.bookauteur;
	var bookType = req.body.booktype;
	var bookAnnee = req.body.bookannee;
	var bookEditeur = req.body.bookediteur;
	var bookVendeur = req.body.bookvendeur;
	var bookPrix = req.body.bookprix;

    // On récupère la collection
    var collection = db.get('bookcollection');

	// On insère les données dans la base
    collection.insert({
        "booktitre" : bookTitre,
		"bookauteur" : bookAuteur,
		"booktype" : bookType,
		"bookannee" : bookAnnee,
		"bookediteur" : bookEditeur,
		"bookvendeur" : bookVendeur,
		"bookprix" : bookPrix		
    }, function (err, doc) {
        if (err) {
            // En cas de problème, on renvoie une erreur
            res.send("Il y a un problème pour insérer les données dans la base.");
        }
        else {
            // En cas de succès on revient sur la page /userlist
            res.location("booklist");
            res.redirect("booklist");
        }
    });
});

module.exports = router;

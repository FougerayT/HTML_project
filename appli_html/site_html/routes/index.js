var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});

router.get('/signup', function(req, res) {
    res.render('signup', { title: 'signup' });
});

/*___________________________________________________LIBRAIRES___________________________________________________*/
/* GET pour afficher la liste des libraires */
router.get('/librairelist', function(req, res) {
    var db = req.db;
    var collection = db.get('librairecollection');
    collection.find({},{},function(e,docs){
        res.render('librairelist', {
            "librairelist" : docs
        });
    });
});

/* GET page pour un nouvel libraire. */
router.get('/newlibraire', function(req, res) {
    res.render('newlibraire', { title: 'Add New Libraire' });
});

/* POST pour ajouter un libraire */
router.post('/addlibraire', function(req, res) {

    // On positionne la variable db sur la base de données
    var db = req.db;

    // On récupère les données du formulaire
	var libraireNom = req.body.librairenom;
	var librairePrenom = req.body.libraireprenom;
	var libraireEmail = req.body.libraireemail;
	var libraireSociete = req.body.librairesociete;

    // On récupère la collection
    var collection = db.get('librairecollection');

	// On insère les données dans la base
    collection.insert({
        "librairenom" : libraireNom,
		"libraireprenom" : librairePrenom,
        "libraireemail" : libraireEmail,
		"librairesociete" : libraireSociete
    }, function (err, doc) {
        if (err) {
            // En cas de problème, on renvoie une erreur
            res.send("Il y a un problème pour insérer les données dans la base.");
        }
        else {
            // En cas de succès on revient sur la page /librairelist
            res.location("librairelist");
            res.redirect("librairelist");
        }
    });
});

/*___________________________________________________CLIENTS___________________________________________________*/
/* GET pour afficher la liste des clients */
router.get('/clientlist', function(req, res) {
    var db = req.db;
    var collection = db.get('clientcollection');
    collection.find({},{},function(e,docs){
        res.render('clientlist', {
            "clientlist" : docs
        });
    });
});

/* GET page pour un nouvel client. */
router.get('/newclient', function(req, res) {
    res.render('newclient', { title: 'Add New Client' });
});

/* POST pour ajouter un client */
router.post('/addclient', function(req, res) {

    // On positionne la variable db sur la base de données
    var db = req.db;

    // On récupère les données du formulaire
	var clientNom = req.body.clientnom;
	var clientPrenom = req.body.clientprenom;
	var clientEmail = req.body.clientemail;
	var clientSociete = req.body.clientsociete;

    // On récupère la collection
    var collection = db.get('clientcollection');

	// On insère les données dans la base
    collection.insert({
        "clientnom" : clientNom,
		"clientprenom" : clientPrenom,
        "clientemail" : clientEmail,
		"clientsociete" : clientSociete
    }, function (err, doc) {
        if (err) {
            // En cas de problème, on renvoie une erreur
            res.send("Il y a un problème pour insérer les données dans la base.");
        }
        else {
            // En cas de succès on revient sur la page /clientlist
            res.location("clientlist");
            res.redirect("clientlist");
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

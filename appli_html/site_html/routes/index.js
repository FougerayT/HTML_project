var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
    var collection = db.get('bookcollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "booklist" : docs
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});

router.get('/signup', function(req, res) {
    res.render('signup', { title: 'signup' });
});

/*__________________________________________________RESERVATION__________________________________________________*/
router.get('/reservation', function(req, res) {
	console.log('cc');
	var titre=req.query.t;
	var vendeur=req.query.v;
	var prix=req.query.p;
	var db = req.db;
	var collection = db.get('librairecollection');
    collection.find({'librairesociete':vendeur},{},function(e,docs){
        console.log(docs[0].libraireadresse);
		res.render('reservation', { titre: titre , vendeur: vendeur, prix: prix, "libraire_res": docs[0].libraireadresse});
    });
});
/*__________________________________________________CONNEXION_________________________*/
/*POST pour se connecter*/
router.post('/connect',function(res,req){
	var mail=req.body.email;
	var passwd=req.body.mdp;
	for(const client in clientlist){
		if(client.clientemail==mail && client.clientpassword==passwd){
				var loggedin=1;
				var nom=client.clientnom;
				var prenom=client.clientprenom;	
		}
	}
	for(const libraire in librairelist){
		if(libraire.libraireemail==mail && libraire.librairepassword==passwd){
				var loggedin=2;
				var societe=libraire.librairesociete;
		};
	};
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
	var libraireSociete = req.body.librairesociete;
	var libraireLogin = req.body.librairelogin;
	var librairePassword = req.body.librairepassword;
	var libraireEmail = req.body.libraireemail;
	var libraireTelephone = req.body.librairetelephone;
	var libraireAdresse = req.body.libraireadresse;

    // On récupère la collection
    var collection = db.get('librairecollection');

	// On insère les données dans la base
    collection.insert({
        "librairesociete" : libraireSociete,
		"librairelogin" : libraireLogin,
		"librairepassword" : librairePassword,
        "libraireemail" : libraireEmail,
		"librairetelephone" : libraireTelephone,
		"libraireadresse" : libraireAdresse
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
	var clientLogin = req.body.clientlogin;
	var clientPassword = req.body.clientpassword;
	var clientEmail = req.body.clientemail;
	var clientTelephone = req.body.clienttelephone;
	var clientAdresse = req.body.clientadresse;

    // On récupère la collection
    var collection = db.get('clientcollection');

	// On insère les données dans la base
    collection.insert({
        "clientnom" : clientNom,
		"clientprenom" : clientPrenom,
		"clientlogin" : clientLogin,
		"clientpassword" : clientPassword,
        "clientemail" : clientEmail,
		"clienttelephone" : clientTelephone,
		"clientadresse" : clientAdresse
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
    var bookImage = req.body.bookimage;


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
		"bookprix" : bookPrix,	
        "bookimage"	:bookImage
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

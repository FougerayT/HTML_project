var express = require('express');
var router = express.Router();
var loggedin = 0;
var login;
var prenom;	

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< Updated upstream
  res.render('index', { title: 'Express' });
=======
  var db = req.db;
    var collection = db.get('bookcollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "booklist" : docs, "loggedin" : loggedin
        });
    });
>>>>>>> Stashed changes
});

<<<<<<< Updated upstream
/*___________________________________________________USERS___________________________________________________*/
/* GET pour afficher la liste des utilisateurs */
router.get('/userlist', function(req, res) {
=======
router.get('/login', function(req, res) {
    res.render('login', { title: 'login', "loggedin" : loggedin });
});

router.get('/signup', function(req, res) {
    res.render('signup', { title: 'signup', "loggedin" : loggedin });
});

<<<<<<< Updated upstream
router.post('/login', function(req, res) {

    // On récupère les données du formulaire
	var test2 = req.body.typeuser;
	var test8 = test2[0].checked;
});
if (document.getElementById('client').checked) {
 valeur = document.getElementById('choix1').value;
}
var test = true;
=======
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
		res.render('reservation', { titre: titre , vendeur: vendeur, prix: prix, "libraire_res": docs[0].libraireadresse, "loggedin" : loggedin});
    });
});
/*__________________________________________________CONNEXION_________________________*/
/*POST pour se connecter*/
router.post('/connect',function(req,res){
	var db = req.db;
	
	var mail=req.body.email;
	var passwd=req.body.mdp;
	var i = 0;
	var j = 0;	
	
    var collection = db.get('clientcollection');
    collection.find({},{},function(e,docs){
        for(const client in docs){
			if(docs[i].clientemail==mail && docs[i].clientpassword==passwd){
					loggedin=1;
					login=docs[i].clientnom + " " + docs[i].clientprenom;
					prenom=docs[i].clientprenom;
			}
			i = i + 1;
		}
    });
	
	var collection = db.get('librairecollection');
	collection.find({},{},function(e,docs){
		for(const libraire in docs){
			console.log("______________________test4_____________________________________________");
			if(docs[j].libraireemail==mail && docs[j].librairepassword==passwd){
					loggedin=2;
					login=docs[j].librairesociete;
			};
			j = j + 1;
		};
	});
	
	res.location("librairelist");
    res.redirect("librairelist");
	res.render('', {"loggedin" : loggedin, "login" : login});
});


/* GET page pour un nouvel libraire. */
router.get('/deco', function(req, res) {
	loggedin = 0;
	login = "";
    res.render('login', {"loggedin" : loggedin, "login" : login });
});


>>>>>>> Stashed changes
/*___________________________________________________LIBRAIRES___________________________________________________*/
/* GET pour afficher la liste des libraires */
router.get('/librairelist', function(req, res) {
>>>>>>> Stashed changes
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
<<<<<<< Updated upstream
        res.render('userlist', {
            "userlist" : docs
=======
        res.render('librairelist', {
            "librairelist" : docs, "loggedin" : loggedin, "login" : login
>>>>>>> Stashed changes
        });
    });
});

<<<<<<< Updated upstream
/* GET page pour un nouvel utilisateur. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
=======
/* GET page pour un nouvel libraire. */
router.get('/newlibraire', function(req, res) {
    res.render('newlibraire', { title: 'Add New Libraire', "loggedin" : loggedin, "login" : login });
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            // En cas de succès on revient sur la page /userlist
            res.location("userlist");
            res.redirect("userlist");
=======
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
            "clientlist" : docs, "loggedin" : loggedin, "login" : login
        });
    });
});

/* GET page pour un nouvel client. */
router.get('/newclient', function(req, res) {
    res.render('newclient', { title: 'Add New Client', "loggedin" : loggedin, "login" : login });
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
>>>>>>> Stashed changes
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
            "booklist" : docs, "loggedin" : loggedin, "login" : login
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

/* GET pour afficher la liste des livres d'un libraire*/
router.get('/mybook', function(req, res) {
	
	var db = req.db;
	var collection = db.get('bookcollection');
    collection.find({'bookvendeur':"Librairie La Nuit des temps"},{},function(e,docs){
        console.log(docs);
		res.render('mybook', { 'booklist': docs});
    });
});

/* GET pour afficher la liste des livres d'un libraire*/
router.get('/mybook', function(req, res) {
	
	var db = req.db;
	var collection = db.get('bookcollection');
    collection.find({'bookvendeur':login},{},function(e,docs){
        console.log(docs);
		res.render('mybook', { 'booklist': docs, "loggedin" : loggedin, "login" : login});
    });
});

/* GET page pour un nouveau livre */
router.get('/newbook', function(req, res) {
    res.render('newbook', { title: 'Add New Book', "loggedin" : loggedin, "login" : login });
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

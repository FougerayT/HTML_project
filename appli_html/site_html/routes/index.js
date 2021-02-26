var express = require('express');
var router = express.Router();
var loggedin = 0;
var login;
var prenom;

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
    var collection = db.get('bookcollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "booklist" : docs,"loggedin" : loggedin, "login" : login 
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { title: 'login',"loggedin" : loggedin, "login" : login  });
});

router.get('/signup', function(req, res) {
    res.render('signup', { title: 'signup',"loggedin" : loggedin, "login" : login  });
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
		res.render('reservation', { titre: titre , vendeur: vendeur, prix: prix, "libraire_res": docs[0].libraireadresse,"loggedin" : loggedin, "login" : login });
	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'contact.libcovid@gmail.com',
		pass: 'libcovid_49'
	  }
	});

	var mailOptions = {
	  from: 'contact.libcovid@gmail.com',
	  to: docs[0].libraireemail,
	  subject: 'Nouvelle réservation d\'un de vos livres !',
	  html: '<h3>Bonjour</h3><p>Yann a réservé votre livre : <em>'+ titre + '</em> au prix de ' + prix + '€.</p><p>Pensez à vérifier la pièce d\'identité de l\'acheteur.</p><p></p><p>Cordialement</p><p></p><p>L\'équipe LibCovid\'</p>'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
	});
});
/*_________________________________________________SUPPRESSION___________________________*/
router.get('/suppression', function(req, res) {
	var titre=req.query.t;
	var vendeur=decodeURIComponent(req.query.v);
	var db = req.db;
	var collection = db.get('bookcollection');
	console.log("__testoui__");
	collection.remove({'bookvendeur': vendeur, 'booktitre':titre}, function(e,docs){
		collection.find({'bookvendeur':login},{},function(e,docs){
			res.render('mybook', { 'booklist': docs, "loggedin" : loggedin, "login" : login});
		});
	});
	console.log("__testnon__");
});
/*__________________________________________________CONNEXION_________________________*/
/*POST pour se connecter*/
router.post('/connect',function(req,res){
	var db = req.db;

	var mail=req.body.email;
	var passwd=req.body.mdp;
	var i = 0;
	var j = 0;
	console.log("__test1__");

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
			console.log("__test4__");
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


/*___________________________________________________DECONNEXION___________________________________________________*/
/* GET deconnexion */
router.get('/deco', function(req, res) {
	loggedin = 0;
	login = "";
	res.render('login', {"loggedin" : loggedin, "login" : login });
});
/*___________________________________________________LIBRAIRES___________________________________________________*/
/* GET pour afficher la liste des libraires */
router.get('/librairelist', function(req, res) {
    var db = req.db;
    var collection = db.get('librairecollection');
    collection.find({},{},function(e,docs){
        res.render('librairelist', {
            "librairelist" : docs,"loggedin" : loggedin, "login" : login 
        });
    });
});

/* GET page pour un nouvel libraire. */
router.get('/newlibraire', function(req, res) {
    res.render('newlibraire', { title: 'Add New Libraire', "loggedin" : loggedin, "login" : login  });
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

/* GET page pour un livre d'un libraire. */
router.get('/livrelib', function(req, res) {
	console.log("__testnon__");
	var vendeur=req.query.v;
	
	var db = req.db;
	var collection = db.get('bookcollection');
	collection.find({'bookvendeur':vendeur},{},function(e,docs){
        console.log(docs);
		res.render('booklist', {"booklist" : docs, "loggedin" : loggedin, "login" : login });
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
    res.render('newclient', { title: 'Add New Client', "loggedin" : loggedin, "login" : login  });
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

/*___________________________________________________BOOKS_____________________________________________________________*/
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

/* GET page pour un nouveau livre */
router.get('/newbook', function(req, res) {
    res.render('newbook', { title: 'Add New Book', "loggedin" : loggedin, "login" : login  });
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
	var bookVendeur = login;
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

/* GET pour afficher la liste des livres d'un libraire*/
router.get('/mybook', function(req, res) {

	var db = req.db;
	var collection = db.get('bookcollection');
	collection.find({'bookvendeur':login},{},function(e,docs){
		console.log(docs);
		res.render('mybook', { 'booklist': docs, "loggedin" : loggedin, "login" : login});
	});
});

module.exports = router;
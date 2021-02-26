var express = require('express');
var router = express.Router();
<<<<<<< Updated upstream
=======
var loggedin = 0;
var login;
const multer = require('multer');
const path = require('path');
const { PassThrough } = require('nodemailer/lib/xoauth2');
>>>>>>> Stashed changes

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*___________________________________________________USERS___________________________________________________*/
/* GET pour afficher la liste des utilisateurs */
router.get('/userlist', function(req, res) {
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

/* GET page pour un nouveau livre */
router.get('/newbook', function(req, res) {
    res.render('newbook', { title: 'Add New Book' });
});

/*
// Public Folder 
router.use(express.static('./public'));

//enregistrement image dans dossier 
const storage = multer.diskStorage({
	destination: './public/upload/',
	filename: function(req,file,cb){
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

//init upload 
const upload = multer({
	storage : storage
}).single('bookimage');
*/

/* POST pour ajouter un livre */
router.post('/addbook', function(req, res) {

	// On positionne la variable db sur la base de données

	/*
	upload(req,res,(err)=>{
		if(err){
			res.render('there is an error')}
		else{
			console.log(req.file);
		}
	})
	*/
	
	var db = req.db;


    // On récupère les données du formulaire

	var bookTitre = req.body.booktitre;
	var bookAuteur = req.body.bookauteur;
	var bookType = req.body.booktype;
	var bookAnnee = req.body.bookannee;
	var bookEditeur = req.body.bookediteur;
	var bookVendeur = req.body.bookvendeur;
	var bookPrix = req.body.bookprix;
<<<<<<< Updated upstream
=======
    var bookImage = req.body.bookimage;
	console.log(bookTitre);

>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
		"bookprix" : bookPrix		
=======
		"bookprix" : bookPrix,	
        "bookimage"	: bookImage
>>>>>>> Stashed changes
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

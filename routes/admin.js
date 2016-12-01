/**
 * Created by romain on 14/07/2014.
 */

var express = require('express');
var router = express.Router();
var auth = require('../BusinessClass/LoginBusiness');
var article = require('../BusinessClass/ArticleBusiness');
var fs = require('fs');
var path = require('path');


//var model = require("../Model/Entities");

router.get('/', function(req, res) {

   //console.log("prout "+req.session);


    if(req.session.isLogged) {

        article.GetAllCategories(function(cat){

            var listFiles = fs.readdirSync(path.join(__dirname, '../public/images'));
            //var filesArray = listFiles.split(',');

            //console.log("Les catégories "+cat[0]);

            res.render('admin/admin', {
                title: "Administration zone",
                category: cat,
                images: listFiles
            });
        });

    }
    else
    {
        res.render('admin/login', {
            title: "Login"
        });
    }
});


router.post('/validLogin',function(req, res){
    //console.log("ValidLogin!");


    //console.log(req.body.ident);



    auth.Login({ident: req.body.ident, pwd: req.body.pwd}, function(valid){
        if(valid)
        {
            req.session.isLogged = true;
            //console.log(req.session);
        }

        res.redirect("/admin");


   });
});

//router.get('/insertUser',function(req, res){
//    var userModel = model.User;
//
//    console.log(req);
//    userModel({ident: req.query.ident, pwd: req.query.pwd}).save(function(err, user){
//
//    });
//    res.send('admin/admin');
//
//});

//------------------------------------------------------ARTICLE AND CATEGORY MANGEMENT-------------------------------------------------------//


router.post('/insertArticle', function(req, res){

    //console.log("insert article : "+req.body.category);

    article.GetCategory(req.body.category, function(cat){
        var date = new Date().toISOString();
        article.InsertArticle({
            title: req.body.title,
            date: date,
            content: req.body.content,
            categoryOwner: cat,
            image: req.body.image,
	    colorTheme: req.body.colorTheme
        }, function(mess){

            //console.log(mess);

            article.AddArticleToPage(req.page,mess.article,function(callback){

            //Coder l'affiche de la page plutot avec les infos à mettre à jour
			//console.log("Hey");
                res.send({message: mess});
            });
        });
    });

});


router.post('/insertCategory', function(req, res){

    //console.log(req.body);
    article.InsertCategory({
        name: req.body.name,
        metaType: req.body.metaType,
        headerImage: req.body.headerImage,
        headerTextTitle: req.body.headerTextTitle,
        headerDesc: req.body.headerDesc
    }, function(mess){
            //console.log("Categorie ajoutee");
        //Coder l'affiche de la page plutot avec les infos à mettre à jour
        article.InsertPage({    name: req.body.name,
            templateName : req.body.templateName},
            function(cb){

                res.send({message: mess});


        });
    });


});

router.get('/ArticleById',function(req, res){
    article.GetArticle(req.query.id, function(resp){
        //TODO Coder la récupération du nom de la categorie
        //console.log( "Edition return : %j", resp );
        res.json(resp);
    });
});

router.get('/getAllImages', function(req, res){
    //console.log(express.directory('public'));
});

router.get('/ArticleManagement', function(req, res){
    article.GetAllPages(function(pages){

        article.GetAllCategories(function(cat){

            article.GetAllArticles(function(art){
                    var listFiles = fs.readdirSync(path.join(__dirname, '../public/images'));
                    listFiles.push(null);
                //res.send(200,cat);
                res.render('admin/_AdminArticles', {
                    articles: art,
                    images: listFiles,
                    categories: cat,
                    pages : pages
                });
            });
        });

    });
});

router.get('/CategoriesManagement', function(req, res){

    article.GetAllCategories(function(cat){

        var listFiles = fs.readdirSync(path.join(__dirname, '../public/images'));

            res.render('admin/_AdminCategories', {
                category: cat,
                images: listFiles
            });
        });
});

router.get('/ArticlesFromCategory',function(req, res){
   article.GetArticlesByCategory(req.query.catId,function(artList){
       res.json({articles: artList});
   }) ;
});

router.get('/DeleteArticle',function(req,res){
    var id = req.query.articleId;
    //console.log("Article ID to delete "+ id);
   article.DeleteArticle(id,function(err){
        //console.log(err);
       res.send({message: "Ok"});

   });
    //res.send(200,{message: "Ok"});
});

router.get('/PageManagement',function(req,res){

    article.GetAllPages(function(pages){
        //console.log("Pages : %j",pages);
        res.render('admin/_AdminPages', {pages: pages });
        //res.send(200,pages);
    });
});



router.post('/insertPage',function(req, res){

   article.InsertPage({
       name: req.body.name,
       templateName : req.body.templateName},
       function(cb){
        res.send(200,cb);
   });
});

module.exports = router;



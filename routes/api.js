/**
 * Created by romain on 23/08/2014.
 */
var express = require('express');
var router = express.Router();
var articles = require("../BusinessClass/ArticleBusiness");

/* API */
router.get('/getAllArticles', function(req, res) {

    articles.GetAllArticles(function(dataList){
//       console.log(dataList.articles);
        res.jsonp(dataList.articles );

    });


});

router.get('/getArticle/:id', function(req, res) {

//    console.log("Il faut implémenter la recherche d'article maintenant");
    articles.GetArticle(req.params.id,function(data){

        console.log(data);
//        res.jsonp(data);
    })



});

module.exports = router;
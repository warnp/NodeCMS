var express = require('express');
var router = express.Router();
var articles = require("../BusinessClass/ArticleBusiness");
var parser = require("markdown-parse");
var moment = require('moment');
var parser = require("markdown-parse");

router.get('/',function(req,res){

	var port = "Blog";

	articles.GetCategoryByName(port, function(cat){
	        //console.log(cat.category);
	        articles.GetArticlesByCategory(cat.category._id.toString(),function(artList){
			for(var i = 0; i < artList.articles.length;i++){
				artList.articles[i].date = moment(artList.articles[i].date).format("D/MM/YYYY");
			}
			res.render("blogViewer", {
			            title: "Blog de Romain Assié!",
			            articles: artList,
				    blog : true
			        });

		});
	});
});

router.get('/:articleId', function(req,res){
    articles.GetArticle(req.params.articleId, function(art){
	    if(!art.article.content){
		art.article.content = "";
	    }
	    parser(art.article.content,function(err, resultHtml){
		var result = {
				article:{
		    		"content": resultHtml.html,
		    		"title": art.article.title,
		    		"image": art.article.image,
		    		"colorTheme": art.article.colorTheme
		    },
		    title : art.article.title
	
	
		};
	
	        res.render('customPages/blog/articleBlog',result);
		    
	    });

    });
});
module.exports = router;

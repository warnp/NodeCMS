var express = require('express');
var router = express.Router();
var articles = require("../BusinessClass/ArticleBusiness");
var parser = require("markdown-parse");

/* GET home */
router.get('/', function(req, res) {
	console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    var port = "Portfolio";

    articles.GetCategoryByName(port, function(cat){
        //console.log(cat.category);
        articles.GetArticlesByCategory(cat.category._id.toString(),function(artList){

		articles.GetAllPages(function(pages){
	                res.render('index', {
	                    title: 'Romain Assié',
	                    articles: artList,
			    pages: pages

		});


            });
        });
    });

});

//router.get('/presentation/Portfolio',function(req,res){
    //var port = "portfolio";
    //articles.GetCategoryByName(port, function(cat){
        ////console.log(cat.category);
        //articles.GetArticlesByCategory(cat.category._id.toString(),function(artList){




                //res.render('customPages/Portfolio',{
                    //articles: artList
            //});
        //});
    //});

//});

//GET récupère la liste des articles du blog
router.get('/presentation/Blog', function(req,res){
    articles.GetAllArticles(function(dataList) {

	    
        res.render('customPages/Blog',{ frontArticle : dataList.articles});
    });
});


//API pour récupérer un article
router.get('/article/:article', function(req, res){
    //console.log(":articles "+req.params.article);

    articles.GetArticle(req.params.article,function(data) {
        //console.log(data);
	if(data.article){
		if(data.article.content ){
			parser(data.article.content, function(err, result){
				//console.log("Render : "+ result.html);
				res.render('Article',{articleTitle: data.article.title, articleContent: result.html, articleImage: data.article.image});
				
			});
		}else{
			
				res.render('Article',{articleTitle: data.article.title, articleContent: data.article.content, articleImage: data.article.image});
		}
	}else{
		res.send(404);
	}

		
	


    });
});

//API pour afficher les différentes catégories
router.get('/presentation/:template/:category', function(req ,res){
	var category = req.params.category;
    //TODO Très moche
    if(req.params.category === "Blog"){
        res.redirect("http://assie.io/blog");
    }
    //console.log("Draw category "+req.params.template+" " + req.params.category);
	articles.GetCategoryByName(category, function(cat){

		//console.log(cat.category);
		if(cat.category === null){
		//console.log("Impossible de trouver la catégorie pour la page");
			//res.send(404,'Impossible de trouver la catégorie pour la page');
			res.render(404);
			return;
		}
		articles.GetArticlesByCategory(cat.category._id.toString(),function(artList){
			if(artList.articles === null){
				res.send(500,"Pas d'articles présents");
			}	
    			res.render('customPages/'+req.params.template, {articles: artList});
	
	
	            });
	    });


});




module.exports = router;

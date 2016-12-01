/**
 * Created by romain on 21/08/2014.
 */
var model = require("../Model/Entities");
var ObjectId = require('mongodb').ObjectID;

exports.GetArticle = function(id, callback){

    //console.log( "GetArticle: "+ id );
    model.Article.findOne({"_id" : new ObjectId(id)}, function(err,art){
        
        callback({
            article: art
        });

    });


};

exports.GetCategory = function(id, callback){

    //console.log("cat id : "+id);
    model.Category.findOne({"_id" : id}, function(err,cat){
        callback({
            category: cat
        });

    });


};

exports.GetCategoryByName = function(name, callback){

    //console.log("cat name : "+name);
    model.Category.findOne({"name" : name}, function(err,cat){
        callback({
            category: cat
        });

    });


};

exports.GetArticlesByCategory = function(categoryId, callback){

    //console.log(categoryId);

        model.Article.find({"categoryOwner": ObjectId(categoryId)}).exec( function (err, artList) {

            //console.log("artlist : "+ artList);

            callback({
                articles: artList
            });
        });

};

exports.GetAllArticles = function(callback) {

    model.Article.find(function(err, articles){
        callback({
            articles: articles
        });
    });
};

exports.GetAllCategories = function(callback) {

    model.Category.find(function(err, categories){
        callback({
            categories: categories
        });
    });

};

exports.InsertArticle = function (newArticle,callback) {

    model.Article.find({title: newArticle.title},function(err, a){
        if (a.length === 0){
                model.Article({title: newArticle.title,
                              date: newArticle.date,
                              content: newArticle.content,
                              categoryOwner: newArticle.categoryOwner.category,
                              colorTheme: newArticle.colorTheme,
                              image: newArticle.image}).save(function(err, art){
                
                                 if(err)
                                 {
                                     callback({
                                         error: err
                                     });
                                 }
                                 callback({
                                     article: art
                                 });
                    });
        }else{
            model.Article.update({title: newArticle.title},{$set:{
                              content: newArticle.content,
                              categoryOwner: newArticle.categoryOwner.category,
                              colorTheme: newArticle.colorTheme,
                              image: newArticle.image
            }}, function(err, art){
                callback({
                    article: art
                });
            });
        }
         

    });
   };

exports.InsertCategory = function (newCategory,callback) {
    model.Category({name: newCategory.name, metaType: newCategory.metaType}).save(function(err, cat){
        callback({
           category: cat
        });

    });
};

exports.DeleteArticle = function(selectedArticle, callback){
    model.Article.remove({"_id": ObjectId(selectedArticle)},function(err, result){
        callback({
           result :result
        });
        //console.log("DeleteArticle done!");
    });
};

exports.GetAllPages = function(callback){
    model.Page.find(function(err,pages) {
		//console.log("Business pages : %j", pages);
        callback({
            pages: pages
        });
    });
};

exports.InsertPage =function(newPage,callback){
    model.Page({name : newPage.name, templateName : newPage.templateName, articles : []}).save(function(err, page){
        callback({
            page : page
        });
    });
};

exports.AddArticleToPage = function(pageId, article, callback){
    model.Page.findById(ObjectId(pageId),function(err,page){
        if(err) return;

        //console.log(page);
	callback( {
		page: page
	} );
        //page.articles.push(article);
        //page.save(function(err){
            //if(err)return;

        //});
    });

};

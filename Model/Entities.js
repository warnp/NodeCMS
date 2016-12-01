/**
 * Created by romain on 15/08/2014.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    ident: String,
    pwd: String
});

var categorySchema = mongoose.Schema({
    name: String,
    metaType: String,
    //Header de la catégorie : c'est l'image et le texte apparaissant en haut d'une page de catégorie
    headerImage: String,
    headerTextTitle: String,
    headerDesc: String
});

var articleSchema = mongoose.Schema({
    title: String,
    date: String,
    content: String,
    image: String,
    colorTheme: String,
    categoryOwner: [{type: mongoose.Schema.Types.ObjectId, ref:'Category'}]


});

var imageSchema = mongoose.Schema({
    name: String,
    //Chemin d'accès sur le serveur
    uploadName: String
});

var pageSchema = mongoose.Schema({
    name: String,
    templateName : String,
    articles : [{type: mongoose.Schema.Types.ObjectId, ref:'Article'}]
});


var User = mongoose.model("User", userSchema);
var Category = mongoose.model("Category", categorySchema);
var Article = mongoose.model("Article", articleSchema);
var Image = mongoose.model("Image", imageSchema);
var Page = mongoose.model("Page", pageSchema);

var salt = 'JeSuisUneBanane';
var version = "0.9.1";
module.exports = {
    User: User,
    Category: Category,
    Article: Article,
    Salt: salt,
    Image: Image,
    Page :Page
};


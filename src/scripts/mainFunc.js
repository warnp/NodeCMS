/**
 * Created by romain on 04/09/2014.
 */

$("#pagBtn").click(function(){
   redraw("admin/PageManagement");
});

$("#catBtn").click(function(){

redraw("admin/CategoriesManagement");

});

$("#artBtn").click(function(){
    redraw("admin/ArticleManagement");


});
//*****************************************PAGES************************************************//
$("#management").delegate("#addPageBtn","click",function(){
    $.ajax({
        type:"POST",
        url: "admin/insertPage",
        data:{
            name: $("#pageName").val(),
            templateName: $("#templateName").val()
        }
    }).done(function(resp){

    });
});
//*****************************************CATEGORIES************************************************//
$("#management").delegate("#addCatBtn","click",function(){
    $.ajax({
            type: "POST",
            url: "admin/insertCategory",
            data:{
                name: $("#name").val(),
                metatype: $("#metatype").val(),
                headerImage: $("#headerImage").val(),
                headerTextTitle: $("#headerTextTitle").val(),
                headerDesc: $("#headerDesc").val(),
                templateName: $("#templateName").val()
    
            }
            
    
        }).done(function(data){
            alert("Well done");
        }).fail(function(jqXHR, status){
            alert("Fail "+ status);
        });
});

//*****************************************ARTICLES************************************************//

$("#management").delegate(".edit-articles","click", function(){
    var id= $(this).parent().parent().attr("id").split("collapse")[1];

    $.ajax({
        type: "GET",
        url:"admin/ArticleById?id="+id
    }).done(function(resp){
        //$("#category").val(resp.)
        $("#title").val(resp.article.title);
        $("#content").val(resp.article.content);
        $("#selectImage").val(resp.article.image);
        $("#colorTheme").val(resp.article.colorTheme);
	
    }) ;
});

$("#management").delegate(".delete-articles","click",function(){
    var id= $(this).parent().parent().attr("id").split("collapse")[1];

    $.ajax({
        type:"GET",
        url:"admin/DeleteArticle?articleId="+id
    }).done(function(){
        alert("Larticle a été supprimé!");
        redraw("admin/ArticleManagement");
    });
});

$("#management").delegate("a.accordionTitle","click",function(){
    var id = $(this).parent().parent().attr("id").split("heading")[1];

    $.ajax({
        type:'GET',
        url:"admin/ArticlesFromCategory?catId="+id
    }).done(function(data){

        $("#collapse" + id).children().children(".artList").html("");

        for(var i = 0; i < data.articles.articles.length; i++) {

            $("#collapse" + id).children().children(".artList").append('<div class="row"><a id="article' + data.articles.articles[i]._id + '" href="#">' + data.articles.articles[i].title+'</a></div>');
        }
    });
});

$("body").delegate("#addArticleButton","click",function(){
	$.ajax({
		type:'POST',
		url:'admin/insertArticle',
		data: {
		            title: $("#title").val(),
		            content: $("#content").val(),
			    category: $( "#category").val(),
			    colorTheme: $("#colorTheme").val(),
                image: $("#selectImage").val()
		}
	}).done(function(resp){
	    redraw("admin/ArticleManagement");
	});	
});

var redraw = function(path){
    $.ajax({
        type:"GET",
        url: path
    }).done(function(resp) {
        $("#management").empty();
        $("#management").html(resp);
    });
};



$(document).ready(function(){
	$('.selectible').selectpicker();
});

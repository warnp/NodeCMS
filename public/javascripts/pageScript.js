/**
 * Created by romain on 24/09/2014.
 */
$(document).ready(function() {
	var container = document.querySelector("#panel");

	//history.pushState(null,null,'');
	var menuDeployed = false;
	hljs.initHighlightingOnLoad();

	window.addEventListener('popstate',function(e){
		var state = e.state;
		goHome();		
	});

	var goHome = function(){
    		$("#articlePres").fadeOut(100);

		$(".btnBrand").removeClass("is-open");

		$(".navbar").css( "background-color", "transparent");
		$.ajax({
			method: 'GET',
			url: 'presentation/Portfolio/Portfolio'
		}).done(function(data){
			window.scrollTo(0,0);
			$("#pageContent").children().remove();
			$("#pageContent").css("display","none");
			$("#pageContent").html(data);
			$("#pageContent").removeClass("container-fluid");
			$("#pageContent").addClass("container");
			$(".navigationBar > ul > li > a").css("color", "#000");

			$("#pageContent").fadeIn(200);
		});
	};

	//Navbar navigation
    $(document).delegate('.article-element','click',function () {

        //TODO ça me plait pas trop, il vaudrait mieux changer de page peut être
	//ALARM ALARM Not used
        $.ajax({
            url:'article/'+$(this).attr("id").replace(/\s/g,'').split('_')[0],
            type:'GET'
        }).done(function(data){
            window.scrollTo(0,0);
            $(".allContent").html(data);
            $(".mastHead").hide();


        });

    });

    //Show article
    $(document).delegate('.item','click',function(){
	$(".btnBrand").addClass("is-open");
	var word = $(this).children().children("h2").text().replace(' ','-').replace('.','');	    
    	var savePageContent = $("#pageContent").html();
        $("#pageContent").html('<div class="text-center"><i class="fa fa-spinner fa-5x fa-spin"></i></div>').show();
	var item = $(this);
        var color = item.children().first().css("background-color");
	    $.ajax({
		    url:'article/'+item.attr("id").split('_')[1],
		    method: 'GET'
	    }).done(function(data){
		//Met en page l'article, peut être mettre à part ce code dans une fonction pour le rendre générique, j'en aurai peut être besoin sur le blog
                window.scrollTo(0,0);
                $("#pageContent").html(savePageContent);
                $("#panel").css("display","none");
                $("#articlePres").html(data);
                $("#articlePres").delay(100).fadeIn(100);
                $("#pageContent").removeClass("container");
                $("#pageContent").addClass("container-fluid");
                $("#sideNav").css("background-color", color);
                $(".navbar").css("background-color", color);

                $(".navigationBar > ul > li > a").css("color", "#fff");
                $(".navigationBar > ul > li > a:hover").css("color", "#000");

                $("#sideNav").fadeIn(100); 
		$("#panel").css("display","none");

		colorizeText();
		
		
		var url = window.location.href +  word ;
		history.pushState(word, null,url);
		
	    });
    });

    var colorizeText = function(){
	    var codeContent = $('code');

	    codeContent.each(function(){
            var codeText = $(this).text();
            var language = $(this).attr("class");
			$(this).html(hljs.highlight(language, codeText).value);
            $(this).addClass("hljs");

	    });

	    
    };
   
    //Show sideNav content
    $(document).delegate("#navDisplay",'click',function(){
	    if($("#sideNav").hasClass("deployed")){
		 $("#sideNav").animate({
			    left: -210		    
		    }, 100);
   
	    }else{
		$("#sideNav").animate({
			    left: 0		    
		    }, 100);
		}
	    $("#sideNav").toggleClass("deployed");

    });

    //Go back home
    $(document).delegate("#navHome",'click',function(){
	    history.back();
	    goHome();
    });

    var box = $("#cont"), boxDone = false;

	             
    


    //API call to draw ajax pages
    $(document).delegate('ul.navigation li a', 'click', function(){
	    
        $("#pageContent").html('<div class="text-center"><i class="fa fa-spinner fa-5x fa-spin"></i></div>').show();
	$("#articlePres").fadeOut(100);
            //$("#sideNav").children().fadeOut(100);

		    $(".btnBrand").removeClass("is-open");
		    $(".navbar").css("background-color","#fff");
        var selected = $(this);

        $.ajax({
            url: 'presentation/'+selected.attr("id").split('_')[1]+"/"+selected.attr("id").split('_')[0],
            method: 'GET'
        }).done(function(data){


		window.scrollTo(0,0);
		$("#pageContent").children().remove();
		$("#pageContent").css("display","none");
		$("#pageContent").html(data);
		$("#pageContent").removeClass("container-fluid");
		$("#pageContent").addClass("container");
		$(".navigationBar > ul > li > a").css("color", "#000");
		//$(".navigationBar > ul > li > a:hover").css("color", "#fff");
 
		$("#pageContent").fadeIn(200);


                $("#pageContent").children().remove();

                $("#pageContent").html(data);


		history.back();


        });

    });





});

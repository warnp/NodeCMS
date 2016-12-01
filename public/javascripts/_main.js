/**
 * Created by romain on 02/07/2014.
 */
(function($){

    // Setup variables
    $window = $(window);
    $slide = $('.homeSlide');
    $body = $('body');

    //FadeIn all sections

        setTimeout(function() {

            // Resize sections
            adjustWindow();

            // Fade in sections
            $body.removeClass('loading').addClass('loaded');

        }, 800);


    function adjustWindow()
    {

        var s = skrollr.init({
            forceHeight: false,
            render: function (data) {

            }
        });

        // Get window size
        winH = $window.height();

        // Keep minimum height 550
        if (winH <= 550) {
            winH = 550;
        }

        // Resize our slides
        $slide.height(winH);

        s.refresh($('.homeSlide'));
    }
})( jQuery );

$(function(){
    $("#nav > ul >li").mouseover(function(){
       $(this).animate({height :"50%"},1500);
       console.log("prout")
    });
});


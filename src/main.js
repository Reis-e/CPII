/* sticky nav bar */

let navbar = $(".navbar");

$(window).scroll(function(){ /*display navbar when scroll reacher a certain position */
    let oTop = $(".section-2").offset().top - window.innerHeight;
    if($(window).scrollTop() > oTop){
        navbar.addClass("sticky");
    }/*else{
        navbar.removeClass("sticky");
    }*/
});
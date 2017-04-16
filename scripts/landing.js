 var pointsArray = document.getElementsByClassName('point');
 
 var animatePoints = function(points) {
 
    var revealPoint = function(index) {
        points[index].style.opacity = 1;
        points[index].style.transform = "scaleX(1) translateY(0)";
        points[index].style.msTransform = "scaleX(1) translateY(0)";
        points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
    }
    
    for (var i = 0; i < points.length; i++) {
         revealPoint(i);
    }
};

 $(window).load(function() {
     //1
     if ($(window).height() > 950) {
         animatePoints();
     }
     //2
     var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
     
     //3
     $(window).scroll(function(event) {
         
     // #4
         if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();
         }
     });
     //#5
     var animatePoints = function() {
         var revealPoint = function() {
         // #7
         $(this).css({
             opacity: 1,
             transform: 'scaleX(1) translateY(0)'
         });
    };
         
    //6
         $.each($('.point'), revealPoint);
     };
 });
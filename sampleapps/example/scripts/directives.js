app.directive("animateToggle", function() {
    return function(scope, elem, attr) {
        scope.$watch(attr.animateOnChange, function(nv,ov) {
            if (nv!=ov) {
                var c = nv > ov?'change-up':'change';
                $animate.addClass(elem,c, function() {
                    setTimeout(function(){
                        $animate.removeClass(elem,c);
                    }, 2000);
                });
            }
        })
    }
})
app.directive('animateOnChange', function($animate) {
    return function(scope, elem, attr) {
        scope.$watch(attr.animateOnChange, function(nv,ov) {
            if (nv != ov) {
                var c = 'change';
                $animate.addClass(elem,c, function() {
                    setTimeout(function(){
                        $animate.removeClass(elem,c);
                    }, 1000);
                });
            }
        })
    }
});

app.directive('readable', function() {
    return {
     // Replace with the template below
        restrict: 'E',
        template: '<span><reptext/></span>',
        replace: true,
        link: function($scope, element, attrs) {
            attrs.$observe('text', function(value) {
                var readstring;
               switch (value){
                   case "brake":
                       readstring = "Brake";
                       break;
                   case "fog":
                       readstring = "Fog";
                       break;
                   case "hazard":
                       readstring = "Hazard";
                       break;
                   case "headlights":
                       readstring = "Head Lights";
                       break;
                   case "leftTurn":
                       readstring = "Left Turn";
                       break;
                   case "parking":
                       readstring = "Parking";
                       break;
                   case "rightTurn":
                       readstring = "Right Turn";
                       break;
                   case "front+left":
                       readstring = "Front Left";
                       break;
                   case "front+right":
                       readstring = "Front Right";
                       break;
                   case "rear+left":
                       readstring = "Rear Left";
                       break;
                   case "rear+right":
                       readstring = "Rear Right";
                       break;
                   case "airBags":
                       readstring = "Air Bags";
                       break;
                   case "antilockBrakingSystem":
                       readstring = "ABS";
                       break;
                   case "troubleCodes":
                       readstring = "Trouble Codes";
                       break;
                   default:
                       readstring = value;
               }

                element.find('reptext').text(readstring);
            })

        }
    }
});
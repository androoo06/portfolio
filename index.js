let openTab = "ABOUT"

$(function () {
    // $('#myButton').click(function() {
    //     $('html, body').animate({
    //         scrollTop: $("#myDiv").offset().top
    //     }, 2000);
    // });

    document.querySelectorAll(".section-title-parent").forEach((parent) => {
        parent.onmouseenter = function(event) {

            

        }
        parent.onmouseleave = function(event) {

        }
    })
})

// mouse gradient
$(document).on("mousemove", function( e ) {
    // var relativePosition = {
    //     left: e.pageX - $(document).scrollLeft() - $('body').offset().left,
    //     top:  e.pageY - $(document).scrollTop()  - $('body').offset().top
    // };

    var relativePosition = {
        left: e.clientX,
        top: e.clientY
    }

    $('#mouse-gradient')[0].style.setProperty("--x", `${relativePosition.left}px`)
    $('#mouse-gradient')[0].style.setProperty("--y", `${relativePosition.top}px`)
})
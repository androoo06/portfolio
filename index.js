let openTab = "ABOUT"

function setSelected(event) {
    let id = event.target.id.split("-")[1]

    let title = document.getElementById(`section-title-${id}`)
    let barrier = document.getElementById(`section-barrier-${id}`)

    title.classList.remove("closed-section-title")
    barrier.classList.remove("closed-section-barrier")
    
    title.classList.add("open-section-title")
    barrier.classList.add("open-section-barrier")
}

function removeSelected(event) {
    let id = event.target.id.split("-")[1]
    let title = document.getElementById(`section-title-${id}`)
    let barrier = document.getElementById(`section-barrier-${id}`)

    if (id !== openTab) {
        title.classList.remove("open-section-title")
        barrier.classList.remove("open-section-barrier")
        
        title.classList.add("closed-section-title")
        barrier.classList.add("closed-section-barrier")
    }
}

$(function () {
    // $('#myButton').click(function() {
    //     $('html, body').animate({
    //         scrollTop: $("#myDiv").offset().top
    //     }, 2000);
    // });

    document.querySelectorAll(".section-title-parent").forEach((parent) => {
        parent.onmouseenter = setSelected
        parent.onmouseleave = removeSelected

        parent.onclick = function(event) {
            setSelected({
                "target": {"id": `$-${event.target.id.split("-")[2]}`}
            })

            let temp = openTab
            openTab = event.target.id.split("-")[2]

            removeSelected({
                "target": {"id": `$-${temp}`}
            })
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
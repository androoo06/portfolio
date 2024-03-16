let openTab = "ABOUT"
let hovering = false;

function changeSelected(event, bool) {
    let element = $(event.target).closest(".section-title-parent")[0]
    let id = element.id.split("-")[1]

    // set selected to open, or set it to closed if it's not the current openTab
    if (bool || (id !== openTab)) {
        Array.from(["title", "barrier"]).forEach((t) => {
            $(`#section-${t}-${id}`).toggleClass(`open-section-${t}`, bool)
        })
    }
}

function autoSetSelected(tab) {
    changeSelected({"target": document.getElementById(`section-${tab}`)}, true)

    let temp = openTab
    openTab = tab

    changeSelected({"target": document.getElementById(`section-${temp}`)}, false)
}

$(function () {
    // project hovers
    $(document).on("scrollend", function() {
        let hoverOver = $('.project-box:hover')
        if (hoverOver.length != 0) {
            $(`.project-box:not(#${hoverOver[0].id})`).css("opacity", 0.5)
            $(`#${hoverOver[0].id}`).css("opacity", 1)
        }
    })
    $('.project-box').on("mouseover", function(event) {
        let element = $(event.target).closest(".project-box")[0]
        $(`.project-box:not(#${element.id})`).css("opacity", 0.5)
        $(`#${element.id}`).css("opacity", 1)
    }).on("mouseleave", function() {
        let hoverOver = $('.project-box:hover')
        if (hoverOver.length == 0) {
            $(`.project-box`).css("opacity", 1)
        }
    })

    // automatic section title changes
    $(window).on('scroll', function () {
        let about = $('#sections-div').offset().top - window.innerHeight
        let projects = $('#projects').offset().top + ($('#projects').outerHeight()) - window.innerHeight
        let experience = $('#experience').offset().top - window.innerHeight

        if ($(window).scrollTop() >= experience) {
            autoSetSelected("EXPERIENCE")
        } else if ($(window).scrollTop() >= projects) {
            autoSetSelected("PROJECTS")
        } else if ($(window).scrollTop() >= about) {
            autoSetSelected("ABOUT")
        }
    })

    // section title hovers
    $(".section-title-parent")
        .on("mouseover", (e)=>changeSelected(e, true))
        .on("mouseleave", (e)=>changeSelected(e, false))

    //
    $(".project-box").on("click", function() {
        let target = $(this).closest('.project-box')
        if (target.find(".open-in-new").length != 0) {
            // window.open(target[0].dataset.externallink, '_blank').focus()

            $('#right')[0].style.setProperty("opacity", 0);

            setTimeout(()=> {
                $("#right")[0].style.setProperty("display", "none")
            }, 250)

            $('#project-view')[0].style.setProperty("opacity", 1);

            setTimeout(()=> {
                $("#project-view")[0].style.setProperty("display", "flex")
            }, 500)
        }
    })
})

// mouse gradient
$(document).on("mousemove", function( e ) {
    var relativePosition = {
        left: e.clientX,
        top: e.clientY
    }

    $('#mouse-gradient')[0].style.setProperty("--x", `${relativePosition.left}px`)
    $('#mouse-gradient')[0].style.setProperty("--y", `${relativePosition.top}px`)
})
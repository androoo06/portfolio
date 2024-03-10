let openTab = "ABOUT"
let hovering = false;

function changeSelected(event, bool) {
    let classList = Array.from(event.target.classList)
    if (!(classList.includes("section-title-parent"))) {
        return "selected a child element"
    }

    let id = event.target.id.split("-")[1]

    // set selected to open, or set it to closed if it's not the current openTab
    if (bool || (id !== openTab)) {
        Array.from(["title", "barrier"]).forEach((t) => {
            $(`#section-${t}-${id}`).toggleClass(`open-section-${t}`, bool)
        })
    }
}

function autoSetSelected(tab) {
    changeSelected({"target": {"id": `$-${tab}`, "classList": ["section-title-parent"]}}, true)

    let temp = openTab
    openTab = tab

    changeSelected({"target": {"id": `$-${temp}`, "classList": ["section-title-parent"]}}, false)
}

$(function () {
    $(window).on('scroll', function () {
        let about = $('#about').offset().top - window.innerHeight
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

    $(document).on("scrollend", function() {
        let hoverOver = $('.project-box:hover')
        if (hoverOver.length != 0) {
            $(`.project-box:not(#${hoverOver[0].id})`).css("opacity", 0.5)
            $(`#${hoverOver[0].id}`).css("opacity", 1)
        }
    })

    $('.project-box').on("mouseover", function(event) {
        if (event.target.classList.contains("project-box")) {
            $(`.project-box:not(#${event.target.id})`).css("opacity", 0.5)
            $(`#${event.target.id}`).css("opacity", 1)
        }
    }).on("mouseleave", function() {
        setTimeout(() => {
            let hoverOver = $('.project-box:hover')
            if (hoverOver.length == 0) {
                $(`.project-box`).css("opacity", 1)
            }
        }, 100)
    })

    $(".section-title-parent")
        .on("mouseover", (e)=>changeSelected(e, true))
        .on("mouseleave", (e)=>changeSelected(e, false))
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
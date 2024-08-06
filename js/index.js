let openTab = "ABOUT" // PROJECTS, EXPERIENCE
let hovering = false;
let openMenu = "home"; // project-view

let scrollY = 0

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

function switchMenu(menu, projName=null) {
    if (menu != "home") {
        scrollY = window.scrollY
    }

    let visibleColumn = (menu == "home") ? $("#project-view") : $("#right")
    let hiddenColumn = (menu == "home") ? $("#right") : $("#project-view")
    
    let visibleSectionDiv = (menu == "home") ? $("#return-div") : $("#sections-div")
    let hiddenSectionDiv = (menu == "home") ? $("#sections-div") : $("#return-div")

    visibleColumn.css("opacity", 0)
    hiddenColumn.css("opacity", 0)

    visibleSectionDiv.css("opacity", 0)
    hiddenSectionDiv.css("opacity", 0)

    setTimeout(()=> {
        visibleColumn.css("display", "none")
        hiddenColumn.css("display", "flex")
        
        if (projName != null) {
            $(`.project-page:not(#project-${projName})`).css("display", "none")
            $(`#project-${projName}`).css("display", "block")
        }

        // the constraint is -- don't show this stuff on mobile view
        if (((menu != "home") && ($("#sections-div").css("display") != "none")) 
        || ((menu == "home") && ($("#return-div").css("display") != "none"))) {
            visibleSectionDiv.css("display", "none")
            hiddenSectionDiv.css("display", "block")
        }
    }, 500)

    setTimeout(()=> {
        hiddenColumn.css("opacity", 1)
        hiddenSectionDiv.css("opacity", 1)
    }, 750)

    setTimeout(() => {
        let scrollTo = (menu == "home") ? scrollY : 0 
        window.scroll({
            top: scrollTo
        })
    }, 1250)

    openMenu = menu
}

$(function () {
    let about = $('#sections-div').offset().top - window.innerHeight
    let projects = $('#projects').offset().top + ($('#projects').outerHeight()) - window.innerHeight
    let experience = $('#experience').offset().top - window.innerHeight
    // hrefHeights = {"projects": projects, "experience": experience}

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
        if (openMenu != "home") return;

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

    // menu navigation
    $(".project-box").on("click", function() {
        let target = $(this).closest('.project-box')
        if (target.find(".open-in-new").length != 0) {
            // window.open(target[0].dataset.externallink, '_blank').focus()

            let projName = target[0].dataset.projname
            switchMenu("project-view", projName=projName)
        }
    })

    $(document).delegate("a", "click", function() {
        if ($(this).hasClass("go-back-a")) {
            switchMenu("home")
        }
    })

    // other
    $("#resumeclicker").on("click", function() {
        $("#email").effect("highlight", {color: 'rgb(186, 186, 209)'}, 1500);
    })

    $("#nametag").on("click", function() {
        let height =  $(".clamped-img")[0].style["max-height"];
        let newHeight = (height != "100%") ? "100%" : "0px";
        let newDisplay = (height != "100%") ? "none" : "inherit";

        $(".clamped-img").css("max-height", newHeight);
        $(".dd-hideable").css("display", newDisplay);
    })
})

// mouse gradient
$(document).on("mousemove", function( e ) {
    var relativePosition = {
        left: e.clientX,
        top: e.clientY
    }

    $('#mouse-gradient').css("--x", `${relativePosition.left}px`)
    $('#mouse-gradient').css("--y", `${relativePosition.top}px`)
})
let openTab = "ABOUT" // PROJECTS, EXPERIENCE
let hovering = false;
let openMenu = "home"; // project-view

let scrollY = 0

function isMobile() {
    return window.innerWidth <= 1027;
}

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
        if (!isMobile) {
            visibleSectionDiv.css("display", "none")
            hiddenSectionDiv.css("display", "block")
        }

        // if (((menu != "home") && ($("#sections-div").css("display") != "none")) 
        // || ((menu == "home") && ($("#return-div").css("display") != "none"))) {
        //     visibleSectionDiv.css("display", "none")
        //     hiddenSectionDiv.css("display", "block")
        // }
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
    // let about = $('#sections-div').offset().top - window.innerHeight
    let pxBuffer = 50
    let experience = $('#experience').offset().top - pxBuffer //- window.innerHeight
    let projects = $('#project-animelle').offset().top - pxBuffer // + ($('#project-animelle').outerHeight()) - window.innerHeight
    
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

        if ($(window).scrollTop() >= projects) {
            autoSetSelected("PROJECTS")
        } else if ($(window).scrollTop() >= experience) {
            autoSetSelected("EXPERIENCE")
        } else if ($(window).scrollTop() >= 0) {
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
            let external = target[0].dataset.externallink
            if (external) {
                window.open(external, '_blank').focus()
            }

            let projName = target[0].dataset.projname
            if (projName) {
                switchMenu("project-view", projName=projName)
            }
        }
    })

    $(document).delegate("a", "click", function() {
        if ($(this).hasClass("go-back-a")) {
            switchMenu("home")
        }
        if ($(this)[0].dataset.highlightid){
            let id = $(this)[0].dataset.highlightid // id to highlight
            $(`#${id}`).effect("highlight", {color: 'rgb(186, 186, 209)'}, 2250);
        }
    })

    // other
    let clicked = false;
    function toggleClick() {
        let display = (clicked) ? "none" : "inherit";
        let displayOpp = (clicked) ? "inherit" : "none";
        let width = (clicked) ? "0" : (isMobile() ? "30%" : "100%")

        $(".clamped-img").css("max-width", width)
        $(".clamped-img").css("display", display)
        $(".img-txt").css("display", display)
        $(".dd-hideable").each(function(i, obj) {
            if (obj.id != "sections-div" || !isMobile()) {
                $(obj).css("display", displayOpp)
            }
        })

        clicked = !clicked
    }
    $("#nametag").on("click", toggleClick)

    let highlighting = false;
    $("#resumeclicker").on("click", function() {
        if (highlighting == true) return;
        highlighting = true;

        if (clicked == true) {
            toggleClick();
        }

        $("#email").effect("highlight", {color: 'rgb(186, 186, 209)'}, 1500);

        let req = $("#request-resume")
        req.removeClass("-transparent");
        req.css("opacity", 1)
        setTimeout(()=>{
            req.addClass("-transparent");
            req.css("opacity", 0)
        }, 1750)
        setTimeout(()=>{
            highlighting = false;
        }, 2250)
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
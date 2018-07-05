// hide or remove stuff from users
// in this substyle it is needed to have only the necessary parts of ILIAS, without any possible distraction from the learning goal.
// It leaves only breadcrumbs for navigation to the parent levels on non-folder levels (i.e. categories, courses, etc.)
(function() {
    // elements that only admins, authors and tutors have
    // to differentiate between users and non-users
    let settings = $("[id*=settings]");
    let permissions = $("[id*=permissions]");
    let edit = $("[id*=edit]");
    let admin = $("[id*=adm]");
    let metadata = $("#tab_meta_data");
    let preconditions = $("#tab_preconditions");
    let presentation = $("#nontab_pres_mode");
    let chapters = $("#tab_cont_pages_and_subchapters");
    let style = $("#tab_cont_style");
    let standperm = $("#tab_cont_mob_def_prop");
    let map_areas = $("[id*=map_areas]");
    if(!settings.length && !permissions.length && !edit.length && !presentation.length && !admin.length
        && !metadata.length && !presentation.length && !chapters.length && !style.length && !standperm.length
        && !map_areas.length && !preconditions.length){
        // remove right rectangle 'action' that is not very helpful and distracting
        $(".il_ContainerListItem > .ilFloatRight").remove();
        // as well as main menu navigation
        $(".ilMainMenu").hide();
        let current_folder = $("#left_nav div > div ul > li").has('.ilHighlighted').last().children("a").children("img[src*='fold']");
        $("#tab_info_short, #subtab_info_short").hide();
        if(current_folder.length){
            $("#tab_view_content").hide();
            $("#mainscrolldiv > ol.breadcrumb").hide();
        }
    }
})();


// open left_nav, remove other course entries and float content to left.
// left_nav is transformed in a horizontal navigation menu of the folders that the course/category contains.
(function() {
    let left_nav = $("#left_nav");
    // if left_nav is not open, opens it for further use.
    if(!left_nav.length){
        let imgtree = document.getElementById("imgtree");
        if(imgtree){
            imgtree.click();
        }
    }
    // finds the current root, i.e. the course/category we are in, and add dropdowns for the next level courses/folders
    else if(left_nav) {
        // the last kategorie/course in the navigation tree that is highlighted is the root
        let left_nav_lis = left_nav.find("li");
        let course_lis = $("#left_nav div > div ul > li").has('.ilHighlighted').has("a > img[src*='crs']"," a> img[src*='cat']");
        course_lis.css("margin-left", "0");
        let root_li = course_lis.has('.ilHighlighted').last();
        root_li.addClass("il-left_nav-root");
        // make all lis of the same branch visible in order to display the navigation menu.
        left_nav_lis.has('.il-left_nav-root').css('display','block');
        // highlight the current course/module visible in the navigation menu
        let root_level_1_lis = root_li.children("ul").children("li");
        // In left_nav menu, highlight also the top levels of the level were are in, so that it is visible where we are
        course_lis.find("li").has(".ilHighlighted").children('a').children('span').not(":empty").addClass("ilHighlighted");
        // navigation menu: 3 entries per row as dropdown menus
        root_level_1_lis.addClass("col-sm-4");
        root_li.children("ul").addClass("row");
        root_level_1_lis.addClass("il-left_nav-dropdownimucb");

        // inner dropdown menus that show up only on hover
        let root_level_2plus_lis = root_level_1_lis.find("li");
        root_level_2plus_lis.addClass("il-left_nav-dropdownimucbinner");
    }
})();

// function to make objects in a row have the same height (as the max height of text of the objects)
function makeEqualHeight(rowObjects){
    let max = 0;
    rowObjects.each(function(){
        max = Math.max($(this).children('a').children('span').last().height(), max);
    });
    max += 4;
    rowObjects.each(function () {
        $(this).height(max);
    });
}
// dynamically fixes the height of the dropdown menu
$(window).resize(function(){
    makeEqualHeight($(".il-left_nav-dropdownimucb"));
});

// on hover open js-trees
$(window).load(function(){
    // on hover simulate click to get the contents of the dropdownimucb if they are not there

    let dropdownimucbs = $(".il-left_nav-dropdownimucb");

    dropdownimucbs.each(function(){
        $(this).hover(
            function(){
                if($(this).hasClass("jstree-closed")) {
                    $(this).children("ins").click();
                }
            },
            function(){
            }
        );
    });

    // adjust left/top nav height to max
    makeEqualHeight(dropdownimucbs);

    $(".il-left_nav-root").hover(
        function(){
            $("#fixed_content").hide();
            makeEqualHeight(dropdownimucbs);
        },
        function() {
            setTimeout(
                function(){
                    makeEqualHeight(dropdownimucbs);
                }, 10
            );
            $("#fixed_content").fadeIn();
        }
    );

});

// on hover loads asynchronously the subparts of the tree (left_nav) if they are not loaded
$( document ).ajaxComplete(function() {
    let root_lis = $("#left_nav .il-left_nav-root .il-left_nav-dropdownimucb li");
    root_lis.each(function(){
        $(this).hover(
            function(){
                if($(this).hasClass("jstree-closed")) {
                    $(this).addClass("il-left_nav-dropdownimucbinner");
                    $(this).children("ins").click();
                }
            },
            function(){}
        );
    });
});
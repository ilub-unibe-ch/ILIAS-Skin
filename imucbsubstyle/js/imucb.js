// hide or remove stuff from users
// in this substyle it is needed to have only the necessary parts of ILIAS, without any possible distraction from the learning goal.
// It leaves only breadcrumbs for navigation to the parent levels on non-folder levels (i.e. categories, courses, etc.)
(function() {
    // elements that only admins, authors and tutors have
    // to differentiate between users and non-users
    var settings = $("[id*=settings]");
    var permissions = $("[id*=permissions]");
    var edit = $("[id*=edit]");
    var admin = $("[id*=adm]");
    var metadata = $("#tab_meta_data");
    var preconditions = $("#tab_preconditions");
    var presentation = $("#nontab_pres_mode");
    var chapters = $("#tab_cont_pages_and_subchapters");
    var style = $("#tab_cont_style");
    var standperm = $("#tab_cont_mob_def_prop");
    var map_areas = $("[id*=map_areas]");
    if(!settings.length && !permissions.length && !edit.length && !presentation.length && !admin.length
        && !metadata.length && !presentation.length && !chapters.length && !style.length && !standperm.length
        && !map_areas.length){
        // remove right rectangle 'action' that is not very helpful and distracting
        $(".il_ContainerListItem > .ilFloatRight").remove();
        // as well as main menu navigation
        $(".ilMainMenu").hide();
        var current_folder = $("#left_nav div > div ul > li").has('.ilHighlighted').last().children("a").children("img[src*='fold']");
        $("#tab_info_short").hide();
        if(current_folder.length){
            // remove the two default tabs of ilias that do not offer useful information for users.
            // so that the tab line and therefore the page is clean.
            $("#tab_info, #tab_view_content").hide();
            $("#mainscrolldiv > ol.breadcrumb").hide();
        }
        // remove also permanent link for users
        $("#current_perma_link").remove();
        $("label[for=current_perma_link]").remove();
    }
})();


// open left_nav, remove other course entries and float content to left.
// left_nav is transformed in a horizontal navigation menu of the folders that the course/category contains.
(function() {
    var left_nav = $("#left_nav");
    // if left_nav is not open, opens it for further use.
    if(!left_nav.length){
        var imgtree = document.getElementById("imgtree");
        if(imgtree){
            imgtree.click();
        }
    }
    // finds the current root, i.e. the course/category we are in, and add dropdowns for the next level courses/folders
    if(left_nav) {
        // the last kategorie/course in the navigation tree that is highlighted is the root
        var left_nav_lis = left_nav.find("li");
        var course_lis = $("#left_nav div > div ul > li").has('.ilHighlighted').has("a > img[src*='crs']"," a> img[src*='cat']");
        course_lis.css("margin-left", "0");
        var root_li = course_lis.has('.ilHighlighted').last();
        root_li.addClass("root");
        // make all lis of the same branch visible in order to display the navigation menu.
        left_nav_lis.has('.root').css('display','block');
        // highlight the current course/module visible in the navigation menu
        var root_level_1_lis = root_li.children("ul").children("li");
        // In left_nav menu, highlight also the top levels of the level were are in, so that it is visible where we are
        course_lis.find("li").has(".ilHighlighted").children('a').children('span').not(":empty").addClass("ilHighlighted");
        // navigation menu: 3 entries per row as dropdown menus
        root_level_1_lis.addClass("col-sm-4");
        root_li.children("ul").addClass("row");
        root_level_1_lis.addClass("dropdownimucb");

        // inner dropdown menus that show up only on hover
        var root_level_2plus_lis = root_level_1_lis.find("li");
        root_level_2plus_lis.addClass("dropdownimucbinner");
    }
})();


// on hover open js-trees
$(window).load(function(){
    // on hover simulate click to get the contents of the dropdownimucb if they are not there
    root_level_1_lis.each(function(){
        $(this).hover(
                function(){
                    if($(this).hasClass("jstree-closed")) {
                        $(this).children("ins").click();
                    }
                },
                function(){}
        );
    });

});


// on hover loads asynchronously the subparts of the tree if they are not loaded
$( document ).ajaxComplete(function() {
    var root_lis = $("#left_nav .dropdownimucb li");
    root_lis.each(function(){
        $(this).hover(
            function(){
                if($(this).hasClass("jstree-closed")) {
                    $(this).addClass("dropdownimucbinner");
                    $(this).children("ins").click();
                }
            },
            function(){}
        );
    });
});
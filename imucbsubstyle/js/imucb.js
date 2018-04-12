// hide or remove stuff from users
(function() {
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
        $(".il_ContainerListItem > .ilFloatRight").remove();
        $(".ilMainMenu").hide();
        current_folder = $("#left_nav div > div ul > li").has('.ilHighlighted').last().children("a").children("img[src*='fold']");
        $("#tab_info_short").hide();
        if(current_folder.length){
            $("#tab_info, #tab_view_content").hide();
            $("#mainscrolldiv > ol.breadcrumb").hide();
        }
        // current_course = $("#left_nav div > div ul > li").has("img[src*='crs']").has('.ilHighlighted').last().children("a").children("img[src*='crs']");
        // if(current_course.length){
        //         $("#mainscrolldiv > ol.breadcrumb").hide();
        // }
    }
})();


// open left_nav, remove other course entries and float content to left
(function() {
    var left_nav = $("#left_nav");
    if(!left_nav.length){
        var imgtree = document.getElementById("imgtree");
        if(imgtree){
            imgtree.click();
        }
    }
    if(left_nav) {
        var left_nav_lis = left_nav.find("li");
        // the last kategorie/course in the navigation tree
        course_lis = $("#left_nav div > div ul > li").has('.ilHighlighted').has("a > img[src*='crs']"," a> img[src*='cat']");
        course_lis.css("margin-left", "0");
        var my_course_li = course_lis.has('.ilHighlighted').last();
        my_course_li.addClass("root");
        // my_course_li.parent().siblings('a').css('display','block');
        // make all lis of the same branch visible in order to display the navigation menu.
        left_nav_lis.has('.root').css('display','block');
        // highlight the current course/module visible in the navigation menu
        var my_course_level_1_lis = my_course_li.children("ul").children("li");
        course_lis.find("li").has(".ilHighlighted").children('a').children('span').not(":empty").addClass("ilHighlighted");
        // navigation menu: 3 entries per row as dropdown menus
        my_course_level_1_lis.addClass("col-sm-4");
        my_course_li.children("ul").addClass("row");
        my_course_level_1_lis.addClass("dropdownimucb");

        // inner dropdown menus that show up only on hover
        var my_course_level_2plus_lis = my_course_level_1_lis.find("li");
        my_course_level_2plus_lis.addClass("dropdownimucbinner");
    }
})();


// on hover open js-trees
$(window).load(function(){

    // remove left_nav if we are not in a course folder and display breadcrumb)
    my_course_level_1_lis = $("#left_nav div > div ul > li").has("a > img[src*='crs']", "a > img[src*='cat']").has('.ilHighlighted').last().children("ul").find("li");
    if(!my_course_level_1_lis.length){
        $("#left_nav_outer").remove();
        $("#left_nav").remove();
        $("#mainscrolldiv > ol.breadcrumb").show();
    }

    // on hover simulate click to get the contents of the dropdownimucb if they are not there
    my_course_level_1_lis.each(function(){
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
    var my_course_lis = $("#left_nav .dropdownimucb li");
    my_course_lis.each(function(){
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
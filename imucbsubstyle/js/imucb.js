// hide or remove stuff from users
(function() {
    var tab_perm = $("#tab_perm_settings");
    var subtab_edit_page = $("#subtab_edit_page");
    var admin_tab = $("#mm_adm_tr");
    if(!tab_perm.length && !subtab_edit_page.length && !admin_tab.length){
        $(".il_ContainerListItem > .ilFloatRight").remove();
        $(".ilMainMenu").hide();
        $("#ilTab").hide();
        if($("#left_nav").length){
            $("#mainscrolldiv > ol.breadcrumb").hide();
        }
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
        var course_lis = $("#left_nav div > div ul > li").has("a > img[alt*='Kurs']");
        if(!course_lis.length){
            course_lis = $("#left_nav div > div ul > li").has("a > img[alt*='Course']");
        }
        course_lis.css("margin-left", "0");
        course_lis.not(":has('.ilHighlighted')").hide();
        var my_course_li = course_lis.has('.ilHighlighted').last();
        my_course_li.addClass("root");
        my_course_li.find("a").show();
        var my_course_level_1_lis = my_course_li.children("ul").children("li");
        course_lis.find("li").has(".ilHighlighted").children('a').children('span').not(":empty").addClass("ilHighlighted");

        my_course_level_1_lis.addClass("col-sm-4");
        my_course_li.children("ul").addClass("row");
        my_course_level_1_lis.addClass("dropdownimucb");

        var my_course_level_2plus_lis = my_course_level_1_lis.find("li");
        my_course_level_2plus_lis.addClass("dropdownimucbinner");
    }
})();


// on hover open js-trees
$(window).load(function(){
    var my_course_level_1_lis = $("#left_nav div > div ul > li").has("a > img[alt*='Kurs']").has('.ilHighlighted').last().children("ul").find("li");
    if(!my_course_level_1_lis.length){
        my_course_level_1_lis = $("#left_nav div > div ul > li").has("a > img[alt*='Course']").has('.ilHighlighted').last().children("ul").find("li");
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

    // remove subtab menu in Learning modules for users
    var subtab_edit_page = $("#subtab_edit_page");
    if(!subtab_edit_page.length){
        $(".ilLMMenu").hide();
    }

});


$( document ).ajaxComplete(function() {
    var my_course_lis = $("#left_nav .dropdownimucb li");
    my_course_lis.each(function(){
        $(this).hover(
            function(){
                if($(this).hasClass("jstree-closed")) {
                    console.log("closed");
                    $(this).addClass("dropdownimucbinner");
                    $(this).children("ins").click();
                }
            },
            function(){}
        );
    });
});
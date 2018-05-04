if ($("#error").length){
    $(function() {
        $.growl.error({ message: $("#error").text() });
    });
}

if ($("#success").length){
    $(function() {
        $.growl.notice({ message: $("#success").text() });
    });
}

$(function(){
    $(".public-rating").barrating("set", 4);
});

$(".pills-general-tab").click(function() {
    $(".tab-content").load("./partials/_generalApps.ejs");
});
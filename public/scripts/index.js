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


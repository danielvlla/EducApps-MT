$(function() {
    $(".starrating").barrating({
        theme: "fontawesome-stars"
    });

    $(".star-rating-ro").each(function(index, el) {
        var $El = $(el);
        $El.barrating({
            theme: "fontawesome-stars",
            readonly: true,
            initialRating: $(this).attr("data-current-rating")
        });
    });
});
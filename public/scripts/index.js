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

function filterApps(e){
    // Get value of input
    let categoryName = document.getElementById(e.id).innerHTML;
    // Get container
    let allApps = document.getElementById("apps");
    // Get apps
    let containersApp = allApps.querySelectorAll("div.app-container");
    // loop through apps
    for(let i = 0; i<containersApp.length;i++){
        if (categoryName == "All"){
            containersApp[i].style.display = "";
        } else {
            let a = containersApp[i].getElementsByClassName("container-category")[0];
            // if matched
            if(a.innerHTML.indexOf(categoryName) > -1){
                containersApp[i].style.display = "";
            } else {
                containersApp[i].style.display = "none";
            }
        }
    }
}
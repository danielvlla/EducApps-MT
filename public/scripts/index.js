$(document).ready(function() {
    $("#appsAdmin").DataTable();
} );

if ($("#error").length){
    $(function() {
        $.growl.error({
            message: $("#error").text()
        });
    });
}

if ($("#success").length){
    $(function() {
        $.growl.notice({
            message: $("#success").text()
        });
    });
}

let filterApps = document.getElementById("filterApps");
filterApps.addEventListener("keyup", filterNames);

function filterNames(){
    // Get Input
    let filterValue = document.getElementById("filterApps").value.toUpperCase();
    let notice = document.getElementById("no-apps");

    // Get All Apps Container
    let allApps = document.getElementById("apps");
    // Get Apps
    let containersApp = allApps.querySelectorAll("div.app-container");
    // Loop through apps
    for(let i = 0; i<containersApp.length;i++){
        let a = containersApp[i].getElementsByClassName("container-title")[0];
        // if matched
        if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            containersApp[i].style.display = "";
        } else {
            containersApp[i].style.display = "none";
        }
    }
}
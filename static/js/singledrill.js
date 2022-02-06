console.log(drillname);
let drill = {};
let slideCntr = 0;

$( document ).ready(function() {
    console.log( "ready!" );
    $.getJSON('/singledrillJSON/' + drillname,
        function(data) {
            console.log(data);
            drill = data;
            createImages();
    });
    return false;
});

function createImages() {
    var html = '';
    if (drill.images.length == 1){
        html = "<img class='slideshow-img' src='"+drill.images[0]+"'></img>";
    } else if (drill.images.length > 1){
        for (i=0; i<drill.images.length; i++){
            html += "<img class='slideshow-img' src='"+drill.images[i]+"'></img>";
        }
        html += "<a class='prev' onclick='prevSlide()'>&#10094;</a>"
        html += "<a class='next' onclick='nextSlide()'>&#10095;</a>"
    } else {
        html = "Image not found!"
    }
    showImage();
}

function nextSlide() {
    if(slideCntr < drill.images.length-1){
        slideCntr += 1;
    } else {
        slideCntr = 0;
    }       
}

function prevSlide() {
    if(slideCntr > 0 ){
        slideCntr -= 1;
    } else {
        slideCntr = drill.images.length-1;
    }
}
function showImage(){    
    $("#content > img").hide();
    $("#content > img").eq(slideCntr).show();
}
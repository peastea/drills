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
            html += "<div class='slideshow-element'><img class='slideshow-img' src='"+drill.images[i]+"'></img></div>";
        }
        html += "<div class='selection-buttons'>";
        html += "<a class='selection' onclick='prevSlide()'>&#10094;</a>";
        for (i=0; i<drill.images.length-1; i++){
            html += "<a class='selection' onclick='setSlide("+i+")'>Step "+(i+1)+"</a>";
        }
        html += "<a class='selection' onclick='setSlide("+(drill.images.length-1)+")'>Full</a>";
        html += "<a class='selection' onclick='nextSlide()'>&#10095;</a>";
        html += "</div>";
        

    } else {
        html = "Image not found!"
    }
    $('#content').html(html);
    showImage();
}

function nextSlide() {
    if(slideCntr < drill.images.length-1){
        slideCntr += 1;
    } else {
        slideCntr = 0;
    } 
    showImage();
    return false;      
}

function prevSlide() {
    if(slideCntr > 0 ){
        slideCntr -= 1;
    } else {
        slideCntr = drill.images.length-1;
    }
    showImage();
    return false;
}

function setSlide(cntr){
    slideCntr = cntr;
    showImage();
}

function showImage(){    
    $("#content > .slideshow-element").hide();
    $("#content > .slideshow-element").eq(slideCntr).show();
    return false;
}
var drills = {};
    
$( document ).ready(function() {
    console.log( "ready!" );
    $.getJSON('/alldrills',
        function(data) {
            drills = data;
            displayDrills();
    });
    $('#minSlider').val(10);
    $('#minPlayer').html($('#minSlider').val());
    return false;
});

$(document).on('input', '#minSlider', function() {
    $('#minPlayer').html($('#minSlider').val());
    displayDrills();
});

function displayDrills(){
    var html = '';
    for(i=0; i<drills.length; i++){
        if (drills[i].minPlayers <= $('#minSlider').val()){
            html += "<a class='overview-link overview-item' href='/singledrill/"+drills[i].name+"'> \
            <h5>" + drills[i].name+ "</h5> \
            <div class='overview-image'> \
                <img src='/static/"+drills[i].path+"/komplett.png'> \
            </div>  \
            </a>";
        }            
    }
    $('#content').html(html);
}
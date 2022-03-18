var drills = {};
var singleGoalie = false;

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

$(document).on('change', '#swtGoalies', function() {
    var test = $('#swtGoalies').prop('checked');
    displayDrills();
});

function displayDrills(){
    var html = '';
    if($('#swtGoalies').prop('checked')){
        for(i=0; i<drills.length; i++){
            if (drills[i].minPlayers <= $('#minSlider').val() && drills[i].singleGoalie){
                html += addDrill(drills[i]);
            }            
        }
    } else {
        for(i=0; i<drills.length; i++){
            if (drills[i].minPlayers <= $('#minSlider').val()){
                html += addDrill(drills[i]);
            }            
        }
    }
    
    $('#content').html(html);
}

function addDrill (drill){
    return "<a class='overview-link overview-item' href='/singledrill/"+drills[i].name+"'> \
    <h5>" + drills[i].name+ "</h5> \
    <div class='overview-image'> \
        <img src='/static/"+drills[i].path+"/komplett.png'> \
    </div>  \
    </a>";
}
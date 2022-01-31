function loadDrill() {
    $.ajax({
        url: '{{ url_for('singledrill') }}',
        type: 'POST',
        data: {
            name: "hi"
        },
        success: function (response) {
        },
        error: function (response) {
        }
    });   
};
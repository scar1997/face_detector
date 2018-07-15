$(document).ready(function() {
    $('#photo_button').click(function() {
        $(this).hide( 1000 );
        $('#logo_up').hide( 1000 );
        $('#upload_button').hide( 1000 );
        $('#camera').show( 1000 );
        startWebcam();
    });
});

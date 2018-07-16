/*ON CLICK PHOTO BUTTON*/
$(document).ready(function() {
    $('#photo_button').click(function() {
        $(this).hide( 500 );
        $('#logo_up').hide( 500 );
        $('#upload_button').hide( 1000 );
        $('#photo_stats').addClass('hidden');
        $('#camera').show( 1000 );
        startWebcam();
    });
});

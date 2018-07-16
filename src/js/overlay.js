/*OVERLAY SYSTEM*/
/* Open */
function open_overlay() {
    document.getElementById("overlay_id").style.height = "100%";
}

/* Close */
function close_overlay() {
    document.getElementById("overlay_id").style.height = "0%";
    $('#photo_stats').hide( 500 );
    $('#camera').hide( 500 );
    $('#photo_button').show( 1000 );
    $('#logo_up').show( 1000 );
    $('#upload_button').show( 1000 );
    setTimeout(location.reload.bind(location), 500);
}

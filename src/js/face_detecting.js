
  function ajaxcall(image){$.ajax(url, {
	headers  : headers,
    type: "POST",
    data: JSON.stringify({ "image": image }),
    dataType: "json"
}).done(function(response){
	console.log(response);
  ris ={
  "age": response.images[0].faces[0].attributes.age,
  "type": response.images[0].faces[0].attributes.gender.type,
  "asian": response.images[0].faces[0].attributes.asian,
  }
  if(ris.type == "M"){
    ris.type = "Male"
  }else{
    ris.type = "Female"
  }
  $( ".inner" ).append( '<p>'+"Age: " + ris.age + '</p>', '<p>'+"Type: " + ris.type + '</p>', '<p>'+"Asian: " + ris.asian + '</p>' ).show( 1000 );

});}

    var headers = {
      "Content-type": "application/json",
      "app_id": "1195a87a",
      "app_key": "eb3005e1902ea9ec82de45c968cd3a35"
    };

    var url = "http://api.kairos.com/detect";

    function encodeImagetoBase64(element) {

      var file = element.files[0];

      var reader = new FileReader();

      reader.onloadend = function () {

        ajaxcall(reader.result)





      }

      reader.readAsDataURL(file);

    }


    $(function () {
        $(":file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });
    });

    function imageIsLoaded(e) {
      $('#logo_up').hide(" fast ")
      $('#upload_button').hide(" fast ")
      $('#photo_button').hide(" fast ")
      $('#myImg').attr('src', e.target.result).show( 1000 );
    };


//VIDEO stream

//--------------------
// GET USER MEDIA CODE
//--------------------
    navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

var video;
var webcamStream;

function startWebcam() {
  if (navigator.getUserMedia) {
     navigator.getUserMedia (

        // constraints
        {
           video: true,
           audio: false
        },

        // successCallback
        function(localMediaStream) {
            video = document.querySelector('video');
           video.src = window.URL.createObjectURL(localMediaStream);
           webcamStream = localMediaStream;
        },

        // errorCallback
        function(err) {
           console.log("The following error occured: " + err);
        }
     );
  } else {
     console.log("getUserMedia not supported");
  }
}

function stopWebcam() {
    webcamStream.stop();
}
//---------------------
// TAKE A SNAPSHOT CODE
//---------------------
var canvas, ctx;

function init() {
  // Get the canvas and obtain a context for
  // drawing in it
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext('2d');
}

function snapshot() {
   // Draws current image from the video element into the canvas
  ctx.drawImage(video, 0,0, canvas.width, canvas.height);
}
$( "#snap" ).click(function() {
let risultato_cam = $("#myCanvas")[0].toDataURL();
console.log(risultato_cam);
ajaxcall(risultato_cam)
})

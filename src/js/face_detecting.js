//--------------------
//JSON OPERATION
//--------------------
function ajaxcall(image) {//Ajax Call
  $.ajax(url, {// Make the url string
    headers: headers,
    type: "POST",
    data: JSON.stringify({ "image": image }),
    dataType: "json"
  }).done(function (response) {//Get the JSON
    console.log(response);
    /*if (response.Errors[0].ErrCode == "5002")  {
      $( ".inner" ).append('<p>'+ "No faces found in the image"+'</p>').show( 1000 )
      console.log("errore");
    }
    else {]*/
    ris = {//Create result object with the JSON
      "age": response.images[0].faces[0].attributes.age,
      "type": response.images[0].faces[0].attributes.gender.type,
      "asian": response.images[0].faces[0].attributes.asian,
      "black": response.images[0].faces[0].attributes.black,
      "hispanic": response.images[0].faces[0].attributes.hispanic,
      "white": response.images[0].faces[0].attributes.white,
      "other": response.images[0].faces[0].attributes.other
    }
    if (ris.type == "M") {//Check the sex
      ris.type = '<p style="color:#89C4F4"  class="material-icons personal text-center">account_circle</p>'
    } else {
      ris.type = '<p style="color:pink"  class="material-icons personal text-center">account_circle</p>'
    }//Make the htm for display sex and estimated age
    $(".inner").append('<p class="pb_15 section1_txt">' + "Estimated age: " + ris.age + '</p>', '<p>' + ris.type + '</p>').show(1000);

    //Create the graphs for display the race with a  canvas js library
    var chart = new CanvasJS.Chart("chartContainer2", {
      exportEnabled: true,
      animationEnabled: true,
      title: {
      },
      legend: {
        cursor: "pointer",
        itemclick: explodePie
      },
      data: [{
        type: "pie",
        /*showInLegend: true,*/
        dataPoints: [
          { y: ris.asian, name: "Asian" },
          { y: ris.black, name: "Black" },
          { y: ris.hispanic, name: "Hispanic" },
          { y: ris.white, name: "White" },
          { y: ris.other, name: "Other" }
        ]
      }]
    });
    chart.render();


    function explodePie(e) {
      if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
      } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
      }
      e.chart.render();

    }
//Second graph
    var chart = new CanvasJS.Chart("chartContainer", {
      exportEnabled: true,
      animationEnabled: true,
      title: {
      },
      legend: {
        cursor: "pointer",
        itemclick: explodePie
      },
      data: [{
        type: "pie",
        /*showInLegend: true,*/
        dataPoints: [
          { y: ris.asian, name: "Asian" },
          { y: ris.black, name: "Black" },
          { y: ris.hispanic, name: "Hispanic" },
          { y: ris.white, name: "White" },
          { y: ris.other, name: "Other" }
        ]
      }]
    });
    chart.render();


    function explodePie(e) {
      if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
      } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
      }
      e.chart.render();

    }
  });
}

//Elemts for create the AJAX url
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

//--------------------
//UPLOAD BUTON
//--------------------
//Upload the photo with button and translate in base64 image
$(function () {
  $(":file").change(function () {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = imageIsLoaded;
      reader.readAsDataURL(this.files[0]);
    }
  });
});
//Image uploaded show with animation
function imageIsLoaded(e) {
  $('#logo_up').hide(" fast ")
  $('#upload_button').hide(" fast ")
  $('#photo_button').hide(" fast ")
  $('#photo_stats').show(" fast ")
  $('#myImg').attr('src', e.target.result).show(1000);
};

//--------------------
//WEB CAM PHOTO
//--------------------
// Get user media code
navigator.getUserMedia = (navigator.getUserMedia ||  navigator.webkitGetUserMedia ||  navigator.mozGetUserMedia ||  navigator.msGetUserMedia);
var video;
var webcamStream;

function startWebcam() {
  if (navigator.getUserMedia) {navigator.getUserMedia(
      // constraints
      {
        video: true,
        audio: false
      },
      // successCallback
      function (localMediaStream) {
        video = document.querySelector('video');
        video.src = window.URL.createObjectURL(localMediaStream);
        webcamStream = localMediaStream;
      },
      // errorCallback
      function (err) {
        console.log("The following error occured: " + err);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }
}

//---------------------
// TAKE A SNAPSHOT
//---------------------
var canvas, ctx;

function init() {
  // Get the canvas
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext('2d');
}

function snapshot() {
  // Draws current image from the video element into the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  let risultato_cam = $("#myCanvas")[0].toDataURL();
  ajaxcall(risultato_cam)
  $('#camera').hide(500);//Animation
  $('#cam_res').show(1000);
}

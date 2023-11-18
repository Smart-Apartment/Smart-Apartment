const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
     faceapi.draw.drawDetections(canvas, resizedDetections)

      const numFacesDetected = detections.length;
        //console.log(`Number of faces detected: ${numFacesDetected}`);
        if (detections.length === 0) {
          //console.log("No face detected");
          document.getElementById("box").innerText="No face Detected"
        } else if(detections.length === 1){
          //console.log("Face detected");
          document.getElementById("box").innerText="Face Detected"
        } else{
          //console.log("More than One face Detected");
          document.getElementById("box").innerHTML="More then on face detected"
        }
  }, 100)
})
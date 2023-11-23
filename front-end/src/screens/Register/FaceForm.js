import React, { useEffect, useRef, useState } from "react";
import * as faceapi from 'face-api.js';
import { Button } from "@material-ui/core";

const CameraView = ({ onCaptureImage, onResetCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  let stream = null;
  const [faceDetected, setFaceDetected] = useState(false);

  const startCamera = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL('image/jpeg');
    if(imageDataURL){
      setCapturedImage(imageDataURL);
      onCaptureImage(imageDataURL);
      stopCamera();
    }

    setFaceDetected(true);
  };

  const detectFace = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) {
    return;
  }
    const displaySize = { width: video.width, height: video.height };
    
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())

    detections.forEach((detection) => {

      if (detection.score >= 0.8) {
        console.log('Face detected with accuracy above 0.8:', detection);
        setFaceDetected(true);
        captureImage();
      } 
     
    });

    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
  
  };

  const recaptureImage = () => {
    console.log("Recapturing");
    startCamera();
    setCapturedImage(null);
    setFaceDetected(false);
    onResetCapture();
    
  };
  useEffect(() => {
    startCamera();

    const intervalId = setInterval(() => {
      detectFace();
    }, 1000);

    return () => {
      clearInterval(intervalId);
      stopCamera();
    };
  }, []);

  return (
    <>
    <div className="camera-container" style={{ display: "flex", flexDirection: "column"}}>
      
      {capturedImage ? (
        <div className="camera-view">
          <img src={capturedImage} alt="Captured"  />
          
        </div> 
      ) : (
        <>
        <div className="camera-view">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            width={320}
            height={240}
          />
          
        </div>
        <div className="canvas-container" style={{ position: "absolute" }}>
        <canvas
            ref={canvasRef}
            width={320}
            height={240}
          />
          </div>
          </>
       )}  
      </div>
        <div>
        {faceDetected ? (
          <div style={{ position:"relative",textAlign:"center"}}>
            <div><p>Click Re-Capture to recapture your face </p>
              
          <Button variant='contained'  onClick={recaptureImage}>Recapture</Button>
          <p>OR<br></br>Click Next to Complete Registration<br></br></p>
          </div>
          </div>
        ) : (
          <div style={{ position:"relative",textAlign:"center"}}>
            <p>Detecting Face.. <i className="fas fa-spinner fa-spin"></i></p>
          </div>
        )}
      </div>
    </>
  );
};

// const FaceForm = ({onCaptureImage,onResetCapture}) => {
//   return (
//     <>
//       <CameraView onCaptureImage={}/>
//     </>
//   );
// };

export default CameraView;

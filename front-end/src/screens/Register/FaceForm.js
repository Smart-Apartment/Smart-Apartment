import React, { useEffect, useRef, useState } from "react";
import * as faceapi from 'face-api.js';

const CameraView = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let stream = null;
  const [faceDetected, setFaceDetected] = useState(false);
  const [displayText, setDisplayText] = useState("");

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

  const detectFace = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.width, height: video.height };
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    detections.forEach((detection) => {
      if (detection.score >= 0.8) {
        console.log('Face detected with accuracy above 0.8:', detection);
        setFaceDetected(true);
        setDisplayText("Face Detected! Click Finish To Complete Registration.");
        stopCamera(); 
      }
    });
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
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
  },[]);

  return (
    <div className="camera-container">
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
        {faceDetected ? (
          <div style={{ position: "relative",marginTop:'10px', bottom: 0, width: "100%", textAlign: "center", color: "black" }}>
            {displayText}
          </div>
        ):(<div style={{ position: "relative",marginTop:'10px', bottom: 0, width: "100%", textAlign: "center", color: "black" }}>
      <p>Detecting face... <i className="fas fa-spinner fa-spin"></i></p>      </div>)}
      </div>
      
    </div>
  );
};

const FaceForm = () => {
  return (
    <>
      <CameraView />
    </>
  );
};

export default FaceForm;

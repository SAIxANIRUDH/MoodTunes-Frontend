import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import "./FacialExpression.css";
import { useState } from "react";
import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef(null);

  
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    console.log("Models loaded");
  };

  
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  
  const detectMood = async () => {
    if (!videoRef.current) return;

    try {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!detections || detections.length === 0) {
        console.log("No face detected");
        return;
      }

  
      let maxValue = 0;
      let expression = "";
      for (const exp of Object.keys(detections[0].expressions)) {
        const value = detections[0].expressions[exp];
        if (value > maxValue) {
          maxValue = value;
          expression = exp;
        }
      }

  
      const response = await api.get(`/api/songs/svng?mood=${expression}`);
      console.log(response.data);
      setSongs(response.data.songs);
    } catch (err) {
      console.error("Error detecting mood or fetching songs:", err);
    }
  };

  // Load models and start webcam on mount
  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="mood-element">
      <video
        ref={videoRef}
        autoPlay
        muted
        width="720"
        height="560"
        className="user-video-feed"
      />
      <br />
      <button onClick={detectMood}>Detect Mood</button>
    </div>
  );
}

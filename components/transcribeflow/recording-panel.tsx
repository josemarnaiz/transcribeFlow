'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useAppState } from './hooks/use-app-state';
import { generateTranscription } from './utils/transcription-generator';

export function RecordingPanel() {
  const { state, dispatch } = useAppState();
  const { recording, transcription, settings } = state;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const streamRef = useRef<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  
  // Initialize audio visualization
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const animate = () => {
      ctx.fillStyle = 'var(--bg-secondary)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw waveform based on audio level
      const barWidth = 3;
      const barSpacing = 2;
      const barCount = Math.floor(canvas.width / (barWidth + barSpacing));
      
      for (let i = 0; i < barCount; i++) {
        const height = Math.random() * recording.audioLevel * canvas.height;
        const x = i * (barWidth + barSpacing);
        const y = (canvas.height - height) / 2;
        
        ctx.fillStyle = recording.isRecording ? 'var(--recording-color)' : 'var(--text-tertiary)';
        ctx.fillRect(x, y, barWidth, height);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [recording.audioLevel, recording.isRecording]);
  
  const toggleRecording = async () => {
    if (!recording.isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        setHasPermission(true);
        
        dispatch({ type: 'SET_RECORDING', payload: { isRecording: true, duration: 0 } });
        
        // Start mock transcription after a delay
        setTimeout(() => {
          dispatch({ type: 'SET_TRANSCRIPTION', payload: { isTranscribing: true, progress: 0 } });
          
          generateTranscription(
            recording.duration,
            (text, progress) => {
              dispatch({ 
                type: 'SET_TRANSCRIPTION', 
                payload: { text, progress, currentIndex: text.length } 
              });
              
              if (state.currentSession) {
                dispatch({
                  type: 'UPDATE_CURRENT_SESSION',
                  payload: { text }
                });
              }
            },
            settings.transcriptionSpeed
          ).then(() => {
            dispatch({ type: 'SET_TRANSCRIPTION', payload: { isTranscribing: false } });
          });
        }, 2000);
        
      } catch (error) {
        console.error('Error accessing microphone:', error);
        setHasPermission(false);
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      dispatch({ type: 'SET_RECORDING', payload: { isRecording: false } });
    }
  };
  
  return (
    <div className="panel recording-panel">
      <div className="panel-header">
        <h2 className="panel-title">Recording</h2>
      </div>
      
      <div className="waveform-container">
        <canvas ref={canvasRef} className="waveform-canvas" />
        {recording.isRecording && (
          <div className="recording-timer">
            {formatTime(recording.duration)}
          </div>
        )}
      </div>
      
      <div className="audio-level-meter">
        <div 
          className="audio-level-fill" 
          style={{ width: `${recording.audioLevel * 100}%` }}
        />
      </div>
      
      <button
        className={`record-button ${recording.isRecording ? 'recording' : ''}`}
        onClick={toggleRecording}
      >
        {recording.isRecording ? '■' : '●'}
      </button>
      
      {!hasPermission && (
        <p className="permission-warning">
          Click to grant microphone permission
        </p>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css'; // Import the CSS file

const App = () => {
  const [copied, setCopied] = useState(false);

  const commands = [
    {
      command: 'reset',
      callback: ({ resetTranscript }) => resetTranscript()
    },
    {
      command: 'open *',
      callback: (site) => {
        window.open('http://' + site)
      }
    },
    {
      command: 'change background color to *',
      callback: (color) => {
        document.body.style.background = color;
      }
    }
  ]

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="container">
      <h1>Speech to Text App</h1> {/* Title */}
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <div className="button-container">
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
        {copied && <span>Copied!</span>}
      </div>
      {transcript && (
        <div className="generated-text-container">
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default App;

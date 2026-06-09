import React, { useRef, useState } from 'react'

function NewInterview() {

  const question = "Tell me about yourself";
  //for the question we can use a state and we can generate through gemini ai api
  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  //for reading question statically
  function readQuestion() {
    const utterence = new SpeechSynthesisUtterance(question);

    utterence.lang = "en-US";
    utterence.rate = 1;

    window.speechSynthesis.speak(utterence);
  }

  function startAnswer() {

    //bring the speech recognition api from window
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition();
    //until we stop manually it will listen what we speak
    recognition.continuous = true;
    //return the partial answers of what we speak
    recognition.interimResults = true;
    //language
    recognition.lang = "en-US"

    //triggered while microphone start listening
    recognition.onstart = () => {
      console.log("start listening");
      setIsListening(true);
    }

    //triggered while speech converts to text
    recognition.onresult = (event) => {
      let transcript = ""

      //event.results contains all recognized speech chunks.
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
      setAnswer(transcript.trim());

      console.log("Recognized Text:", transcript);
    }

    recognition.onend = () => {

      setIsListening(false);
    }

    recognition.start();

    //Save recognition instance in ref.
    //we are already storing recognition instance we can use anywhere
    recognitionRef.current = recognition

  }

  function stopAnswer() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);

    console.log("Listening stopped")
  }


  return (
    <>

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {question}
        </h2>

        <div className="flex gap-4 mb-6">
          <button
            onClick={readQuestion}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Read Question
          </button>

          <button
            onClick={startAnswer}
            disabled={isListening}
            className={`px-4 py-2 rounded-lg text-white transition cursor-pointer ${isListening
              ? "bg-gray-400 cursor-not-allowed "
              : "bg-green-600 hover:bg-green-700 cursor-pointer"
              }`}
          >
            Start Answer
          </button>
          <button
            onClick={stopAnswer}
            disabled={!isListening}
            className={`px-4 py-2 rounded-lg text-white transition ${!isListening
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
              }`}
          >
            Stop Answer
          </button>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Your Answer
          </h3>

          <textarea
            rows={6}
            value={answer}
            readOnly
            placeholder="Your spoken answer will appear here..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

    </>
  )
}

export default NewInterview


/*

Weekend task
 1. A function that should accept text and convert into speech
 2. User will click a button  called start then start talking (giving answer)
 3. A function that should listen to speech and convert it into text
 4. User will click a button called stop to stop giving answer
 5. User can have one more button which says re-attempt to replace current answer
 6. User can have one more button whcih says No-Answer in red color 
 7. Once user gives answer then there should be a button saying submit answer
*/
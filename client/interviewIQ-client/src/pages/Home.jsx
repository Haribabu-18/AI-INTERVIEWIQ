import React, { useEffect, useRef, useState, useContext } from 'react'
import { api } from '../apis/interceptors';
import socket from '../interviewSocket';
import { startListening, stopListening, stopSpeaking, textToSpeech } from '../utils/speech';
import { data } from 'react-router-dom';
import aiImage from '../assets/ai-dummy.jpeg'
import { INTERVIEW_STAGES } from '../constants';
import AiAvatar from '../components/AiAvatar';
import { UserProvider } from '../components/ContextProvider';

function Home() {

  const aiContentContainer = useRef();

  const { userDetails } = useContext(UserProvider);

  const [userText, setUserText] = useState("");
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("First question");
  const [buttonText, setButtonText] = useState("Start Interview")
  const [currentState, setCurrentState] = useState(INTERVIEW_STAGES.DID_NOT_ANSWER_YET)
  const [buttonColor, setButtonColor] = useState("bg-blue-400")
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewResult, setInterviewResult] = useState(null);

  //for questions part in rightside
  const [allQuestions, setAllQuestions] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState([]);

  async function callAI(e) {
    e.preventDefault();

    if (!userText.length) {
      return
    }


    try {
      const response = await api.post('/interview/liveInterview', { prompt: userText });

      console.log(response, response?.data?.data, 'ai response')

      aiContentContainer.current.innerText = response.data.data

    } catch (err) {
      console.log(err)

    }
  }

  function firstQuestion() {
    socket.emit("first-message", { message: "Tell me about yourself" })
  }

  function handleStartButton() {

    stopSpeaking(setIsAiSpeaking);

    if (!interviewStarted) {
      socket.emit("start-interview", {
        stack: "MERN",
        experience: "Fresher"
      });
      setInterviewStarted(true)
      setButtonText("Start Answering");
      return
    }

    //onclick to start, enable mike and listen and chnage text to stop
    if (currentState === INTERVIEW_STAGES.DID_NOT_ANSWER_YET) {
      startListening(setAnswer);
      setButtonText("Stop Recording")
      setCurrentState(INTERVIEW_STAGES.ANSWERING)
      setButtonColor("bg-orange-400")
      return
    }

    //onclick to stop, disable mike and change text to submit
    if (currentState === INTERVIEW_STAGES.ANSWERING) {
      stopListening();
      setButtonText("Submit Answer")
      setCurrentState(INTERVIEW_STAGES.COMPLETED_ANSWER);
      setButtonColor("bg-green-400")
      return
    }

    //onclick to submit, answer should sent to backend(socket) and get a new question and chnage button text to start
    if (currentState === INTERVIEW_STAGES.COMPLETED_ANSWER) {

      //for questions on right side

      setCompletedQuestions(prev => [
        ...prev,
        question
      ]);

      socket.emit("submit-answer", {
        answer
      })
      setButtonText("Start Answering");
      setAnswer("");
      setCurrentState(INTERVIEW_STAGES.DID_NOT_ANSWER_YET);
      setButtonColor("bg-blue-400")
      return
    }

  }

  function handleCompleteInterview() {
    stopListening();
    socket.emit("end-interview")
  }


  useEffect(() => {
    socket.connect();

    //Listening for AI questions

    socket.on("ai-question", (data) => {
      const aiQuestion = data.question;
      setQuestion(aiQuestion);

      //for questions on rightside
      setAllQuestions(prev => {
        if (prev.includes(aiQuestion)) return prev;
        return [...prev, aiQuestion];
      });

      textToSpeech(aiQuestion, setIsAiSpeaking);
    })

    socket.on("interview-result", (data) => {

      console.log("Interview Saved");

      setInterviewResult(data);
    });

    return () => {
      socket.off("ai-question")
      socket.off("interview-result");
      socket.disconnect();
    }

    // socket.on("confirm-interview", (data) => {
    //   console.log(data, "second message from server")
    //   if (data.message) {
    //     textToSpeech(data.message, setIsAiSpeaking);
    //   }
    // })

  }, [])

  // useEffect(() => {
  //   aiContentContainer.current.innerText = aiResponse;   
  // }, [])
  return (
    <>

      {/* <div>
        <form className='flex justify-center mt-4 gap-4' onSubmit={callAI}>
          <textarea type="text" placeholder='ask ai' className='w-80 border-1 shadow-2xl' onChange={(e) => { setUserText(e.target.value) }} />
          <input type="submit" value="Submit" disabled={!userText.length ? true : false} className={`${!userText.length ? "bg-blue-300 rounded text-white p-3" : "bg-blue-700 cursor-pointer rounded text-white p-3"}`} />
        </form>
      </div>

      <div ref={aiContentContainer}>

      </div> */}

      {/* <button onClick={firstQuestion}>First Message</button> 
      <br />

      {/* <button onClick={startInterview}>Start Interview</button>  */}
      {/* <button onClick={() => {textToSpeech("hey lets start interview")}}>Listen</button>

      <br />

      <button onClick={() => {startListening(setAnswer)}}>Speak</button>

      <br />

      <button onClick={stopListening}>Stop</button> */}

      {/* <br /> */}

      {/* <div className='h-screen flex justify-center'> */}
      {/* <div className='absolute top-20.5'>
          <AiAvatar speaking={isAiSpeaking} />
          {/* <img src={aiImage} alt="could not find" className={`h-60 rounded-3xl ${isAiSpeaking ? "opacity-100" : "opacity-50"}`} /> */}
      {/* <h3 className='font-bold text-xl'>{question}</h3> */}
      {/* </div> */}

      {/* <div className='absolute top-100.5 flex gap-1'>
          <textarea
            className='border shadow-2xl w-100'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button className={`text-white ${buttonColor} mt-1 p-2 rounded cursor-pointer`} onClick={handleStartButton}>{buttonText}</button>

        </div> */}

      {/* <div className='absolute top-120 flex gap-3'>

          <button
            className='bg-red-500 text-white p-2 rounded'
            onClick={handleCompleteInterview}
          >
            Complete Interview
          </button>

        </div> */}

      {/* </div> */}

      {/* clean code */}
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-3 gap-8">

            {/* LEFT SIDE */}
            <div className="col-span-2">

              <div className="bg-white rounded-3xl shadow-xl p-8">

                <div className="flex justify-center">
                  <AiAvatar speaking={isAiSpeaking} />
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {question}
                  </h2>
                </div>

                <div className="mt-8">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full border rounded-xl p-4 h-36 resize-none"
                    placeholder="Speak or type your answer..."
                  />
                </div>

                <div className="mt-6 flex justify-center gap-4">

                  <button
                    onClick={handleStartButton}
                    className={`${buttonColor} text-white px-5 py-2 rounded-lg font-medium min-w-[140px]`}
                  >
                    {buttonText}
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium min-w-[140px]"
                    onClick={handleCompleteInterview}
                  >
                    Complete Interview
                  </button>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div>

              <div className="bg-white rounded-3xl shadow-xl p-5">

                <h3 className="font-bold text-xl mb-5">
                  Interview Progress
                </h3>

                {allQuestions.length === 0 ? (
                  <p>No questions yet</p>
                ) : (
                  allQuestions.map((q, index) => (
                    <div
                      key={index}
                      className={`mb-3 p-4 rounded-xl border flex justify-between items-center
                ${completedQuestions.includes(q)
                          ? "bg-green-50 border-green-300"
                          : q === question
                            ? "bg-yellow-50 border-yellow-300"
                            : "bg-gray-50"
                        }`}
                    >
                      <span className="text-sm">
                        {q}
                      </span>

                      {completedQuestions.includes(q) ? (
                        <span className="text-green-600 font-bold">
                          ✓
                        </span>
                      ) : q === question ? (
                        <span className="text-yellow-600 font-semibold">
                          Current
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          Pending
                        </span>
                      )}
                    </div>
                  ))
                )}

              </div>

            </div>

          </div>

        </div>
      </div>

    </>
  )
}

export default Home
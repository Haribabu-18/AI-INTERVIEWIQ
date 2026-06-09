function textToSpeech(text) {
    const speechSynthesis = window.speechSynthesis;

    if (!speechSynthesis) {
        alert("window not supporting, please enable speaker in browser");
        return
    }

    speechSynthesis.cancel();

    const utterence = new SpeechSynthesisUtterance(text)
    utterence.lang = "en-US"
    // console.log(utterence,'utterence');
    speechSynthesis.speak(utterence);

}


let recognition = null;
function startListening(onTranscript) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("window doesnt support speech");
        return
    }

    recognition = new SpeechRecognition();
    //until we stop manually it will listen what we speak
    recognition.continuous = true;
    //return the partial answers of what we speak
    recognition.interimResults = true;
    //language
    recognition.lang = "en-US"

    recognition.onresult = (data) => {
        console.log(data, "data from on result event")

        let transcript = "";

        for(let i = 0; i < data.results.length; i++){
            transcript += data.results[i][0].transcript + " ";
        }

        onTranscript(transcript);

        console.log(transcript, "text from speak")
    }

    recognition.start();

}

function stopListening(){
    if(recognition){
        recognition.stop();
    }
}

export { textToSpeech, startListening, stopListening }
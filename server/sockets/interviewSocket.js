import { askAI } from "../controllers/auth/live-interview.js";
import { Interview } from "../models/interview.js";

const interviewSessions = new Map();

function interviewSocket(socket) {
    // socket.on("first-message", (data) => {
    //     console.log("first message recieved", data);

    //     socket.emit("confirm-interview", { message: "first message recieved good to start interview" })
    // })

    socket.on("start-interview",
        async ({
            stack = "MERN",
            experience = "Fresher"
        }) => {

            try {

                const session = {
                    // userId,
                    stack,
                    experience,
                    startedAt: new Date(),
                    conversation: [
                        {
                            role: "system",
                            content: `
                            You are a Junoir Technical Interviewer.
                            Candidate Stack:
                            ${stack}
                            Experience:
                            ${experience}

                            Rules:

                            1. Ask only one question based on useEffect.
                            2. Ask follow-up questions.
                            3. Challenge weak answers, or ask follow up question if answer is not 100% correct
                            4. Increase difficulty gradually.
                            5. Never provide solutions.`
                        }
                    ]
                }

                //store the conversation with socketId (used to identify which user)
                interviewSessions.set(
                    socket.id,
                    session
                )

                //Generating first question
                const firstQuestion = await askAI({ message: session.conversation });

                //storing the first question in session.conversation array
                session.conversation.push({
                    role: "assistant",
                    content: firstQuestion
                })

                //sending request 
                socket.emit("ai-question", { question: firstQuestion })

            } catch (err) {
                console.log(err)
                socket.emit("error", { message: err.message })

            }
        }
    )

    socket.on("submit-answer",
        async ({ answer }) => {
            try {

                //getting socketId
                const session = interviewSessions.get(socket.id)

                if (!session) {
                    return
                }

                //store the answer given by user in conversation array
                session.conversation.push({
                    role: "user",
                    content: answer
                })

                //generating next question using askAI function
                const nextQuestion = await askAI({ message: session.conversation })

                //store that question in conversation array
                session.conversation.push({
                    role: "assistant",
                    content: nextQuestion
                })

                //sending next question to user
                socket.emit("ai-question", { question: nextQuestion })

            } catch (err) {
                console.log(err);
                socket.emit("error", { message: err.message })

            }
        }

    )

    socket.on("get-conversation", () => {
        const session = interviewSessions.get(socket.id)

        socket.emit("conversation-data", session?.conversation || []);
    })

    socket.on("end-interview", async () => {
        const session = interviewSessions.get(socket.id)

        if (!session) {
            return;
        }

        // {technicalScore : 8, communicationScore : 2, strongAreas : ["react","react-router","react-practical"], weakAreas : ["DSA","JS fundamentals","Constructor function"], roadMap : "Should practice more on DSA part for week 1 ...."}


        // Before ending the interview get a feedback, get total score out of 10, get score for communication out of 5 and return an array for strong areas and weak areas also generate a week road map
        const lastConversation = {
            role: "system",
            content: ` 
            You are a senior technical interviewer. 
            Evaluate the FULL interview transcript provided by the user.

            Return ONLY valid JSON — no markdown, no explanation.

            Scoring rules:
            - technicalScore: integer 0-10. Base on correctness, depth, React practical, DSA, JS fundamentals.
            - communicationScore: integer 0-5. Base on clarity, structure, English fluency, confidence.
            - strongAreas: array of  strings (skills where candidate was solid)
            - weakAreas: array of strings (skills to improve)
            - roadMap: object with 7 days for week 1, each day is a specific task

            JSON schema to follow exactly:
            {
            "technicalScore": 8,
            "communicationScore": 2,
            "strongAreas": ["react", "react-router", "react-practical"],
            "weakAreas": ["DSA", "JS fundamentals", "Constructor function"],
            "feedback" : "You were good with explination part, theory part but should practice more on practical part in question 1 you strugged to create crud operation",
            "roadMap": {
                "day1": "DSA basics - arrays and time complexity",
                "day2": "JS fundamentals - closures and hoisting",
                "day3": "Constructor functions vs classes",
                "day4": "Practice 5 LeetCode easy array problems",
                "day5": "React practical - build small router app",
                "day6": "Mock interview - explain code out loud",
                "day7": "Review weak areas and retake quiz"
            }
            }

            return me result in json format 
`
        }

        //add last conversation to whole conversation
        session.conversation.push(lastConversation);

        //call ai to get feedback in JSON format from the given conversation
        const feedback = await askAI({ message: session.conversation });

       const savedInterview =  await addInterview({
            aiResponse: feedback,
            userId: socket.userId,
            stack: session.stack,
            difficultyLevel: session.experience,
            conversation: session.conversation,
            startedAt: session.startedAt
        })

        console.log(session?.conversation)

        socket.emit("interview-result", savedInterview);

        interviewSessions.delete(socket.id);



    })

    socket.on("disconnect", () => {
        interviewSessions.delete(socket.id);

        console.log("Disconnected", socket.id);
    })

}

export default interviewSocket

async function addInterview({
    aiResponse,
    userId,
    stack,
    difficultyLevel,
    conversation,
    startedAt
}) {
    try {
        // Take json from ai verify it with schema

        //converting AI response string to object
        const result =
            typeof aiResponse === "string" ? JSON.parse(aiResponse) : aiResponse;

        // Validate required fields
        if (
            result.technicalScore === undefined ||
            result.communicationScore === undefined ||
            !result.feedback
        ) {
            throw new Error("AI response missing required fields");
        }
        // Then create a new object and pass all details to it (object should be mathcing with Interview model schema)
        const interviewData = await Interview.create({
            userId,
            stack,
            difficultyLevel,
            technicalScore: result.technicalScore,
            communicationScore: result.communicationScore,
            strongAreas: result.strongAreas,
            weakAreas: result.weakAreas,
            feedback: result.feedback,
            conversation,
            startedAt,
            endedAt: new Date()
        });

        return interviewData

    } catch (err) {
        console.log(err.message);
        throw err

    }

}
import { askAI, getFeedbackFromAI } from "../controllers/auth/live-interview.js";
import { Interview } from "../models/interview.js";
import { endInterviewSystemPrompt, startInterviewSystemPrompt } from "../utils/prompts.js";

const interviewSessions = new Map();

function interviewSocket(socket) {
    const userId = socket.userId
    console.log(userId, "userid ")
    // socket.on("first-message", (data) => {
    //     console.log("first message recieved", data);

    //     socket.emit("confirm-interview", { message: "first message recieved good to start interview" })
    // })

    socket.on("start-interview",
        async ({
            stack = "MERN",
            difficultyLevel = "Fresher"
        }) => {

            console.log("User ID received:", userId);
            try {

                const session = {
                    userId,
                    stack,
                    difficultyLevel,
                    startedAt: new Date(),
                    conversation: [
                        {
                            role: "system",
                            content: startInterviewSystemPrompt(stack, difficultyLevel)
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
        // console.log("Saving interview for:", session.userId);

        // {technicalScore : 8, communicationScore : 2, strongAreas : ["react","react-router","react-practical"], weakAreas : ["DSA","JS fundamentals","Constructor function"], roadMap : "Should practice more on DSA part for week 1 ...."}


        // Before ending the interview get a feedback, get total score out of 10, get score for communication out of 5 and return an array for strong areas and weak areas also generate a week road map
        const lastConversation = {
            role: "system",
            content: endInterviewSystemPrompt()
        }

        //add last conversation to whole conversation
        session.conversation.push(lastConversation);

        //call ai to get feedback in JSON format from the given conversation
        const feedback = await getFeedbackFromAI({ message: session.conversation });

        console.log("AI Feedback:", feedback);

        const savedInterview = await addInterview({
            aiResponse: feedback,
            userId: session.userId,
            stack: session.stack,
            difficultyLevel: session.difficultyLevel,
            conversation: session.conversation,
            startedAt: session.startedAt
        })

        socket.emit("interview-result", savedInterview);

        // socket.emit("speak-feedback", feedback);

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
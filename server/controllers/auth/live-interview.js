import dotenv from 'dotenv'
dotenv.config();

import OpenAI from "openai";
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log(GEMINI_API_KEY, 'api key')

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function liveInterview(req, res) {

    const body = req.body
    if (!body) {
        res.status(401).json({ message: "No promt provided" })
    }


    try {
        // const client = new OpenAI({
        //     apiKey: process.env.OPENAI_API_KEY,
        // });

        // const response = await client.responses.create({
        //     model: 'gpt-5.5',
        //     input: body.prompt,
        // });

        // const response = await ai.models.generateContent({
        //     model: 'gemini-2.5-flash',
        //     contents: body.prompt,
        // });

        // console.log(response.text);

        res.status(200).json({ message: "ok", data: response.text })

    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })

    }
}

async function askAI({message}) {
    const prompt = message.map((item) => {
        return `${item.role} : ${item.content}`
    }).join("\n")

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        console.log(response.text);
        return response.text;

    } catch (err) {
        return Promise.reject(err);

    }

}

async function getFeedbackFromAI({ message }) {
    console.log(message)

    const prompt = message.map((item) => {

        // console.log(message,prompt)
        return `${item.role} : ${item.content}`
    }).join("\n")



    try {

        // GEMINI AI
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }

        });

        return response.text

    } catch (err) {
        return Promise.reject(err)
    }
}

export { askAI, getFeedbackFromAI }
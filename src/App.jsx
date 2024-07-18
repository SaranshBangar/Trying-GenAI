"use client";

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [wordLimit, setwordLimit] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const API_KEY = "AIzaSyCUfopTNKCnt2pjEORnLmp5HomPZghvvMA";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const updatedPrompt = `Remember, your name is BangerAI and you are acting as an AI Writing Assistant. I will provide you with a prompt, the desired word limit, and the number of paragraphs to generate. The prompt can be anything random, and you should create an essay based on it. The word count should be approximately close to the specified limit. After every paragraph, include an extra line for clarity. Please note that formatting like bold, italics, bullet points, or emojis is not allowed. If no prompt is provided, respond with 'Please provide a prompt.' Currently, you are speaking to the developer, but your responses will be read by the general public, who may not be technically savvy. Remember to include the extra line. Got it? Here is your prompt -> ${prompt}, the word limit -> ${wordLimit}, and the paragraph number -> ${paragraph}.`

    try {
      const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(updatedPrompt);
      const response = await result.response;
      setText(response.text);
    } catch (error) {
      setError(true);
      console.error("Error generating content : ", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then (() => {
        alert("Text copied to clipboard!");
      })
      .catch (e => {
        console.log(e);
      })
  }
  
  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prompt}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } 

  return (
    <section className="min-h-[100vh] max-h-fit flex justify-center bg-slate-900">
      <div className="w-[75%] flex flex-col">
        <div className="">
          <h1 className="py-8 font-sans text-4xl font-extrabold tracking-tight text-center text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Write an essay using just a single word!</h1>
          <h3 className="font-sans text-center mt-2 text-2xl font-medium  tracking-tight text-gray-900 md:text-[24px] lg:text-3xl dark:text-white/60">Unleash Your Creativity : Craft an Entire Essay with Just One Powerful Word</h3>
        </div>
        <div className="flex items-center justify-center my-12">
          <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-8">
            <div className="flex flex-row justify-evenly max-md:flex-col max-md:gap-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your prompt..."
                className="w-[30%] max-md:w-full h-10 placeholder:text-black/60 rounded-lg text-xl p-1 pl-2 focus:outline-none"
              />
              <input
                type="number"
                value={wordLimit}
                onChange={(e) => setwordLimit(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Number of words..."
                className="w-[30%] max-md:w-full h-10 placeholder:text-black/60 rounded-lg text-xl p-1 pl-2 focus:outline-none"
              />
              <input
                type="number"
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Number of paragraphs..."
                className="w-[30%] max-md:w-full h-10 placeholder:text-black/60 rounded-lg text-xl p-1 pl-2 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="w-[100px] h-[45px] text-xl bg-slate-600 rounded-full transition-all duration-150 ease-in-out hover:bg-slate-500 hover:-translate-y-[2px] hover:scale-[1.05]">Submit</button>
            </div>
          </form>
        </div>
        <div>
          {
            error
              &&
            <div className="border-[1px] border-white/60 rounded-lg">
              <p className="p-4 text-red-500 text-[16px]">{"Something went wrong, try again!"}</p>
            </div>
          }
          {
            text
              &&
            <div className="mb-4 border-[1px] border-white/60 rounded-lg">
              <p className="p-4 text-white max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px] max-md:text-justify">{text}</p>
            </div>
          }
        </div>
        {
          text
            &&
          <div className="flex items-center justify-center my-8">
            <div className="w-[30%] flex justify-between items-center max-md:w-full max-md:flex-col max-md:gap-4">
              <button onClick={handleCopy} className="w-[40%] max-md:w-[50%] h-[45px] text-xl bg-slate-600 rounded-full transition-all duration-150 ease-in-out hover:bg-slate-500 hover:-translate-y-[2px] hover:scale-[1.05] focus:outline-none">Copy</button>
              <button onClick={handleDownload} className="w-[40%] max-md:w-[50%] h-[45px] text-xl bg-slate-600 rounded-full transition-all duration-150 ease-in-out hover:bg-slate-500 hover:-translate-y-[2px] hover:scale-[1.05] focus:outline-none">Download</button>
            </div>
          </div>
        }
      </div>
    </section>
  );
}

export default App;
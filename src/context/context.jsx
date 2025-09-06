import { createContext, useState, useEffect } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState()
  const [recentPrompt, setrecentPrompt] = useState()
  const [prevPrompt, setprevPrompt] = useState([])
  const [showResult, setshowResult] = useState(false)
  const [loading, setloading] = useState(false)
  const [resultData, setresultData] = useState("")
  const [Dark, onDark] = useState(false)

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setresultData(prev => prev + nextWord);
    }, 75 * index);
  }

  const newChat = () => {
    setloading(false)
    setshowResult(false)
  }

  const onSent = async (prompt) => {
    setresultData("")
    setloading(true)
    setshowResult(true)
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt)
      setrecentPrompt(prompt)
    }
    else {
      setprevPrompt(prev => [...prev, input])
      setrecentPrompt(input)
      response = await runChat(input)
    }
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>")
    let newResponseArray = newResponse2.split("");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord, " ")

    }
    setresultData(newResponse2)
    setloading(false)
    setinput('')
  };

  const contextValue = {
    prevPrompt,
    setprevPrompt,
    onSent,
    recentPrompt,
    setrecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setinput,
    newChat,
    Dark,
    onDark
  }
  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;

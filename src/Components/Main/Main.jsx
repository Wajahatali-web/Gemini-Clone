import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Context } from "../../context/context"
import "./main.css"
import { useContext } from 'react'

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, input, setinput,Dark,onDark} = useContext(Context)

    return (
            <div className={Dark ? "main" : "main theme"}>
                <div className="nav">
                    <p>Gemini</p>
                    <div>
                        {Dark?<><img src={assets.mode_icon} onClick={() => onDark(prev => !prev)} alt="" /></>:<><img src={assets.light_mode} className='bg-white' onClick={() => onDark(prev => !prev)} alt="" /></>}
                        <img src={assets.user_icon} alt="" />
                    </div>
                </div>
                <div className="main-container">
                    {!showResult ?
                        <>
                            <div className="greet">
                                <p><span>Hello, Dev.</span></p>
                                <p>How can i help you today</p>
                            </div>
                            <div className="cards">
                                <div className={Dark ? "card" : "card-dark"}>
                                    <p>Suggest beautiful place to see an upcoming road trip</p>
                                    <img src={assets.compass_icon} alt="" />
                                </div>
                                <div className={Dark ? "card" : "card-dark"}>
                                    <p>Suggest beautiful place to see an upcoming road trip</p>
                                    <img src={assets.bulb_icon} alt="" />
                                </div>
                                <div className={Dark ? "card" : "card-dark"}>
                                    <p>Suggest beautiful place to see an upcoming road trip</p>
                                    <img src={assets.message_icon} alt="" />
                                </div>
                                <div className={Dark ? "card" : "card-dark"}>
                                    <p>Suggest beautiful place to see an upcoming road trip</p>
                                    <img src={assets.code_icon} alt="" />
                                </div>
                            </div>
                        </>
                        : <div className={Dark?'result':"result info-dark"}>
                            <div className="result-title">
                                <img src={assets.user_icon} alt="" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className="result-data">
                                <img src={assets.gemini_icon} alt="" />
                                {loading
                                    ? <div className="loader">
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div> :
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}


                            </div>
                        </div>
                    }

                    <div className="main-bottom">
                        <div className={Dark ? "search-box" : "search-box dark"}>
                            <input onChange={(e) => setinput(e.target.value)} value={input} type="text" placeholder='Enter your prompt' className={Dark? " " :'white'} />
                            <div>
                                <img src={assets.gallery_icon} alt="" />
                                <img src={assets.mic_icon} alt="" />
                                {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                            </div>
                        </div>
                        <p className={Dark ? "info" : "info info-dark"}>Gemini can display an accurate info,including about prople,so doubt check it's response .Your privacy and gemini app</p>
                    </div>
                </div>
            </div>
    )
}
export default Main

import React, { useContext, useState } from 'react'
import "./Sidebar.css"
import { assets } from "../../assets/assets"
import { Context } from '../../context/context'

const Sidebar = () => {
    const [extended, setExtended] = useState(false)
    const { onSent, prevPrompt, setrecentPrompt ,newChat,Dark,onDark} = useContext(Context)

    const loadPrompt = async (prompt) => {
        setrecentPrompt(prompt)
        await onSent(prompt)
    }
    return (
        <div className={Dark?"sidebar": "sidebar sidebar-dark"}>
            {/* <div className="top" onMouseEnter={() => setExtended(prev => !prev)} onMouseLeave={() => setExtended(prev => !prev)}> */}
            <div className="top">
                <img className='menu' onClick={() => setExtended(prev => !prev)} src={assets.menu_icon} alt="" />
                <div className={Dark ?"new-chat": "new-chat-dark"} onClick={()=>newChat()}>
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? <div className={Dark?"recent":"recent-dark"}>
                    <p className="recent-title">Recent</p>
                    {prevPrompt.map((item, index) => {
                        return (
                            <div className={Dark?"recent-entry":"recent-entry-hover"} onClick={()=>loadPrompt(item)}>
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0,18)}...</p>
                            </div>
                        )
                    })}
                </div> : null}

            </div>
            <div className="bottom">
                <div className={Dark?"bottom-icon recent-entry":"bottom-icon recent-entry-hover"}>
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className={Dark?"bottom-icon recent-entry":"bottom-icon recent-entry-hover"}>
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className={Dark?"bottom-icon recent-entry":"bottom-icon recent-entry-hover"}>
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}
                </div>
            </div>

        </div>
    )
}

export default Sidebar

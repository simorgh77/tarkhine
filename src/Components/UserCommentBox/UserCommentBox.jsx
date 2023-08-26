import React from 'react'

import { AiFillStar } from "react-icons/ai"

import "./UserCommentBox.css"

export default function UserCommentBox({ img, message, name, date, score }) {
    return (
        <div className="comment-box">
            <div className="comment-box__user">
                <div className="comment-user__infos">
                    <img src={`/img/user/${img}`} alt={`user profile ${name}`} className="comment-box__user-profile" />
                    <p className="comment-box__user-name">
                        {name}
                    </p>
                    <span className="comment-box__date">
                        {date}
                    </span>
                </div>
                <div className="comment-box__score">
                    <AiFillStar />
                    {score}
                </div>
            </div>
            <div className="comment-box__body">
                <p className="comment-box__body-desc">
                    {message}
                </p>

            </div>
        </div>
    )
}

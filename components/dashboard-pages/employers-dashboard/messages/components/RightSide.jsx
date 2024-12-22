import React from 'react'

function RightSide() {
    return (
        <div className="d-flex justify-content-end mb-2 reply">
            <div className="img_cont_msg">
                <img
                    src="/images/resource/candidate-6.png"
                    alt=""
                    className="rounded-circle user_img_msg"
                />
                <div className="name">
                    You <span className="msg_time">35 mins</span>
                </div>
            </div>
            <div className="msg_cotainer">
                Hey there, we’re just writing to let you know that
                you’ve been subscribed to a repository on GitHub.
            </div>
        </div>
    )
}

export default RightSide
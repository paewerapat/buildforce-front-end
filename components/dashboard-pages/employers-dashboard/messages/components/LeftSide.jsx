import React from 'react'

function LeftSide() {
    return (
        <div className="d-flex justify-content-start mb-2">
            <div className="img_cont_msg">
                <img
                    src="/images/resource/candidate-3.png"
                    alt=""
                    className="rounded-circle user_img_msg"
                />
                <div className="name">
                    Albert Flores{" "}
                    <span className="msg_time">35 mins</span>
                </div>
            </div>
            <div className="msg_cotainer">
                How likely are you to recommend our company to your
                friends and family?
            </div>
        </div>
    )
}

export default LeftSide
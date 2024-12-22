import ChatHamburger from "./ChatHamburger";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const ChatBoxContentField = () => {
    return (
        <div className="card message-card">
            <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                    <div className="img_cont">
                        <img
                            src="/images/resource/candidate-8.png"
                            alt=""
                            className="rounded-circle user_img"
                        />
                    </div>
                    <div className="user_info">
                        <span>Arlene McCoy</span>
                        <p>Active</p>
                    </div>
                </div>

                <div className="btn-box">
                    <button className="dlt-chat">Delete Conversation</button>
                    <ChatHamburger />
                </div>
            </div>
            {/* End .cart-header */}

            <div className="card-body msg_card_body">
                {/* Left Side */}
                <LeftSide />

                {/* Right Side */}
                <RightSide />

            </div>
            {/* End .card-body */}

            <div className="card-footer">
                <div className="form-group mb-0">
                    <form>
                        <textarea
                            className="form-control type_msg"
                            placeholder="Type a message..."
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="theme-btn btn-style-one submit-btn"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            {/* End .card-footer */}
        </div>
    );
};

export default ChatBoxContentField;

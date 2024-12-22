import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { isReadNotifyAction } from '../../app/actions/notifyAction';

function Toast({msg, bgColor, handleShow}) {

    const dispatch = useDispatch();

    function updateNotificationHandler(id) {
        dispatch(isReadNotifyAction({id}))
    }

    return (
        <div className={`toast show position-fixed text-light ${bgColor}`}
        style={{top: '5%', right: '5px', minWidth: '200px', zIndex: 5000}}>
            <div className={`toast-header border-bottom text-light ${bgColor}`}>
                <span className={`fs-6 me-1 ${msg.icon}`}></span>
                <strong className="me-auto text-light">{msg.title}</strong>
                <button className="me-2 mb-1 close text-light"
                data-dismiss="toast" style={{outline: 'none'}}
                onClick={handleShow}>
                    &times;
                </button>
            </div>
            <div className="toast-body">
                <Link
                    href={msg.body.url}
                    onClick={() => updateNotificationHandler(msg.body.id)}
                >
                    <div className="d-flex flex-column justify-content-center text-light">
                        <div className="profile d-flex align-items-start gap-2 pb-3 border-bottom">
                            <img 
                                src={msg.body.image} 
                                alt="image-notify"
                                className='circle'
                                style={{height: '48px', width: '48px', borderRadius: '50%'}}
                            />
                            <div className="d-flex flex-column">
                                <h6 className='fw-bold mb-1' style={{textTransform: 'capitalize'}}>
                                    {msg.body.user?.fullName || msg.body.user?.companyName}
                                </h6>
                                <h6>
                                    {msg.body.text + ' ' + msg.body.content}
                                </h6>
                            </div>
                        </div>
                        <small className='d-block ms-auto'>
                            <i className='fa fa-clock'></i> {moment(msg.body.createdAt).fromNow()}
                        </small>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Toast
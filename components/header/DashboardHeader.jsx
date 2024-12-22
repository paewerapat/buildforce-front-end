import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../lib/axios";
import Avatar from "./Avatar";
import HeaderNavContent from "./HeaderNavContent";

const DashboardHeader = () => {

    const [navbar, setNavbar] = useState(false);
    const { user } = useSelector(state => state)
    const [notify, setNotify] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 10) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeBackground);
    }, []);

    useEffect(() => {
        if(!notify) axios.post(`/api/notify/read`, { id: user?.employerInfo?.id }).then(
            res => setNotify(res.data)
        )
    }, []);

    return (
        // <!-- Main Header-->
        <header
            className={`main-header header-shaddow  ${
                navbar ? "fixed-header animated slideInDown" : ""
            }`}
        >
            <div className="container-fluid">
                {/* <!-- Main box --> */}
                <div className="main-box">
                    {/* <!--Nav Outer --> */}
                    <div className="nav-outer">
                        <div className="logo-box">
                            <div className="logo">
                                <Link href="/">
                                    <Image
                                        alt="brand"
                                        src="/images/logo-wb-bi-bf.png"
                                        width={84}
                                        height={50}
                                    />
                                </Link>
                            </div>
                        </div>
                        {/* End .logo-box */}

                        <HeaderNavContent />
                        {/* <!-- Main Menu End--> */}
                    </div>
                    {/* End .nav-outer */}

                    <div className="outer-box">
                        <button className="menu-btn">
                            <Link href="/employers-dashboard/notifications">
                            {
                                notify && notify?.filter(item => !item.isRead).length > 0 &&
                                <span className="count">
                                    {
                                        notify?.filter(item => !item.isRead).length
                                    }
                                </span>
                            }
                                <span className="icon la la-bell"></span>
                            </Link>
                        </button>
                        {/* End notification-icon */}

                    {/* <!-- Dashboard Option --> */}
                        <div className="d-flex align-items-center btn-box2">
                            <div className="dropdown" style={{maxWidth: '106px'}}>
                                <button type='button' id="dropdownAvatar" data-bs-toggle="dropdown" aria-expanded="false">
                                    <Link
                                        href={`/employers-dashboard/dashboard`}
                                        role="button"
                                        className="d-flex align-items-center"
                                    >
                                    </Link>
                                    {
                                        user?.employerInfo?.logo
                                        ?
                                            <Image
                                            alt="avatar"
                                            style={{
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                height: '50px',
                                                width: '50px',
                                            }}
                                            src={user?.employerInfo?.logo}
                                            width={50}
                                            height={50}
                                        />
                                        :
                                        <Avatar seed={user?.email} diameter={50} />
                                    }
                                </button>
                                <ul className="dropdown-menu" aria-labelledby='dropdownAvatar' 
                                    style={{left: '20px', minWidth: '108px'}}
                                >
                                    <li>
                                        <Link href={'/logout'} className="d-flex justify-content-center align-items-center gap-2">
                                            <i className={`la la-sign-out`}></i>Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* End outer-box */}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;

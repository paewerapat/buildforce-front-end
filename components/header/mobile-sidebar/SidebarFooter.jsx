import Link from "next/link";
import { useSelector } from "react-redux";

const SidebarFooter = ({ t }) => {

  const { user } = useSelector(state => state)

  const socialContent = [
    // { id: 1, icon: "fa-facebook-f", link: "https://www.facebook.com/" },
    { id: 2, icon: "fa-twitter", link: "https://www.twitter.com/buidlforce" },
    // { id: 3, icon: "fa-instagram", link: "https://www.instagram.com/" },
    // { id: 4, icon: "fa-linkedin-in", link: "https://www.linkedin.com/" },
  ];

  return (
    <div className="mm-add-listing mm-listitem pro-footer">
      {
        !user.type === "candidate" || !user.type &&
        <Link href="/employers-dashboard/post-jobs" className="theme-btn btn-style-one mm-listitem__text">
          {t('Job Post')}
        </Link>
      }
      {/* job post btn */}

      <div className="mm-listitem__text">
        <div className="contact-info">
          <span className="phone-num">
            <span>{t('Contact us')}</span>
          </span>
          <a href="mailto:buidlforce@gmail.com" className="email">
            buidlforce@gmail.com
          </a>
        </div>
        {/* End .contact-info */}

        <div className="social-links">
          {socialContent.map((item) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <i className={`fab ${item.icon}`}></i>
            </a>
          ))}
        </div>
        {/* End social-links */}
      </div>
      {/* End .mm-listitem__text */}
    </div>
  );
};

export default SidebarFooter;

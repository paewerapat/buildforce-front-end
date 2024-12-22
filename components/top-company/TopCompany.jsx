import Link from "next/link";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const TopCompany = () => {

  const { homePage } = useSelector(state => state);
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} arrows={false}>
      {homePage.employers?.map((company) => (
        <div className="company-block" key={company.id}>
          <div className="inner-box">
            <figure className="image">
              <img src={company.logo} alt="top company" />
            </figure>
            <h4 className="name">
              <Link href={`employers/${company.id}`}>
                {company.companyName}
              </Link>
            </h4>
            <div className="location">
              <i className="flaticon-map-locator"></i>{' '}
              {
                company.contact?.country && company.contact.city
                ? company.contact?.country + ', ' + company.contact.city
                : company.contact?.country
                ? company.contact.country
                : company.contact?.city
                ? company.contact.city
                : 'Unknown'
              }
            </div>
            <Link
              href={`employers/${company.id}`}
              className="theme-btn btn-style-three"
            >
              {company.industry}
            </Link>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TopCompany;

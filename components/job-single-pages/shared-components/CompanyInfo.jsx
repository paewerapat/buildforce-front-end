import Skeleton from "react-loading-skeleton";
import Social from "../social/Social";

const CompanyInfo = ({ company, t }) => {
  return (
    <ul className="company-info">
      <li>
        {t('Primary industry')}: <span>{company?.industry || <Skeleton width={60} />}</span>
      </li>
      <li>
        {t('Company size')}: <span>{company?.companySize || <Skeleton width={40} />}</span>
      </li>
      <li>
        {t('Founded in')}: <span>{company?.founded || <Skeleton width={60} />}</span>
      </li>
      <li>
        {t('Phone')}: <span>{company?.phone || <Skeleton width={70} />}</span>
      </li>
      <li>
        {t('Email')}: <span>{company?.contactEmail || <Skeleton width={90} />}</span>
      </li>
      <li>
        {t('Location')}: <span>
          {
            (company?.contact.country && company?.contact?.city)
            ? company.contact.country + ', ' + company.contact.city
            : company?.contact.country
            ? company.contact.country
            : company?.contact.city
            ? company?.contact.city
            : '-'
          }
        </span>
      </li>
      <li>
        {t('Social media')}:
        {
          company?.social ? (
          Object.values(company?.social).some(object => object !== null && object !== '')
          ?
          <Social social={company?.social} />
          :
          <span>{'-'}</span>
          ) : <span>{'-'}</span>
        }
      </li>
    </ul>
  );
};

export default CompanyInfo;

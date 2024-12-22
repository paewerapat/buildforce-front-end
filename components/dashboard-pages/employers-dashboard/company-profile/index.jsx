import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import SocialNetworkBox from "./components/SocialNetworkBox";
import ContactInfoBox from "./components/ContactInfoBox";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import FormInfoBox from "./components/FormInfoBox";
import { useTranslation } from "react-i18next";

const Index = ({data}) => {

    const { t } = useTranslation('dashboard/employer/company_profile')

    return (
        <div className="page-wrapper dashboard">
            <span className="header-span"></span>
            {/* <!-- Header Span for hight --> */}

            <LoginPopup />
            {/* End Login Popup Modal */}

            <DashboardHeader />
            {/* End Header */}

            <MobileMenu />
            {/* End MobileMenu */}

            <DashboardEmployerSidebar />
            {/* <!-- End User Sidebar Menu --> */}

            {/* <!-- Dashboard --> */}
            <section className="user-dashboard">
                <div className="dashboard-outer">
                    <BreadCrumb title={t('bread_crumb')} />
                    {/* breadCrumb */}

                    <MenuToggler />
                    {/* Collapsible sidebar button */}

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ls-widget">
                                <div className="tabs-box">
                                    <div className="widget-title">
                                        <h4>{t('widget_title_profile')}</h4>
                                    </div>
                                    <FormInfoBox data={data} />
                                </div>
                            </div>
                            {/* <!-- Ls widget --> */}

                            {
                                data &&
                                <>
                                <div className="ls-widget">
                                    <div className="tabs-box">
                                        <div className="widget-title">
                                            <h4>{t('widget_title_social')}</h4>
                                        </div>
                                        {/* End .widget-title */}
                                        <div className="widget-content">
                                            <SocialNetworkBox data={data} />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Ls widget --> */}

                                <div className="ls-widget">
                                    <div className="tabs-box">
                                        <div className="widget-title">
                                            <h4>{t('widget_title_contact')}</h4>
                                        </div>
                                        {/* End .widget-title */}

                                        <div className="widget-content">
                                            <ContactInfoBox data={data} />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Ls widget --> */}
                                </>
                            }
                        </div>
                    </div>
                    {/* End .row */}
                </div>
                {/* End dashboard-outer */}
            </section>
            {/* <!-- End Dashboard --> */}

            <CopyrightFooter />
            {/* <!-- End Copyright --> */}
        </div>
        // End page-wrapper
    );
};

export default Index;

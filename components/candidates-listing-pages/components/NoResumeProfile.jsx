import Link from "next/link"

const NoResumeProfile = ({ t }) => {
    return (
        <div className="d-flex flex-column text-center">
    
            <h1><i className="fa fa-user-alt-slash text-primary" /></h1>
            <h3 style={{fontWeight: '500'}}>
                {t('no_resume_profile_h3')}
            </h3>
            <p className="mb-3">
                {t('no_resume_profile_p')}
            </p>
            <hr className="position-relative mx-auto mb-4 w-50" style={{backgroundColor: 'var(--primary-color)', height: '0.5px'}} />
    
            <Link href="/candidates">
            <button className="theme-btn btn-style-three mb-4">
                <i className="fa fa-users me-2" /> {t('no_resume_profile_button')}
            </button>
            </Link>
    
        </div>
    )
}

export default NoResumeProfile
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCandidateFromShortlistedEmployerAction } from '../../../../../app/actions/employerAction';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

function CandidateCard({ data: candidate }) {

    const { t } = useTranslation('common')
    const { update: sessionUpdate } = useSession();
    const dispatch = useDispatch();
    const { employerInfo } = useSelector(state => state.user)

    async function removeShortlistedHandler() {
        const body = {
            id: employerInfo?.id, shortlisted: candidate.id
        }
        dispatch(deleteCandidateFromShortlistedEmployerAction({body, id: candidate.id}))
        await sessionUpdate();
    }

    return (
        <div className="candidate-block-three" key={candidate.id}>
            <div className="inner-box row">
                <div className="content">
                    <figure className="image">
                        <img src={candidate.avatar} alt="candidates" />
                    </figure>
                    <h4 className="name">
                        <Link
                            href={`/candidates/${candidate.id}`}
                        >
                            {candidate.fullName}
                        </Link>
                    </h4>

                    <ul className="candidate-info">
                        <li className="designation">
                            {candidate.jobPosition}
                        </li>
                        <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {
                                candidate.contact?.country && candidate.contact.city
                                ? candidate.contact?.country + ', ' + candidate.contact.city
                                : candidate.contact?.country
                                ? candidate.contact.country
                                : candidate.contact?.city
                                ? candidate.contact.city
                                : t('unknown')
                            }
                        </li>
                        <li className="text-success">
                            <span className="icon flaticon-money text-success"></span> $
                            {candidate.expectedSalary.toLocaleString(0)}
                        </li>
                        <li>
                            <span className="icon flaticon-briefcase"></span>
                            {
                                candidate.experience === 0
                                ? t('new_graduates')
                                : candidate.experience === 1
                                ? '1 ' + t('year')
                                : candidate.experience + ' ' + t('years')
                            }
                        </li>
                    </ul>
                    {/* End candidate-info */}

                    <ul className="post-tags">
                        {candidate.specialisms.map((val, i) => (
                            <li key={i}>
                                <a href="#">{val}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* End content */}

                <div className="btn-box d-flex justify-content-end align-items-center gap-3 ms-auto" style={{alignSelf: 'flex-end'}}>

                    <button 
                        className='bg-warning text-white' 
                        style={{borderRadius: '50%', width: '42px', height: '42px'}} 
                        type='button'
                        onClick={removeShortlistedHandler}
                    >
                        <span className="flaticon-bookmark"></span>
                    </button>


                    <Link
                        href={`/candidates/${candidate.id}`}
                        className="theme-btn btn-style-three"
                    >
                        <span className="btn-title">{t('View Profile')}</span>
                    </Link>
                </div>
                {/* End btn-box */}
            </div>
        </div>
    )
}

export default CandidateCard
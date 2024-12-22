import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'

export default function LanguageSwitch({ size }) {

    const { locale } = useRouter();
    const router = useRouter();

    function setCookieLocale(locale) {
        document.cookie = `NEXT_LOCALE=${locale}; max-age=3600000; path=/`
        router.replace(router.asPath, router.asPath, { locale })
        // router.replace({
        //     route: router.pathname,
        //     query: router.query
        // }, router.asPath, { locale, shallow: true });
    }

    return (
        <div className="dropdown">
            <button type='button' id="dropdownAvatar" data-bs-toggle="dropdown" aria-expanded="false">
                {
                    locale === "en"
                    ? <Image alt='united-states' src={'/images/flag/united-states.png'} height={size} width={size} />
                    : <Image alt='thailand' src={'/images/flag/thailand.png'} height={size} width={size} />
                }
            </button>
            <ul className="dropdown-menu" aria-labelledby='dropdownAvatar' style={{left: '20px', minWidth: '84px', cursor: 'pointer'}}>
                <li className='d-flex justify-content-center align-items-center gap-2 mb-2' onClick={() => setCookieLocale('en')}>
                    <Image alt='united-states' src={'/images/flag/united-states.png'} height={28} width={28} /> EN
                </li>
                <li className='d-flex justify-content-center align-items-center gap-2' onClick={() => setCookieLocale('th')}>
                    <Image alt='thailand' src={'/images/flag/thailand.png'} height={28} width={28} /> TH
                </li>
            </ul>
        </div>
    )
}

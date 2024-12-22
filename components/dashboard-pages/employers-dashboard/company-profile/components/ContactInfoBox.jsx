import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "../../../../../lib/axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

const ContactInfoBox = ({ data }) => {

    const { t } = useTranslation('dashboard/employer/company_profile')
    const router = useRouter();
    const [errorState, setErrorState] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countryData, setCountry] = useState(
        data?.contact 
        ? {value: data?.contact?.country, isoCode: data?.contact?.country}
        : {value: '', isoCode: ''}
    );
    
    const initialState = data?.contact
    ? data?.contact
    : {
        country: '', city: '', address: '',
    }
    
    const [employerData, setEmployerData] = useState(initialState);
    const { 
        country, city, address
    } = employerData;
    
    const allCountries = Country.getAllCountries().map(value => ({
        value: value.isoCode, label: value.name
    }))
    const stateByCountries = countryData.value !== "" ? State.getStatesOfCountry(countryData.isoCode).map(value => ({
        value: value.name, label: value.name
    })) : ''

    function onChangeHanlder(event) {
        const { value, name } = event.target
        setEmployerData({...employerData, [name]:value })
    }

    async function submitFormEmployerData(event) {
        event.preventDefault();
        try {
            const body = { contact: {...employerData, country: country.value, city: city.value}, id: data.id};
            const updateType = 'contact'
            const { data: response} = await axios.post("/api/employers/profile/update", body, {
                headers: { updateType: updateType }
            })
            setLoading(false);
            toast.success(
                <>
                {response.msg}
                <br/>
                <Link className="text-light fw-bold" href={`/employers/${response.updateContactEmployer.id}`}>
                    Click here to Employer profile
                </Link>
                </>
            );
            router.replace(router.asPath)
        } catch (err) {
            setLoading(false)
            console.log("[submitFormEmployerData-err] - ", err)
            toast.error(err?.response?.data?.msg || "Something wrong! Please try again.")
        }
    }

    useEffect(() => {
        setEmployerData(initialState)
    }, [data])

    return (
        <form className="default-form" onSubmit={submitFormEmployerData}>
            <div className="row">
                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>{t('label_country')}</label>
                    <Select
                        options={allCountries}
                        value={country !== "" ? { label: country, value: country } : ""}
                        onInputChange={() => setErrorState(false)}
                        onChange={(e) => setCountry({isoCode: e.value, value: e.label})}
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>{t('label_city')}</label>
                    <Select
                        value={city !== "" ? { label: city, value: city } : ""}
                        options={countryData?.value ? stateByCountries : []}
                        onFocus={() => countryData?.value ? '' : setErrorState("Please select country first")}
                        onChange={(e) => setEmployerData({...employerData, country: countryData, city: e })}
                    />
                    {
                        errorState && <small className="text-danger">{"* " + errorState}</small>
                    }
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <label>{t('label_address')}</label>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => onChangeHanlder(e)}
                        placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <button type="submit" className="theme-btn btn-style-one" disabled={loading}>
                    { 
                        loading 
                        ? <CircularProgress />
                        : t('button_save')
                    }
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ContactInfoBox;

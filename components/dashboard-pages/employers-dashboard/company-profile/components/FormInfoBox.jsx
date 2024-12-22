import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { storage } from "../../../../../lib/firebase";
import { checkImageFile } from "../../../../../utils/imageUpload";
import { useTranslation } from "react-i18next";

const FormInfoBox = ({data}) => {

    const { t } = useTranslation('dashboard/employer/company_profile')
    const { data: session, update: sessionUpdate } = useSession();

    const router = useRouter();
    const initialState = data
    ? data
    : {
        companyName: '', phone: '',
        contactEmail: '', website: '', industry: '', about: '', founded: '',
        companySize: '0 - 50', admin: [session.user.id]
    }
    const [employerData, setEmployerData] = useState(initialState);
    const { 
        companyName, phone, contactEmail, website,
        industry, about, founded, companySize,
    } = employerData;

    const [logoImg, setLogoImg] = useState(data?.logo ? data.logo : "");
    const [coverImg, setCoverImg] = useState(data?.logo ? data.cover : "");
    const [loading, setLoading] = useState(false);

    // logo image
    const logoHandler = (file) => {
        const errImg = checkImageFile(file);
        if(errImg) return toast.error(errImg)
        setLogoImg(file);
    };

    // cover image
    const coverHandler = (file) => {
        const errImg = checkImageFile(file);
        if(errImg) return toast.error(errImg)
        setCoverImg(file);
    };

    function onChangeHandlerInput(event) {
        const { value, name } = event.target
        setEmployerData({...employerData, [name]:value })
    }

    async function submitFormEmployerData(event) {
        event.preventDefault();
        try {
            setLoading(true)
            let urlLogoImg = data?.logo;
            if(data?.logo !== logoImg) {
                let extensionLogoFile = logoImg.name.substring(logoImg.name.lastIndexOf('.') + 1)
                const fileName = session.user.id + '-logo.' + extensionLogoFile;
                const imageEmployerRef = ref(storage, `employers/images/${fileName}`)
                await uploadBytes(imageEmployerRef, logoImg);
                urlLogoImg = await getDownloadURL(imageEmployerRef);
            }

            let urlCoverImg = data?.cover;
            if(data?.cover !== coverImg) {
                const extensionCoverFile = coverImg.name.substring(logoImg.name.lastIndexOf('.') + 1)
                const fileName = session.user.id + '-cover.' + extensionCoverFile;
                const imageEmployerRef = ref(storage, `employers/images/${fileName}`)
                await uploadBytes(imageEmployerRef, coverImg);
                urlCoverImg = await getDownloadURL(imageEmployerRef);
            }

            // Set img url to form employer data
            const body = {...employerData, logo: urlLogoImg, cover: urlCoverImg, userId: session.user.id};
            console.log("body - ", body)
            const updateType = data ? 'profile' : 'create'
            const { data: res } = await axios.post("/api/employers/profile/update", body, {
                headers: { updateType: updateType }
            })
            setLoading(false);
            toast.success(
                <>
                {res.msg}
                <br/>
                <Link className="text-light fw-bold" href={`/employers/${data ? res?.updateEmployer.id : res?.createEmployer.id}`}>
                    Click here to Employer profile
                </Link>
                </>
            );
            await sessionUpdate()
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
        <div className="widget-content">
            <div className="uploading-outer">
                <div className="uploadButton">
                    {
                        (logoImg !== "" || data?.logo) &&
                        <img src={data?.logo || URL.createObjectURL(logoImg)} alt="logo-img" />
                    }
                    <input
                        className="uploadButton-input"
                        type="file"
                        name="attachments[]"
                        accept="image/*"
                        id="upload"
                        onChange={(e) => logoHandler(e.target.files[0])}
                    />
                    <label
                        className="uploadButton-button ripple-effect"
                        htmlFor="upload"
                    >
                        {logoImg !== "" ? logoImg?.name : t('browse_logo_img')}
                    </label>
                    <span className="uploadButton-file-name"></span>
                </div>
                <div className="text">
                    {t('browse_logo_text')}
                </div>
            </div>

            <div className="uploading-outer">
                <div className="uploadButton">
                    {
                        (coverImg !== "" || data?.cover) &&
                        <img src={data?.cover || URL.createObjectURL(coverImg)} alt="logo-img" />
                    }
                    <input
                        className="uploadButton-input"
                        type="file"
                        name="attachments[]"
                        accept="image/*, application/pdf"
                        id="upload_cover"
                        onChange={(e) => coverHandler(e.target.files[0])}
                    />
                    <label
                        className="uploadButton-button ripple-effect"
                        htmlFor="upload_cover"
                    >
                        {coverImg !== "" ? coverImg?.name : t('browse_cover_img')}
                    </label>
                    <span className="uploadButton-file-name"></span>
                </div>
                <div className="text">
                    {t('browse_cover_text')}
                </div>
            </div>
            <form className="default-form" onSubmit={submitFormEmployerData}>
                <div className="row">
                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('label_company_name')}</label>
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Buidlforce"
                            value={companyName}
                            onChange={(e) => onChangeHandlerInput(e)}
                            required
                        />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('label_email')}</label>
                        <input
                            type="text"
                            name="contactEmail"
                            placeholder="buidlforce@gmail.com"
                            value={contactEmail}
                            onChange={(e) => onChangeHandlerInput(e)}
                            required
                        />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('label_phone')}</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="0 123 456 7890"
                            value={phone}
                            onChange={(e) => onChangeHandlerInput(e)}
                        />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('label_website')}</label>
                        <input
                            type="text"
                            name="website"
                            placeholder="www.buidlforce.com"
                            onChange={(e) => onChangeHandlerInput(e)}
                            value={website}
                        />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('label_est_since')}</label>
                        <input
                            type="date"
                            name="founded"
                            onChange={(e) => onChangeHandlerInput(e)}
                            value={founded}
                            placeholder="06.04.2020"
                            required
                        />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('label_team_size')}</label>
                        <select className="chosen-single form-select"
                            required
                            onChange={(e) => onChangeHandlerInput(e)}
                            name="companySize"
                            value={companySize}
                        >
                            <option value={"0-50"}>0 - 50</option>
                            <option value={"100-200"}>100 - 200</option>
                            <option value={"300-500"}>300 - 500</option>
                            <option value={"500-1000"}>500 - 1000</option>
                            <option value={"2000+"}>2000+</option>
                        </select>
                    </div>

                    {/* <!-- Search Select --> */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('label_industry')}</label>
                        <input
                            type="text"
                            name="industry" 
                            value={industry}
                            onChange={(e) => onChangeHandlerInput(e)}
                            required
                        />
                    </div>

                    {/* <!-- About Company --> */}
                    <div className="form-group col-lg-12 col-md-12">
                        <label>{t('label_about_company')}</label>
                        <CKEditor
                            editor={ ClassicEditor }
                            data={about}
                            onChange={( event, editor ) => {
                                const data = editor.getData();
                                setEmployerData({...employerData, about: data})
                            }}
                        />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                        <button className="theme-btn btn-style-one" type="submit" disabled={loading}>
                            { 
                                loading 
                                ? <CircularProgress />
                                : (data && Object?.keys(data).length) > 0  
                                ? t('button_save')
                                : t('button_create')
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormInfoBox;

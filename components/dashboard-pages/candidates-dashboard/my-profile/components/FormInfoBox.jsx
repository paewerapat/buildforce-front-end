import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import jobPositions from "../../../../../data/jobPositions";
import languagesData from '../../../../../data/languages';
import specialismsType from '../../../../../data/specialisms';
import { storage } from "../../../../../lib/firebase";
import { checkImageFile } from "../../../../../utils/imageUpload";
import qulificationType from '../../../../../data/qualification'

const FormInfoBox = ({ data, t }) => {

  const { data: session, update: sessionUpdate } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [avatarImg, setAvatarImg] = useState(data ? data.avatar : null);
  const initialState = data
  ? {...data, specialisms: data.specialisms?.map((item) => {
      return { label: item, value: item }
    }),
    languages: data.languages?.map((item) => {
      return { label: item, value: item }
    })
  }
  : {
    fullName: '', jobPosition: 'Front-End Developer',  phone: '', email: '', 
    website: '', expectedSalary: 0, experience: 'New graduates', 
    age: 0, qualification: `Bachelor's degree`, languages: [''], 
    specialisms: [''], description: ''
  }
  const [candidateData, setCandidateData] = useState(initialState);
  const { 
    fullName, jobPosition, phone, email, website, experience, age, qualification, languages, specialisms, description, expectedSalary
  } = candidateData

  function onChangeInputHandler(event) {
    const { value, name } = event.target;
    setCandidateData({...candidateData, [name]:value })
  }

  const avatarHandler = (file) => {
    const errImg = checkImageFile(file);
    if(errImg) return toast.error(errImg)
    setAvatarImg(file);
  };

  async function submitFormCandidate(event) {
    event.preventDefault();
    try {
      setLoading(true)
      let urlAvatarImg = data ? data?.avatar : ""
      if (data === null) {
        const extensionFile = avatarImg.name.substring(avatarImg.name.lastIndexOf('.') + 1)
        let fileName = session.user.id + '-avatar.' + extensionFile;
        let imageCandidateRef = ref(storage, `candidates/images/${fileName}`)
        await uploadBytes(imageCandidateRef, avatarImg);
        urlAvatarImg = await getDownloadURL(imageCandidateRef);
      }

      const body = {...candidateData, 
        avatar: urlAvatarImg, id: data?.id,
        user: session.user.id,
        specialisms: candidateData.specialisms.map((item) => {
          return item.value
        }),
        languages: candidateData.languages.map((item) => {
          return item.value
        })
      }
      const updateType = data ? 'update' : 'create'
      const { data: response} = await axios.post('/api/candidates/profile/update', body, {
        headers: {
          updateType: updateType
        }
      })
      await sessionUpdate()
      toast.success(
        <>
        {response.msg}
        <br/>
        <Link className="text-light fw-bold" href={`/candidates/${data ? response.updateCandidate.id : response.createCandidate.id}`}>
            Click here to Candidate profile
        </Link>
        </>
      )
      setLoading(false)
      router.replace(router.asPath)
    } catch (err) {
      setLoading(false)
      console.log("[submitFormEmployerData-err] - ", err)
      toast.error(err?.response?.data?.msg || "Something wrong! Please try again.")
    }
  }

  useEffect(() => {
    setCandidateData(initialState)
  }, [data])

  return (
    <>
    <div className="uploading-outer">
      <div className="uploadButton">
          {
            (avatarImg !== null || data?.avatar) &&
            <img src={data?.avatar || avatarImg && URL.createObjectURL(avatarImg)} alt="avatar-img" />
          }
          <input
              className="uploadButton-input"
              type="file"
              name="attachments[]"
              accept="image/*"
              id="upload"
              onChange={(e) => avatarHandler(e.target.files[0])}
              />
          <label
              className="uploadButton-button ripple-effect"
              htmlFor="upload"
          >
              {avatarImg !== null ? avatarImg?.name : t('browse_avatar')}
          </label>
          <span className="uploadButton-file-name"></span>
      </div>
      <div className="text">
        {t('browse_avatar_text')}
      </div>
    </div>
    
    <form className="default-form" onSubmit={submitFormCandidate}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_full_name')}</label>
          <input type="text" name="fullName" value={fullName} onChange={(e) => onChangeInputHandler(e)} placeholder="Jerome" required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_job_position')}</label>
          <select className="chosen-single form-select" 
            name="jobPosition" value={jobPosition}
            onChange={(e) => onChangeInputHandler(e)}
            required
          >
            {
              jobPositions.map((item) => (
                <option value={item.value} key={item.id}>{item.label}</option>
              ))
            }
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_phone')}</label>
          <input
            type="text"
            name="phone"
            value={phone} 
            onChange={(e) => onChangeInputHandler(e)}
            placeholder="0 123 456 7890"
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_email')}</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => onChangeInputHandler(e)}
            placeholder="creativelayers"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_website')}</label>
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => onChangeInputHandler(e)}
            placeholder="www.jerome.com"
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_expected_salary')}($)</label>
          <input type="number" name="expectedSalary"
          value={expectedSalary}
          onChange={(e) => setCandidateData({...candidateData, expectedSalary: e.target.valueAsNumber})}
          required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_experience')}</label>
          <select className="chosen-single form-select"
            name="experience" value={experience}
            onChange={(e) => onChangeInputHandler(e)}
            required
          >
            <option value={0}>New graduates</option>
            <option value={1}>1 year+</option>
            <option value={2}>2 years+</option>
            <option value={3}>3 years+</option>
            <option value={5}>5 years+</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_age')}</label>
          <input type="number" required
            name="age" value={age} onChange={(e) => setCandidateData({...candidateData, age: e.target.valueAsNumber})}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_qualification')}</label>
          <select className="chosen-single form-select"
            name="qualification" value={qualification}
            onChange={(e) => onChangeInputHandler(e)}
            required
          >
            <option value={""}>Select</option>
            {
              qulificationType.map(item => (
                <option key={item.id} value={item.value}>{item.label}</option>
              ))
            }
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_languages')}</label>
          <Select
            defaultValue={languages}
            isMulti
            name="colors"
            options={languagesData}
            onChange={(e) => setCandidateData({...candidateData, languages: e.map((item) => {
                return { value: item.value, label: item.value}
              })
            })}
            className="basic-multi-select"
            classNamePrefix="select"
            required
          />
        </div>

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_specialisms')}</label>
          <Select
            defaultValue={specialisms}
            isMulti
            required
            name="colors"
            options={specialismsType}
            onChange={(e) => setCandidateData({...candidateData, specialisms: e.map((item) => {
                return { value: item.value, label: item.value}
              })
            })}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>{t('label_description')}</label>
          <CKEditor
            editor={ ClassicEditor }
            data={description}
            onChange={( event, editor ) => {
                const data = editor.getData();
                setCandidateData({...candidateData, description: data})
            }}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one" disabled={loading}>
            { 
              loading 
              ? <CircularProgress />
              : data 
              ? t('button_save')
              : t('button_create')
            }
          </button>
        </div>
      </div>
    </form>
    </>
  );
};

export default FormInfoBox;

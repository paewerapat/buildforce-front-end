import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CircularProgress, Link } from "@mui/material";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import { toast } from "react-toastify";
import jobPositions from "../../../../../data/jobPositions";
import specialismsType from '../../../../../data/specialisms';
import { storage } from "../../../../../lib/firebase";
import NoCandidateProfile from "../../NoCandidateProfile";
import Awards from "./Awards";
import Education from "./Education";
import Experiences from "./Experiences";

const Index = ({ data, resume, t }) => {
  
  const router = useRouter();
  const [files, setFiles] = useState(resume?.cv ? [resume.cv] : [])
  const [loading, setLoading] = useState(false);
  const [addEducation, setAddEducation] = useState(false);
  const [addExperience, setAddExperience] = useState(false);
  const [addAwards, setAddAwards] = useState(false)

  // Award Data & State
  const initialAwardState = resume?.awards?.length > 0 
  ? resume.awards
  : {
    awardTitle: '', awardYear: '', awardDescription: '', awardProject: '',
  }
  const [awardData, setAwardData] = useState(initialAwardState);
  const { awardTitle, awardYear, awardDescription, awardProject } = awardData

  // Experience Data & State
  const initialExperienceState = resume?.experience?.length > 0 
  ? resume.experience
  : {
    jobPosition: jobPositions[0].value, companyName: '', experienceYear: '', experienceDescription: ''
  }
  const [experienceData, setExperienceData] = useState(initialExperienceState)
  const { jobPosition, companyName, experienceYear, experienceDescription } = experienceData

  // Education Data & State
  const initialEducationState = resume?.education?.length > 0 
  ? resume.education
  : {
    academicFields:  '', college: '', educationYear: '', educationDescription: ''
  }
  const [educationData, setEducationData] = useState(initialEducationState)
  const { academicFields, college, educationYear, educationDescription } = educationData

  // Global State Resume
  const initialState = resume ? {...resume, specialisms: resume.specialisms?.map((item) => {
    return { value: item, label: item}
  })} : {
    cv: data?.cv , description: '', education: [], experience: [], awards: [], specialisms: specialismsType[0].value, portfolio: []
  }
  const [resumeData, setResumeData] = useState(initialState)
  const { cv, description, education, experience, awards, specialisms } = resumeData;

  function onChangeInputEducationHandler(event) {
    const { name, value } = event.target;
    setEducationData({...educationData, [name]:value})
  }

  function onChangeInputExperienceHandler(event) {
    const { name, value } = event.target;
    setExperienceData({...experienceData, [name]:value})
  }

  function onChangeInputAwardHandler(event) {
    const { name, value } = event.target;
    setAwardData({...awardData, [name]:value})
  }

  function addEducationHandler() {
    if(educationData?.id) {
      const findIndex = resumeData.education.findIndex(obj => obj.id === educationData.id)
      resumeData.education[findIndex] = educationData
    } else {
      setResumeData({...resumeData, education: education.concat(
        {...educationData, id: Date.now().toString()}
      )})
    }
    setAddEducation(false)
  }

  function addExperienceHandler() {
    if(experienceData?.id) {
      const findIndex = resumeData.experience.findIndex(obj => obj.id === experienceData.id)
      resumeData.experience[findIndex] = experienceData
    }
    else setResumeData({...resumeData, experience: experience.concat(
      {...experienceData, id: Date.now().toString()}
    )})
    setAddExperience(false)
  }

  function addAwardHandler() {
    if(awardData?.id) {
      const findIndex = resumeData.awards.findIndex(obj => obj.id === awardData.id)
      resumeData.awards[findIndex] = awardData
    }
    else setResumeData({...resumeData, awards: awards.concat(
      {...awardData, id: Date.now().toString()}
    )})
    setAddAwards(false)
  }

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
        setFiles(previousFiles => [
            ...acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
            )
        ])
    }

    if (rejectedFiles?.length) {
        console.log("rejectedFiles - ", rejectedFiles)
        toast.warning("Invalid file extension")
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
        'image/*': [],
        "application/pdf": ['.pdf'],
        "application/msword": ['.docx', '.doc'],
    },
    maxSize: 1000 * 10000, // 10mb
    maxFiles: 1,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = async name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const submitResumehandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const extensionFile = files[0].name.substring(files[0].name.lastIndexOf('.') +1 )
      const fileName = data.id + '-portfolio.' + extensionFile;
      const fileRef = ref(storage, `candidates/portfolio/${fileName}`)
      await uploadBytes(fileRef, files[0]);
      const urlFile = await getDownloadURL(fileRef);

      const updateType = resume?.id ? 'update' : 'create';
      const body = { ...resumeData, id: resume?.id, 
        candidate: data.id, 
        portfolio: { url: urlFile, name: fileName },
        specialisms: resumeData.specialisms.map((item) => item.value)
      };
      const { data: res } = await axios.post('/api/candidates/resume/update', body, {
          headers: {
              updateType
          }
      })
      setLoading(false);
      router.push(`/candidates-dashboard/my-resume?success=${res.msg}`);
    } catch (err) {
        setLoading(false)
        console.log("[CvUploader-err] - ", err)
        toast.error(err?.response?.data?.msg || "Something wrong! Please try again.")
    }
  };

  useEffect(() => {
    setResumeData(initialState)
    setFiles(resume?.cv ? [resume.cv] : [])
  }, [resume, data])

  if(!data) return <NoCandidateProfile />

  return (
    <form className="default-form" onSubmit={submitResumehandler}>
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_select_cv')}</label>
          <select className="chosen-single form-select" 
            value={cv} name="cv" 
            onChange={(e) => setResumeData({...resumeData, cv: JSON.parse(e.target.value)})}
          >
            <option value={JSON.stringify(data?.cv)}>{data?.cv?.name}</option>
          </select>
          <Link className="row" href="/candidates-dashboard/cv-manager">
            <small className="text-end">{t('small_no_cv')}</small>
          </Link>
        </div>
        {/* <!-- Input --> */}

        <div className="form-group col-lg-12 col-md-12">
          <label>{t('label_description')}</label>
          <CKEditor
            editor={ ClassicEditor }
            data={description}
            onChange={( event, editor ) => {
                const data = editor.getData();
                setResumeData({...resumeData, description: data})
            }}
          />
        </div>
        {/* <!-- About Company --> */}

        <div className="form-group col-lg-12 col-md-12">
          <div className="resume-outer">
            <div className="upper-title">
              <h4>{t('label_education')}</h4>
              <button type="button" className="add-info-btn" onClick={() => setAddEducation(!addEducation)}>
                {
                  addEducation
                  ? <>
                  <span className="icon flaticon-arrows"></span> {t('label_hide_education')}
                  </>
                  : <>
                  <span className="icon flaticon-plus"></span> {t('label_add_education')}
                  </>
                }
              </button>
            </div>
            {
              addEducation &&
              <form className="row align-items-center mb-3">
                <div className="form-group col-lg-4 col-md-6">
                  <label>label_academic_fields</label>
                  <input placeholder="Business information system" type="text" 
                    name="academicFields" value={academicFields} onChange={(e) => onChangeInputEducationHandler(e)} 
                  />
                </div>
                <div className="form-group col-lg-4 col-md-6">
                  <label htmlFor="">{t('label_college')}</label>
                  <input placeholder="Bangkok University" type="text" 
                    name="college" value={college} onChange={(e) => onChangeInputEducationHandler(e)} 
                  />
                </div>
                <div className="form-group col-lg-4 col-md-6">
                  <label htmlFor="">{t('Year')}</label>
                  <input placeholder="2022 - 2023" type="text" 
                    name="educationYear" value={educationYear} onChange={(e) => onChangeInputEducationHandler(e)} 
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="">{t('label_description')}</label>
                  <CKEditor
                    editor={ ClassicEditor }
                    data={educationDescription}
                    onChange={( event, editor ) => {
                        const data = editor.getData();
                        setEducationData({...educationData, educationDescription: data})
                    }}
                  />
                </div>
                <button className="theme-btn btn-style-three" onClick={addEducationHandler} type="button">
                  {t('button_save')}
                </button>
              </form>
            }
            {
              resumeData?.education?.map((item, index) => (
                <Education key={index} data={item} index={index + 1} 
                  setEducationData={setEducationData} 
                  setAddEducation={setAddEducation} 
                  setResumeData={setResumeData}
                  resumeData={resumeData}
                />
              ))
            }
          </div>


          {/* <!-- Resume / Education --> */}
          <div className="resume-outer theme-blue">
            <div className="upper-title">
              <h4>{t('label_work_and_experience')}</h4>
              <button type="button" className="add-info-btn" onClick={() => setAddExperience(true)}>
                <span className="icon flaticon-plus"></span> {t('label_add_work')}
              </button>
            </div>
            {
              addExperience &&
              <form className="row align-items-center">
                <div className="form-group col-lg-4 col-md-6">
                  <label htmlFor="">{t('label_job_title')}</label>
                  <select className="chosen-single form-select" 
                    name="jobPosition" value={jobPosition}
                    onChange={(e) => onChangeInputExperienceHandler(e)}
                    required
                  >
                    {
                      jobPositions.map((item) => (
                        <option value={item.value} key={item.id}>{item.label}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-group col-lg-4 col-md-6">
                  <label htmlFor="">{t('label_company')}</label>
                  <input placeholder="Netflix" type="text" 
                    name="companyName" value={companyName} onChange={(e) => onChangeInputExperienceHandler(e)} 
                  />
                </div>
                <div className="form-group col-lg-4 col-md-6">
                  <label htmlFor="">{t('label_year')}</label>
                  <input placeholder="2019 - 2021" type="text" 
                    name="experienceYear" value={experienceYear} onChange={(e) => onChangeInputExperienceHandler(e)} 
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="">{t('label_description')}</label>
                  <CKEditor
                    editor={ ClassicEditor }
                    data={experienceDescription}
                    onChange={( event, editor ) => {
                        const data = editor.getData();
                        setExperienceData({...experienceData, experienceDescription: data})
                    }}
                  />
                </div>
                <button className="theme-btn btn-style-three" onClick={addExperienceHandler} type="button">Save</button>
              </form>
            }
            {
              resumeData?.experience?.map((item, index) => (
                <Experiences key={index} index={index + 1} data={item} 
                  setExperienceData={setExperienceData} 
                  setAddExperience={setAddExperience} 
                  setResumeData={setResumeData}
                  resumeData={resumeData}
                />
              ))
            }
          </div>
          {/* <!-- Resume / Work & Experience --> */}

          {/* <!--  education and word-experiences --> */}
          <div className="uploading-outer">
            <div 
              {
                ...getRootProps({
                    className: 'uploadButton'
                })
              }
            >
              <input
                {
                  ...getInputProps({
                      name: 'file',
                      className: 'uploadButton-input',
                      accept: ".doc,.docx,.xml,application/msword,application/pdf, image/*"
                  })
                }
              />
              <label className="uploadButton-button ripple-effect" htmlFor="upload">
                {resume.cv ? t('label_upload_cv_change') : t('label_upload_cv_add')}
              <small className="text-muted">
                {t('label_upload_cv_text')}
              </small>
              </label>
              <span className="uploadButton-file-name"></span>
            </div>

            <div className="files-outer">
            {
              files.length > 0 &&
              files?.map((file, i) => (
                <div key={i} className="file-edit-box">
                  <span className="title">{file.name}</span>
                  <div className="edit-btns">
                    <button type="button" onClick={() => window.open(file.url)}>
                      <span className="la la-download"></span>
                    </button>
                    <button type="button" onClick={() => removeFile(file.name)}>
                      <span className="la la-trash"></span>
                    </button>
                  </div>
                </div>
              ))
            }
            </div>
          </div>
          
          {/* <!-- Resume / Awards --> */}
          <div className="resume-outer theme-yellow">
            <div className="upper-title">
              <h4>{t('label_awards')}</h4>
              <button className="add-info-btn" type="button" onClick={() => setAddAwards(true)}>
                <span className="icon flaticon-plus"></span> {t('label_add_awards')}
              </button>
            </div>
            {
              addAwards &&
              <form className="row align-items-center">
                <div className="form-group col-lg-4 col-md-6">
                  <label htmlFor="">{t('label_title')}</label>
                  <input placeholder="Perfect Attendance Programs" type="text" 
                    name="awardTitle" value={awardTitle} onChange={(e) => onChangeInputAwardHandler(e)} 
                  />
                </div>
                <div className="form-group col-lg-4 col-md-6">
                  <label htmlFor="">{t('label_project')}</label>
                  <input placeholder="Burapharux Singing Contest" type="text" 
                    name="awardProject" value={awardProject} onChange={(e) => onChangeInputAwardHandler(e)} 
                  />
                </div>
                <div className="form-group col-lg-4 col-md-6">
                  <label htmlFor="">{t('label_year')}</label>
                  <input placeholder="2019 - 2021" type="text" 
                    name="awardYear" value={awardYear} onChange={(e) => onChangeInputAwardHandler(e)} 
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="">{t('label_description')}</label>
                  <CKEditor
                    editor={ ClassicEditor }
                    data={awardDescription}
                    onChange={( event, editor ) => {
                        const data = editor.getData();
                        setAwardData({...awardData, awardDescription: data})
                    }}
                  />
                </div>
                <button className="theme-btn btn-style-three" onClick={addAwardHandler} type="button">
                  {t('button_save')}
                </button>
              </form>
            }
            {
              resumeData?.awards?.map((item, index) => (
                <Awards data={item} key={index} index={index + 1} 
                  setAwardData={setAwardData} 
                  setAddAwards={setAddAwards} 
                  setResumeData={setResumeData}
                  resumeData={resumeData}
                />
              ))
            }
            </div>
          {/* <!-- End more portfolio upload --> */}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_specialisms')}</label>
          <Select
            value={specialisms}
            isMulti
            required
            name="colors"
            options={specialismsType}
            onChange={(e) => setResumeData({...resumeData, specialisms: e.map((item) => {
                return item
              })})
            }
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        {/* <!-- Multi Selectbox --> */}

        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one" disabled={loading}>
            {
              loading 
              ? <CircularProgress />
              : t('button_save')
            }
          </button>
        </div>
        {/* <!-- Input --> */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default Index;

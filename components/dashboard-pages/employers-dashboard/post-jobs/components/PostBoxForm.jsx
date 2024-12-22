import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { CircularProgress, Switch } from "@mui/material";
import axios from "axios";
import { Country, State } from "country-state-city";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import employmentTypes from "../../../../../data/employmentTypes";
import jobPositionsTypes from "../../../../../data/jobPositions";
import specialismsTypes from "../../../../../data/specialisms";
import workplaceModesTypes from "../../../../../data/workplaceModesTypes";
import NoEmployerProfile from "../../NoEmployerProfile";
import qualificationType from '../../../../../data/qualification';
import { useTranslation } from 'react-i18next';

const PostBoxForm = ({ data, edit }) => {

  const { t } = useTranslation('dashboard/employer/post_job')
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [countryData, setCountry] = useState({value: '', isoCode: ''});
  const initialState = data 
  ? {...data, specialisms: data.specialisms.map((item) => {
      return { label: item, value: item }
    }), expiredDate: toDatetimeLocal(data.expiredDate)
  }
  : {
    jobTitle: "", specialisms: [], description: "", workplaceModes: "Remote", employmentType: "Full-time", 
    experience: 0, qualification: "Bachelor's degree", expiredDate: "", 
    display: true, salary: Number, jobPosition: jobPositionsTypes[0].value, contact: {
      country: '', city: '', address:''
    }
  }

  function toDatetimeLocal(isoString) {
    let date = new Date(isoString);
    let offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));

    const [fullDate, time] = date.toISOString().split("T");
    const shortTime = time.substring(0, 5); // Drop the seconds and millisecondas;

    return `${fullDate}T${shortTime}`;
  }

  const [formData, setFormData] = useState(initialState)
  const { 
    jobTitle, specialisms, description, experience, qualification, display, 
    workplaceModes, employmentType, jobPosition, salary, contact
  } = formData;
  const { country, city, address } = contact;

  const allCountries = Country.getAllCountries().map(value => ({
    value: value.isoCode, label: value.name
  }))
  const stateByCountries = countryData.value !== "" ? State.getStatesOfCountry(countryData.isoCode).map(value => ({
    value: value.name, label: value.name
  })) : ''

  function onChangeHandler(event) {
    const { value, name } = event.target;
    setFormData({...formData, [name]:value})
  }

  function expiredDateHandler(days) {
    return new Date(Date.now() + ((days || 7) * 24 * 60 * 60 * 1000))
  }

  async function submitPost(event) {
    event.preventDefault();
    if (edit && id) {
      try {
        setLoading(true)
        const body = {...formData, id: id, specialisms: 
          formData.specialisms.map((item) => item.value)
        };
        const { data: response } = await axios.post("/api/employers/job/update", body);
        toast.success(
          <>
          {response.msg}
          <br/>
          <Link className="text-light fw-bold" href={`/job/${response.updateJob.id}`}>
              Click here to Job posts
          </Link>
          </>
        )
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log("[submitFormEmployerData-err] - ", err)
        toast.error(err?.response?.data?.msg || "Something wrong! Please try again.")
      }
    } else {
      try {
        setLoading(true)
        // Set expiredDate to after 7 days from now
        const body = {...formData, employer: session?.user?.employerInfo?.id, expiredDate: expiredDateHandler(7)}
        const { data: response } = await axios.post("/api/employers/job/create", body);
        setLoading(false);
        toast.success(
          <>
          {response.msg}
          <br/>
          <Link className="text-light fw-bold" href={`/job/${response.createJob.id}`}>
              Click here to Job posts
          </Link>
          </>
        )
        return setFormData(initialState);
      } catch (err) {
        setLoading(false)
        console.log("[submitFormEmployerData-err] - ", err)
        toast.error(err?.response?.data?.msg || "Something wrong! Please try again.")
      }
    }
  }

  if(!session?.user?.employerInfo?.id) return <NoEmployerProfile />

  return (
    <form className="default-form" onSubmit={submitPost}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>{t('label_job_title')}</label>
          <input type="text" 
            value={jobTitle} 
            name="jobTitle" 
            placeholder="Title"
            onChange={(e) => onChangeHandler(e)}
            required
          />
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>{t('label_job_description')}</label>
          {/* <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea> */}
          <CKEditor
            editor={ ClassicEditor }
            data={description}
            onChange={( event, editor ) => {
              const data = editor.getData();
              setFormData({...formData, description: data})
            }}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_job_position')}</label>
          <select className="chosen-single form-select" 
            name="jobPosition" value={jobPosition}
            onChange={(e) => onChangeHandler(e)}
            required
          >
            {
              jobPositionsTypes.map((item) => (
                <option value={item.value} key={item.id}>{item.label}</option>
              ))
            }
          </select>
        </div>

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_specialisms')}</label>
          <Select
            defaultValue={specialisms}
            isMulti
            required
            name="colors"
            options={specialismsTypes}
            onChange={(e) => setFormData({...formData, specialisms: e.map((item) => {
                return item.value
              })})
            }
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_workplace_mode')}</label>
          <select className="chosen-single form-select" 
            name="workplaceModes" value={workplaceModes}
            onChange={(e) => onChangeHandler(e)}
            required
          >
            {
              workplaceModesTypes.map((item) => (
                <option value={item.value} key={item.id}>{item.label}</option>
              ))
            }
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_employment_type')}</label>
          <select className="chosen-single form-select" 
            name="employmentType" value={employmentType}
            onChange={(e) => onChangeHandler(e)}
            required
          >
            {
              employmentTypes.map((item) => (
                <option value={item.value} key={item.id}>{item.label}</option>
              ))
            }
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_offer_salary')} $</label>
              <input type="number" name="salary"
              value={salary}
              onChange={(e) => setFormData({...formData, salary: e.target.valueAsNumber})}
              required
            />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_work_experience')}</label>
          <select className="chosen-single form-select"
            name="experience" value={experience}
            onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value)})}
            required
          >
            <option>Select</option>
            <option value={0}>New graduates</option>
            <option value={1}>1 year</option>
            <option value={2}>2 years</option>
            <option value={3}>3 years</option>
            <option value={5}>5 years</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_qualification')}</label>
          <select className="chosen-single form-select"
            name="qualification" value={qualification}
            onChange={(e) => onChangeHandler(e)}
            required
          >
            <option value={""}>Select</option>
            {
              qualificationType.map(item => (
                <option key={item.id} value={item.value}>{item.label}</option>
              ))
            }
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_address')}</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setFormData({...formData, contact: {
              ...formData.contact, address: e.target.value
            }})}
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>{t('label_country')}</label>
          <Select
            options={allCountries}
            defaultValue={country !== "" ? { label: country, value: country } : ""}
            onInputChange={() => setErrorState(false)}
            onChange={(e) => setCountry({isoCode: e.value, value: e.label})}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
            <label>{t('label_city')}</label>
            <Select
              defaultValue={city !== "" ? { label: city, value: city } : ""}
              options={countryData.value ? stateByCountries : []}
              onFocus={() => countryData?.value ? '' : setErrorState("Please select country first")}
              onChange={(e) => setFormData({...formData, contact: {
                country: countryData.value, city: e.value
              } })}
            />
            {
              errorState && <small className="text-danger">{"* " + errorState}</small>
            }
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="">{t('label_status')}</label>
          <Switch name="display" value={display} onChange={(e) => setFormData({...formData, display: e.target.checked})} defaultChecked />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one">
          { 
            loading 
            ? <CircularProgress />
            : edit
            ? t('button_save')
            : t('button_post')
          }
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;

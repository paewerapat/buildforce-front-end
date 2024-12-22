import { useRouter } from "next/router";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addExperience, addJobPosition, addJobTitle } from "../../../app/features/filter/jobFilterSlice";
import experiences from "../../../data/experiences";
import jobPositions from '../../../data/jobPositions';

const SearchForm3 = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const jobTitle = useRef("");
  const experience = useRef("");
  const jobPosition = useRef("");

  function onChangeJobTitleHandler(value) {
    dispatch(addJobTitle(value))
    jobTitle.current = value;
  }

  function onChangeExperienceHandler(value) {
    dispatch(addExperience(value))
    experience.current = value;
  }

  function onChangeJobPositionHandler(value) {
    dispatch(addJobPosition(value))
    jobPosition.current = value;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("jobPosition - ", jobPosition.current)
    router.push(`/job?title=${jobTitle.current}${typeof jobPosition.current !== "object" ? `&position=${jobPosition.current}` : ''}${typeof experience.current !== "object" ? `&experience=${experience.current}` : ''}&options=true`)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Form Group --> */}
        <div className="form-group col-lg-4 col-md-12 col-sm-12">
          <span className="icon flaticon-search-1"></span>
          <input
            type="text"
            name="field_name"
            minLength={3}
            placeholder="Job title keywords"
            onChange={(e) => onChangeJobTitleHandler(e.target.value)}
            ref={jobTitle}
            required
          />
        </div>

        {/* <!-- Form Group --> */}
        <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
          <span className="icon flaticon-checked"></span>
          <select className="chosen-single form-select"
            onChange={(e) => onChangeExperienceHandler(e.target.value)}
            ref={experience}
            required
          >
            <option defaultValue="">Experience</option>
            {
              experiences.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.label}
                </option>
              ))
            }
          </select>
        </div>

        {/* <!-- Form Group --> */}
        <div className="form-group col-lg-3 col-md-12 col-sm-12 category">
          <span className="icon flaticon-briefcase"></span>
          <select className="chosen-single form-select"
            onChange={(e) => onChangeJobPositionHandler(e.target.value)}
            ref={jobPosition}
            required
          >
            <option defaultValue="">Job Type</option>
            {
              jobPositions.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.label}
                </option>
              ))
            }
          </select>
        </div>

        {/* <!-- Form Group --> */}
        <div className="form-group col-lg-2 col-md-12 col-sm-12 text-right">
          <button
            type="submit"
            className="theme-btn btn-style-one"
          >
            Find Jobs
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm3;

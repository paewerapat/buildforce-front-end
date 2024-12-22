import parse from 'html-react-parser';

const Experiences = ({ index, data, setExperienceData, setAddExperience, setResumeData, resumeData }) => {

  function editDataHandler() {
    setExperienceData(data)
    setAddExperience(true)
  }

  function deleteDataHandler() {
    setResumeData({...resumeData, experience: resumeData.experience.filter((item, id) => {
      if(!data?.id) return item.id
      else return item.id !== data.id
    })})
    setExperienceData({})
  }

  return (
      <div className="resume-block">
        <div className="inner">
          <span className="name">{index}</span>
          <div className="title-box">
            <div className="info-box">
              <h3>{data.jobPosition}</h3>
              <span>{data.companyName}</span>
            </div>
            <div className="edit-box">
              <span className="year">{data.experienceYear}</span>
              <div className="edit-btns">
                <button type='button' onClick={() => editDataHandler()}>
                  <span className="la la-pencil"></span>
                </button>
                <button type='button' onClick={() => deleteDataHandler()}>
                  <span className="la la-trash"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="text">
            {parse(data.experienceDescription)}
          </div>
        </div>
      </div>
  );
};

export default Experiences;

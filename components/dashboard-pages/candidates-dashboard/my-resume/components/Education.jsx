import parse from 'html-react-parser';

const Education = ({ data, index, setEducationData, setAddEducation, setResumeData, resumeData }) => {

  function editDataHandler() {
    setEducationData(data)
    setAddEducation(true)
  }

  function deleteDataHandler() {
    setResumeData({...resumeData, education: resumeData.education.filter((item, id) => {
      if(!data?.id) return item.id !== undefined
      else return item.id !== data.id
    })})
    setEducationData({})
  }

  return (
    <div className="resume-block">
      <div className="inner">
        <span className="name">{index}</span>
        <div className="title-box">
          <div className="info-box">
            <h3>{data.academicFields}</h3>
            <span>{data.college}</span>
          </div>
          <div className="edit-box">
            <span className="year">{data.educationYear}</span>
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
          {parse(data.educationDescription)}
        </div>
      </div>
    </div>
  );
};

export default Education;

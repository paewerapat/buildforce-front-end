import parse from 'html-react-parser';

const Awards = ({ data, index, setAwardData, setAddAwards, setResumeData, resumeData }) => {

  function editDataHandler() {
    setAwardData(data)
    setAddAwards(true)
  }

  function deleteDataHandler() {
    setResumeData({...resumeData, awards: resumeData.awards.filter((item, id) => {
      if(!data?.id) return item.id
      else return item.id !== data.id
    })})
    setAwardData({})
  }

  return (
    <div className="resume-block">
      <div className="inner">
        <span className="name">{index}</span>
        <div className="title-box">
          <div className="info-box">
            <h3>{data.awardTitle}</h3>
            <span>{data.awardProject}</span>
          </div>
          <div className="edit-box">
            <span className="year">{data.awardYear}</span>
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
          {parse(data.awardDescription)}
        </div>
      </div>
    </div>
  );
};

export default Awards;

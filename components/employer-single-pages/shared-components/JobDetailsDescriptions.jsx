import parse from 'html-react-parser';

const JobDetailsDescriptions = ({ about, t }) => {
  return (
    <div className="job-detail">
      <h4 className='mb-3'>{t('About Company')}</h4>
      { about && parse(about)}
    </div>
  );
};

export default JobDetailsDescriptions;

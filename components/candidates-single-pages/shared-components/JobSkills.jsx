const JobSkills = ({ data }) => {
  return (
    <ul className="job-skills">
      {data?.map((data, i) => (
        <li key={i}>
          <a href="#">{data}</a>
        </li>
      ))}
    </ul>
  );
};

export default JobSkills;

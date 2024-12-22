const Social = ({ data }) => {
  return (
    <div className="social-links">
      {
        data?.facebook &&
        <a
          href={
            data.facebook.indexOf('://') === -1 
            ? 'https://' + data.facebook
            : data.facebook
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`fab fa-facebook-f`}></i>
        </a>
      }
      {
        data?.twitter &&
        <a
          href={
            data.twitter.indexOf('://') === -1 
            ? 'https://' + data.twitter
            : data.twitter
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`fab fa-twitter`}></i>
        </a>
      }
      {
        data?.linkedin &&
        <a
          href={
            data.linkedin.indexOf('://') === -1 
            ? 'https://' + data.linkedin
            : data.linkedin
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`fab fa-linkedin`}></i>
        </a>
      }
    </div>
  );
};

export default Social;

const Social = ({ social }) => {

  return (
    <div className="social-links">
      {
        social &&
        <>
        {
          social?.facebook &&
          <a
            href={
              social.facebook.indexOf('://') === -1 
              ? 'https://' + social.facebook
              : social.facebook
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`fab fa-facebook-f`}></i>
          </a>
        }
        {
          social?.twitter && 
          <a
            href={
              social.twitter.indexOf('://') === -1 
              ? 'https://' + social.twitter
              : social.twitter
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`fab fa-twitter`}></i>
          </a>
        }
        {
          social?.linkedin && 
          <a
            href={
              social.twitter.indexOf('://') === -1 
              ? 'https://' + social.twitter
              : social.twitter
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`fab fa-linkedin-in`}></i>
          </a>
        }
        </>
      }
    </div>
  );
};

export default Social;

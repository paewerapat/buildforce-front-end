import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from 'next-share';
import { useRouter } from 'next/router';

const SocialTwo = () => {
  
  const { asPath } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : '';

    const URL = `${origin}${asPath}`;

  return (
    <>
    <FacebookShareButton
      url={URL}
      quote={'Hello'}
      hashtag={'#nextshare'}
    >
      <span className='facebook'>
        <i className={`fab fa-facebook-f`}></i> Facebook
      </span>
    </FacebookShareButton>
    <TwitterShareButton
      url={URL}
    >
      <span
        className='twitter'
      >
        <i className={`fab fa-twitter`}></i> Twitter
      </span>
    </TwitterShareButton>
    <LinkedinShareButton
      url={URL}
    >
      <span
        className='linkedin'
      >
        <i className={`fab fa-linkedin`}></i> Linkedin
      </span>
    </LinkedinShareButton>
    </>
  );
};

export default SocialTwo;

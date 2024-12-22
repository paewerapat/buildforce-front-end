import { useSelector } from "react-redux";

const Notification = () => {

  const { recentNotify } = useSelector(state => state.candidateDashboard);

  return (
    <ul className="notification-list">
      {
        recentNotify?.map((item, index) => (
          <li key={item.id} className={index % 2 === 0 && 'success'}>
            <span className="icon flaticon-briefcase"></span>
            <strong>{item.user.companyName}</strong> {item.text}
            <span className="colored"> {item.content.slice(0, 30)}{item.content.length > 30 && '...'}</span>
          </li>
        ))
      }
      {/* End li */}
    </ul>
  );
};

export default Notification;

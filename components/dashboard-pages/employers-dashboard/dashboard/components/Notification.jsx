import { useSelector } from "react-redux";

const Notification = () => {

  const { recentNotify } = useSelector(state => state.employerDashboard)

  return (
    <ul className="notification-list">
      {
        recentNotify?.map((item, index) => (
          <li key={item.id} className={index % 2 === 0 && 'success'}>
            <span className="icon flaticon-briefcase"></span>
            <strong>{item.user.fullName}</strong> {item.text}
            <span className="colored"> {item.content}</span>
          </li>
        ))
      }
      {/* End li */}
    </ul>
  );
};

export default Notification;

import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonNotificationLoading() {
  return (
    <ul className="notification-list">

      <li className='success'>
        <span className="icon flaticon-briefcase"></span>
        <strong><Skeleton width={400} /></strong>
      </li>

      <li>
        <span className="icon flaticon-briefcase"></span>
        <strong><Skeleton width={400} /></strong>
      </li>

      <li className='success'>
        <span className="icon flaticon-briefcase"></span>
        <strong><Skeleton width={400} /></strong>
      </li>

      <li>
        <span className="icon flaticon-briefcase"></span>
        <strong><Skeleton width={400} /></strong>
      </li>

      {/* End li */}
    </ul>
  );
}

export default SkeletonNotificationLoading;

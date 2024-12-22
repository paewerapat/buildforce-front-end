import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllNotifyAction, isReadNotifyAction } from '../../../../../app/actions/notifyAction';
import Link from 'next/link'
import { useTranslation } from 'react-i18next';

const AlertDataTable = () => {

  const { t } = useTranslation('dashboard/employer/notifications')
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.notify)
  const { employerInfo } = useSelector(state => state.user)

  function updateNotificationHandler(id) {
    dispatch(isReadNotifyAction({id}))
  }

  function deleteAllNotificationHandler() {
    if(data.length === 0) return toast.error("Don't have data to delete")
    dispatch(deleteAllNotifyAction({id: employerInfo?.id}))
  }

  return (
    <div className="row align-items-center gap-2">
      {
        data?.map((item) => (
          <Link 
            href={item.url} 
            className={`col-12 text-dark card ${item.isRead ? 'bg-light' : ''}`}
            style={{height: 'auto'}} 
            key={item.id}
            onClick={() => updateNotificationHandler(item.id)}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className='d-flex align-items-center gap-2 fw-bold card-body'>
                <div className="profile d-flex align-items-center gap-2">
                  <img 
                    src={item.user?.avatar || item.user?.logo} 
                    alt="image-notify"
                    className='circle'
                    style={{height: '48px', width: '48px', borderRadius: '50%'}}
                  />
                  {item.user?.fullName || item.user?.companyName}
                </div>
                <div className="text">
                  {item.text + ' ' + item.content}
                </div>
              </div>
              <small>
                <i className='fa fa-clock'></i> {moment(item.createdAt).fromNow()}
              </small>
            </div>
          </Link>
        ))
      }
      <div className="col text-end ms-auto">
        <button type='button' className='btn btn-danger mb-1' onClick={deleteAllNotificationHandler}>
          <i className="fa fa-trash"></i> {t('button_clear_all')}
        </button>
      </div>
    </div>
  );
};

export default AlertDataTable;

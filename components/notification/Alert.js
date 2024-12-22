import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Toast from './Toast'
import { setDefaultAlert } from '../../app/features/alertSlice';
import Loading from './Loading';

function Alert() {

  const { alert } = useSelector(state => state)
  const dispatch = useDispatch();

  return (
    <>
    {alert?.loading && <Loading />}

    {
      alert?.error && 
      <Toast msg={{title: 'Error', body: alert.error, icon: 'la la-warning'}}
      handleShow={() => dispatch(setDefaultAlert())} 
      bgColor="bg-danger" />
    }

    {
      alert?.success &&
      <Toast msg={{title: 'Success', body: alert.success, icon: 'la la-check-circle' }} 
      handleShow={() => dispatch(setDefaultAlert())}
      bgColor="bg-success" />
    }

    {
      alert?.info &&
      <Toast msg={{title: 'Notification', body: alert.info, icon: 'la la-bell'}} 
      handleShow={() => dispatch(setDefaultAlert())}
      bgColor="bg-primary" />
    }
    </>
  )
}

export default Alert
import { toast } from 'react-toastify'
import axios from '../../lib/axios'
import { setLoadingState } from '../features/alertSlice'
import { deleteAllNotify, getMoreNotify, getNotify, isReadNotify } from '../features/notifySlice'

export const createNotifyAction = ({msg}) => async (dispatch) => {
    try {
        await axios.post('/api/notify/create', msg)
    } catch (err) {
        console.log("[createNotifyAction] err - ", err)
        toast.error(err.response.data.msg)
    }
}

export const getNotifyAction = ({ type, id, filter }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post(`/api/notify/${type}`, { id, filter })
        dispatch(getNotify(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        dispatch(setLoadingState(false))
        console.log("[getMoreNotifyAction] err - ", err)
    }
}

export const getMoreNotifyAction = ({type, page, id, filter}) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        const { data } = await axios.post(`/api/notify/${type}`, { page: page + 1, id, filter })
        dispatch(getMoreNotify(data))
        dispatch(setLoadingState(false))
    } catch (err) {
        dispatch(setLoadingState(false))
        console.log("[getMoreNotifyAction] err - ", err.response.data.msg)
    }
}

export const isReadNotifyAction = ({ id }) => async (dispatch) => {
    try {
        await axios.post('/api/notify/update', { id })
        dispatch(isReadNotify(id))
    } catch (err) {
        console.log("[isReadNotifyAction] err - ", err)
        toast.error(err.response.data.msg)
    }
}

export const deleteNotifyAction = ({ id }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        dispatch(deleteAllNotify())
        await axios.post('/api/notify/delete', { id: id })
        dispatch(setLoadingState(false))
    } catch (err) {
        dispatch(setLoadingState(false))
        console.log("[deleteNotifyAction] err - ", err)
        toast.error(err.response.data.msg)
    }
}

export const deleteAllNotifyAction = ({ id }) => async (dispatch) => {
    try {
        dispatch(setLoadingState(true))
        dispatch(deleteAllNotify())
        await axios.post('/api/notify/delete-all', { id: id })
        dispatch(setLoadingState(false))
    } catch (err) {
        dispatch(setLoadingState(false))
        console.log("[deleteAllNotifyAction] err - ", err)
        toast.error(err.response.data.msg)
    }
}
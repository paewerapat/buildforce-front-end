import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { storage } from "../../../../../lib/firebase";
import axios from "axios";
import { useRouter } from "next/router";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CircularProgress } from "@mui/material";
import NoCandidateProfile from "../../NoCandidateProfile";
import { useTranslation } from "react-i18next";

const CvUploader = ({ data }) => {

    const { t } = useTranslation('dashboard/candidate/cv_manager')
    const router = useRouter();
    const [files, setFiles] = useState(data?.cv?.url ? [data.cv] : [])
    const [loading, setLoading] = useState(false)
    const [rejected, setRejected] = useState([])

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...acceptedFiles.map(file =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ])
        }
    
        if (rejectedFiles?.length) {
            console.log("rejectedFiles - ", rejectedFiles)
            setRejected(rejectedFiles)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': [],
            "application/pdf": ['.pdf'],
            "application/msword": ['.docx', '.doc'],
        },
        maxSize: 1000 * 10000, // 10mb
        maxFiles: 1,
        onDrop
    })

    useEffect(() => {
        // Revoke the data uris to avoid memory leaks
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    useEffect(() => {
        setFiles(data?.cv?.url ? [data.cv] : [])
    }, [data])

    const removeFile = async name => {
        if(data.cv) {
            try {
                setLoading(true)
                const extensionFile = files[0].name.substring(files[0].name.lastIndexOf('.') +1 )
                const fileName = data.id + '-cv.' + extensionFile;
                const fileRef = ref(storage, `candidates/cv/${fileName}`)
                await deleteObject(fileRef)

                const updateType = 'cv';
                const body = { id: data.id, cv: {url: null, name: null} };
                await axios.post('/api/candidates/profile/update', body, {
                    headers: {
                        updateType
                    }
                })
                toast.success("Delete file successful")
                setLoading(false)
            } catch (err) {
                console.log('[CvUpload] err - ', err)
                toast.error(err || 'Something wrong! Please try again.')
                setLoading(false)
            }
        }
        setFiles(files => files.filter(file => file.name !== name))
    }

    async function downloadCV() {
        const fileRef = ref(storage, `candidates/cv/${data.cv.name}`)
        const getDownload = await getDownloadURL(fileRef)
        window.open(getDownload, "_self")
    }

    async function handleSubmitCV() {
        if(!files.length) return toast.warning("No file selected")
        try {
            setLoading(true);
            const extensionFile = files[0].name.substring(files[0].name.lastIndexOf('.') +1 )
            const fileName = data.id + '-cv.' + extensionFile;
            const fileRef = ref(storage, `candidates/cv/${fileName}`)
            await uploadBytes(fileRef, files[0]);
            const urlFile = await getDownloadURL(fileRef);

            console.log("urlFile - ", urlFile)
            const updateType = 'cv';
            const body = { id: data.id, cv: {url: urlFile, name: fileName} };
            const response = await axios.post('/api/candidates/profile/update', body, {
                headers: {
                    updateType
                }
            })
            setLoading(false);
            router.push(`/candidates-dashboard/cv-manager?success=${response.data.msg}`);
        } catch (err) {
            setLoading(false)
            console.log("[CvUploader-err] - ", err)
            toast.error(err?.response?.data?.msg || "Something wrong! Please try again.")
        }
    }

    if(!data) return <NoCandidateProfile />

    return (
        <form>
            {/* Start Upload resule */}
            <div
                {
                    ...getRootProps({
                        className: 'uploading-resume'
                    })
                }
            >
                <div className="uploadButton">
                    <input
                        {
                            ...getInputProps({
                                name: 'file',
                                className: 'uploadButton-input',
                                accept: ".doc,.docx,.xml,application/msword,application/pdf, image/*"
                            })
                        }
                    />
                    <label className="cv-uploadButton" htmlFor="upload">
                        {/* <span className="text-success">{data?.cv && 'You already have CV'}</span> */}
                        <span className="title">
                            {
                                data.cv
                                ? t('drag_and_drop_change')
                                : isDragActive ? (
                                    t('drag_and_drop_new')
                                ) : (
                                    t('drag_and_drop_click')
                                )
                            }
                        </span>
                        <span className="text">
                            {
                                t('drag_and_drop_text')
                            }
                        </span>
                        <span className="theme-btn btn-style-one">
                            {
                                t('drag_and_drop_button')
                            }
                        </span>
                        {
                            rejected.length > 0 && (
                                <p className="ui-danger mb-0">{rejected[0].errors[0].message}</p>
                            )
                        }
                    </label>
                    <span className="uploadButton-file-name"></span>
                </div>
            </div>
            {/* End upload-resume */}

            {/* Start resume Preview  */}
            <div className="files-outer">
                {files?.map((file, i) => (
                    <div key={i} className="file-edit-box">
                        <span className="title">{file.name}</span>
                        <div className="edit-btns">
                            <button type="button" onClick={() => downloadCV()}>
                                <span className="la la-download"></span>
                            </button>
                            <button type="button" onClick={() => removeFile(file.name)}>
                                <span className="la la-trash"></span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {
                files.length > 0 &&
                <button type="button" onClick={() => handleSubmitCV()} className="theme-btn btn-style-one" disabled={loading}>
                    { 
                        loading 
                        ? <CircularProgress />
                        : t("Save")
                    }
                </button>
            }
            {/* End resume Preview  */}
        </form>
    );
};

export default CvUploader;
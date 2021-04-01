import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState} from 'react';
import { storage ,database} from '../../firebase';
import { useAuth } from "../../context/AuthContext";
import { ROOT } from './AddFolderButton';
import {v4 as uuidV4} from 'uuid'
import ReactDom from 'react-dom';
import { Toast, ToastBody,ProgressBar } from 'react-bootstrap';
export default function AddFileButton( {currentFolder} ) {
    const {currentUser} = useAuth()
    const [uploading,setUploading] = useState([]);
  
    function handleUpload(e)
    {
        const file = e.target.files[0]
        
        if(currentFolder == null || file == null)
        return 
        const id = uuidV4()
        setUploading(prevuploading=> [
        
          ...prevuploading,
          {id : id, name : file.name,progress : 0, error : false}
        ])
       
    
         const filePath = 
         currentFolder === ROOT
           ? `${currentFolder.path.join("/")}/${file.name}`
           : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`
          
           console.log(filePath)
       const uploadTask = storage
         .ref(`/files/${currentUser.uid}/${filePath}`)
         .put(file)

        uploadTask.on('state_changed', snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes
            setUploading(prevUploading => {
              return prevUploading.map(uploadFile => {
                if (uploadFile.id === id) {
                  return { ...uploadFile, progress: progress }
                }
    
                return uploadFile
              })
            })
          },
          () => {
            setUploading(prevUploading => {
              return prevUploading.map(uploadFile => {
                if (uploadFile.id === id) {
                  return { ...uploadFile, error: true }
                }
                return uploadFile
              })
            })
          },
          () => {
            setUploading(prevUploading => {
              return prevUploading.filter(uploadFile => {
                return uploadFile.id !== id
              })
            })
    
            uploadTask.snapshot.ref.getDownloadURL().then(url =>{
                console.log("[uploaded]")
                database.files.where("name","==",file.name)
                .where("userId","==",currentUser.uid)
                .where("folderId","==",currentFolder.id)
                .get()
                .then(existingFiles =>{
                    const exists = existingFiles.docs[0];
                   if(exists)
                   exists.ref.update({url : url})
                   else{
                    database.files.add({
                        url : url,
                        name: file.name,
                        folderId: currentFolder.id,
                        userId: currentUser.uid,
                       
                        createdAt: database.getCurrentTimestamp(), 
                       })
                   }

                })
              
            })
        })
    }
  return (
    <>
    <label className= "btn btn-outline-success btn-sm m-0 mr-2">
        <FontAwesomeIcon icon ={faFileUpload}/>
        <input type = "file" onChange = {handleUpload} style = {
            {
                opactiy : 0,
                position : "absolute",
                left : "-99999px"
            }
        }/>
    </label>
    {/* portals */}
    {uploading.length > 0 && ReactDom.createPortal(
        <div
        style = {{
            position : 'absolute',
            bottom : '1rem',
            right : '1rem',
            maxWidth : '150px',
        }}>
            {uploading.map(file =>(
                    <Toast key ={file.id} onClose={() => {
                        setUploading(prevUploading => {
                          return prevUploading.filter(uploadFile => {
                            return uploadFile.id !== file.id
                          })
                        })
                      }}>
                        <Toast.Header  className = "text -truncate w-150 d-block"
                            closeButton = {file.error} >
                            {file.name}

                        </Toast.Header>
                        <ToastBody>
                        <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "Error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                        </ToastBody>
                    </Toast>

    ))}
        </div>,document.body
    )}
    </>
  );
}

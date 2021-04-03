import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Tooltip,OverlayTrigger, Button} from 'react-bootstrap'
import React from 'react';

import { database} from '../../firebase';

export default function File({file}) {
    // console.log(file)
   
    function deleteHandler (file)
    { 
      
      database.files.where("userId","==",file.userId)
      .where("name","==",file.name)
      .get()
      .then(existingFiles =>{
          const exists = existingFiles.docs[0];
      
         if(exists )
         {  
           exists.ref.delete()
           console.log("[Deleted]")
           
        }
         else{
         console.log(["File not on database"])
        

        }

        })
       
      }
const renderTooltip = ({file}) => (
  <Tooltip id="button-tooltip"  {...file}  >
    {file.name}
    <Button  className = "btn btn-outline-dark text-truncate w-100"  
    variant = "danger" onClick = {()=>{deleteHandler(file)}} >
      Delete this</Button>
  </Tooltip>
)
  return (
    <>
   
     <OverlayTrigger
    placement="bottom"
    delay={{ show: 250, hide: 800 }}
    overlay={renderTooltip({file})}
  >
     <div>
    <a  href = {file.url} 
    
    rel="noreferrer"
    target ="_blank"
    className = "btn btn-outline-dark text-truncate w-100">
        <FontAwesomeIcon icon ={faFile} className = "mr-2"/>
        {file.name}
    </a>
    
    </div>
    </OverlayTrigger>
  
    </>
  );
}

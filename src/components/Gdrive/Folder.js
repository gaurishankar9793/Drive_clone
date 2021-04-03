import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import {Tooltip,OverlayTrigger} from 'react-bootstrap'
import { database} from '../../firebase';
export default function Folder({ folder }) {
  function deleteHandler (folder)
  { 

    database.folders.where("userId","==",folder.userId)
    .where("name","==",folder.name)
    .get()
    .then(existingFiles =>{
        const exists = existingFiles.docs[0];
        
       if(exists)
       {
         
         exists.ref.delete()
       
      }
       else
       console.log(["file not on database"])
      

      }
      
       )
  }
const renderTooltip = ({folder}) => (
<Tooltip id="button-tooltip"  {...folder}  >
  {folder.name}
  <Button  className = "btn btn-outline-dark text-truncate w-100"  
  variant = "danger" onClick = {()=>{deleteHandler(folder)}} >
    Delete this</Button>
</Tooltip>
)
  return (
    <OverlayTrigger
    
    placement="bottom"
    delay={{ show: 250, hide: 800 }}
    overlay={renderTooltip({folder})}
  > 
    <Button
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      variant="outline-dark"
      className="text-truncate w-100"
      as={Link}
    >
      <FontAwesomeIcon icon={faFolder} className="mr-2" />
      {folder.name}
    
    </Button>
    </OverlayTrigger>
  )
}
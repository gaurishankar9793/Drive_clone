import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import {Tooltip,OverlayTrigger} from 'react-bootstrap'
const renderTooltip = ({folder}) => (
  <Tooltip id="button-tooltip"   >
    {folder.name}
  </Tooltip>
)
export default function Folder({ folder }) {
  return (
    <OverlayTrigger
    
    placement="bottom"
    delay={{ show: 250, hide: 400 }}
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
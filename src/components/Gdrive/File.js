import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Tooltip,OverlayTrigger} from 'react-bootstrap'
import React from 'react';
const renderTooltip = ({file}) => (
  <Tooltip id="button-tooltip"  {...file} >
    {file.name}
  </Tooltip>
)
export default function File({file}) {
    // console.log(file)
  return (
    <>
     <OverlayTrigger
    placement="bottom"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip({file})}
  >
    <a href = {file.url} 
    
    rel="noreferrer"
    target ="_blank"
    className = "btn btn-outline-dark text-truncate w-100">
        <FontAwesomeIcon icon ={faFile} className = "mr-2"/>
        {file.name}
    </a>
    </OverlayTrigger>
    </>
  );
}

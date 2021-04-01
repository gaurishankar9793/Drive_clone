import React from 'react';
const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.name}
    </Tooltip>
  );
  
export default function hover(props) {
  return (
    <>
   
    <Button variant="success">Hover me to see</Button>
 
    </>
  );
}

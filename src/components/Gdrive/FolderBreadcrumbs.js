import React from 'react';
import {Breadcrumb} from "react-bootstrap"
import { Link } from 'react-router-dom';
const ROOT = {
  name : "Root",
  id : null,
  path : []

}
export default function FolderBreadcrumbs({currentFolder}) {
  let path = currentFolder === ROOT ? [ ] : [ROOT]
  if(currentFolder) path = [...path, ...currentFolder.path]
  return (
    <>
    <Breadcrumb 
     className = "flex-grow-1 "
     listProps = {{className : "bg-white pl-0 m-0"}}>
{path.map((folder, index) => (
        <Breadcrumb.Item
          key={index}
          linkAs={Link}
          linkProps={{
            to: {
              pathname: folder.id ? `/folder/${folder.id}` : "/",
              state: { folder: { ...folder, path: path.slice(1, index) } },
            },
          }}
          className="text-truncate d-inline-block"
          style={{ maxWidth: "150px" }}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
    {currentFolder && (
        <Breadcrumb.Item className = "text-truncate d-inline-block" style = {{maxWidth:"200px"}} active >
            {currentFolder.name}
        </Breadcrumb.Item>
    )}
    </Breadcrumb>
    </>
  );
}

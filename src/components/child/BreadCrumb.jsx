import React from "react";
//import { Icon } from "@iconify/react";
//import { Link } from "react-router-dom";
const Breadcrumb = ({ title }) => {
  return (
    <div className='d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24'>
      <h6 className='fw-semibold mb-0 text-violet'>{title}</h6>
     
    </div>
  );
};

export default Breadcrumb;

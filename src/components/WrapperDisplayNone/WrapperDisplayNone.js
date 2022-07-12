import React from "react"
import PropTypes from 'prop-types';
import s from '../WrapperDisplayNone/WrapperDisplayNone.module.scss'
export default function WrapperDisplayNone({children,showModal}){
    return(
<div className={showModal && s.display_none}>{children}</div>
    )
}

WrapperDisplayNone.propTypes = {
    children: PropTypes.node,
    showModal:PropTypes.bool
  };
  
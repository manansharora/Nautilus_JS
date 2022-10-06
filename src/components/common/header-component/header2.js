import React, { Fragment } from 'react';
import '../../../assets/custom-stylesheet/header_style.css';

const Header = ({ Title }) => {

  return (
    <Fragment>
      <div className="page-main-header" style={{ width: '500px' }}>
        <div className="main-header-right row">
          <div className="d-block">
            <span className='header-title'> {Title} </span>
          </div>
        </div>
      </div>
    </Fragment>
  )
};



export default (Header);
import React, { useState, Fragment } from 'react';
import { AlignLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { LogOut } from 'react-feather';
import '../../../assets/custom-stylesheet/header_style.css';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Header = ({ logout }) => {

  const history = useHistory();

  const [modal, setModal] = useState();

  const toggle = () => {

    setModal(!modal);

  }

  const logoutSession = () => {

    logout()
    history.push(`/login`)

  }

  const [sidebar, setSidebar] = useState(false);

  const openCloseSidebar = () => {

    if (sidebar) {

      setSidebar(!sidebar)
      document.querySelector(".page-main-header").classList.remove('open');
      document.querySelector(".page-sidebar").classList.remove('open');

    } else {

      setSidebar(!sidebar)
      document.querySelector(".page-main-header").classList.add('open');
      document.querySelector(".page-sidebar").classList.add('open');

    }

  }

  return (
    <Fragment>
      <Modal isOpen={modal} centered={true}>
        <ModalHeader toggle={toggle}>{"Logout"}</ModalHeader>
        <ModalBody>
          Are You Sure You Want to Logout ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={logoutSession}> Yes </Button>
          <Button color="fourth" onClick={toggle}> No </Button>
        </ModalFooter>
      </Modal>
      <div className="page-main-header">
        <div className="main-header-right row">
          <div className="d-block">
            <div className="media-body text-right switch-sm">
              <label className="switch">
                <AlignLeft onClick={() => openCloseSidebar()} />
              </label>
            </div>
          </div>
          <div className="nav-right col p-0">
            <div className="pull-right mt-2" title="Logout">
              <LogOut style={{ height: '18px', cursor: 'pointer', color: '#fff' }} onClick={toggle} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { logout })(Header);
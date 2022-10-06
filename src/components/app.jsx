import React, { Fragment, useEffect } from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import '../assets/custom-stylesheet/header_style.css';
import Loader from './common/loader';
import { checkAuthenticated, load_user } from '../actions/auth'
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../actions/auth';

// A library to detect user idle time
import { useIdleTimer } from 'react-idle-timer'

const App = (props) => {

    // To remove the unwanted occured warnings and bugs in browser console
    console.log = console.warn = console.error = () => { };

    window.onerror = function (message, url, lineNumber) {

        return true;

    };

    // To verify the user
    useEffect(() => {

        props.checkAuthenticated();
        props.load_user();

    }, [props])

    const handleOnIdle = () => {

        window.location = '/login'
        alert("Your session has expired please login again")

    }

    useIdleTimer({
        timeout: 1800000,
        onIdle: handleOnIdle,
        debounce: 500
    })

    return (
        <Fragment>
            <Loader />
            <div className="page-wrapper">
                <div className="page-body-wrapper">
                    <Header />
                    <Sidebar />
                    <div className="page-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default connect(null, { checkAuthenticated, load_user, logout })(App);
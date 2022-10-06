import '../assets/custom-stylesheet/login_style.css';
import React from 'react'
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import { ToastContainer, toast } from 'react-toastify';

const Activate = ({ verify, match }) => {

    const verifyAccount = (e) => {

        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token)

        toast("Email verified.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })

        setTimeout(() => {
            window.location = '/login'
        }, 500)

    }

    return (
        <div>
            <div className="page-wrapper">
                <div className="container-fluid p-0">
                    {/* <!-- login page start--> */}
                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="auth-innerright">
                                    <div className="authentication-box">

                                        <div className="card mt-4">
                                            <div className="bg_txture"></div>
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h5 className="card_head"> Verify your Account </h5>
                                                </div>
                                                <form className="theme-form">

                                                    <div className="login_links text-center">
                                                        <button className="btn btn-primary btn-block" type="button" onClick={verifyAccount}>
                                                            Verify
                                                        </button>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default connect(null, { verify })(Activate);

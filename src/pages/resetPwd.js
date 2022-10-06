import React, { useState } from 'react';
import '../assets/custom-stylesheet/login_style.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/auth';

const ResetPwd = ({ resetPassword }) => {

    const [show1, setShow1] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        resetPassword(email)
        setShow1(true)

    };

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
                                            {show1 && <div className="alert alert-success alert-dismissible fade show" role="alert"> 
                                                Password Reset Link has been sent on the provided email address.
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShow1(false)}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>}
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h5 className="card_head"> Forgot Password </h5>
                                                </div>
                                                <form className="theme-form" onSubmit={e => onSubmit(e)}>
                                                    <div className="form-group">
                                                        <label className="col-form-label pt-0"> Email </label>
                                                        <input className="form-control" type="email" name="email" value={email}
                                                            onChange={e => onChange(e)} placeholder='Please Enter Your Email' required />
                                                    </div>

                                                    <div className="form-group form-row mt-3 mb-0">
                                                        <button className="btn btn-primary btn-block" type="submit"> Reset Password </button>
                                                    </div>

                                                    <div className="login_links text-center">
                                                        <div className="mt-2"><Link className="btn-link text-capitalize sign_in" to="/login"> Back to Log In </Link>
                                                        </div>
                                                    </div>

                                                    <div className="login_links text-center">
                                                        <div className="mt-2"> Don't have an Account ? <Link className="btn-link text-capitalize sign_in" to="/signup"> Sign Up </Link></div>
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
        </div>
    );
};

export default connect(null, { resetPassword })(ResetPwd);
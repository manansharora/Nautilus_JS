import React, { useState, useRef } from 'react';
import '../assets/custom-stylesheet/login_style.css';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
// import Recaptcha from 'react-recaptcha';
import { ToastContainer } from 'react-toastify';

// Event having multiple method's to deal with the back-end
// import DataService from '../services/ApiService'

const LogIn = ({ login }) => {

    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    // const [IsVerified, setIsVerified] = useState(false);

    const formData = useRef({
        email: '',
        password: ''
    });

    const onChange = e => formData.current = { ...formData.current, [e.target.name]: e.target.value };

    // const onSubmit = e => {

    //     e.preventDefault();

    //     // if (!IsVerified) {

    //     //     toast("Please verify you are a human", {
    //     //         position: "top-center",
    //     //         autoClose: 5000,
    //     //         hideProgressBar: false,
    //     //         closeOnClick: true,
    //     //         pauseOnHover: true,
    //     //         draggable: true,
    //     //         progress: undefined,
    //     //     })

    //     // }
    //     // else {

    //     login(formData.current.email, formData.current.password)

    //     DataService.LogInUser(formData.current.email, formData.current.password).then((res) => {

    //         toast("Logged In Successfully !!!", {
    //             position: "top-center",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         })

    //         history.push("/dashboard/mold")

    //     }).catch((err) => {

    //         toast("Invalid credentials", {
    //             position: "top-center",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         })

    //     })

    //     // }
    // };

    // Set's the IsVerified to true
    // const verify = () => {

    //     setIsVerified(true);

    // };

    const onLogin = () => {

        history.push("/dashboard/mold")

    }

    return (
        <>
            <div>
                <div className="page-wrapper">
                    <div className="container-fluid p-0">
                        <div className="authentication-main">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="auth-innerright">
                                        <div className="authentication-box">

                                            <div className="card mt-4">
                                                <div className="card-body card_css">
                                                    <div className="text-center">
                                                        <h5 className="card_head"> LOGIN </h5>
                                                    </div>
                                                    <form className="theme-form" onSubmit={onLogin}>

                                                        <div className="form-group">

                                                            <label className="col-form-label pt-0"> Email </label>

                                                            <input className="form-control" type="email" name="email" value={formData.email}
                                                                onChange={e => onChange(e)} placeholder='Please Enter Your Email' required />

                                                        </div>

                                                        <div className="form-group">

                                                            <label className="col-form-label"> Password </label>

                                                            <div className="d-flex mt-2">

                                                                <input className="form-control" placeholder="Enter Your Password" onChange={e => onChange(e)} value={formData.password} minLength={8} name="password" type={showPassword ? "text" : "password"} required />

                                                                <i className="far fa-eye m-2" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}></i>

                                                            </div>

                                                        </div>

                                                        {/* <div>
                                                            <Recaptcha
                                                                sitekey="6LcqonIfAAAAAEKlAAQBfGhfNcVZTP1oU9yLiF3l"
                                                                render="explicit"
                                                                verifyCallback={verify}
                                                            />
                                                        </div> */}

                                                        <div className="form-group form-row mt-3 mb-0 text-center">
                                                            <button className="btn btn-primary btn-block btn_txt" type="submit">
                                                                Login
                                                            </button>
                                                        </div>

                                                        <div className="row checkbox">

                                                            <Link to="/reset-password" className="col-md-8 btn-link text-capitalize text-right mt-2 sign_up">
                                                                Forgot Password ?
                                                            </Link>
                                                        </div>

                                                        <div className="login_links text-center">

                                                            <div className="mt-2">
                                                                Don't have an Account ?
                                                                <Link className="btn-link text-capitalize sign_up ml-2" to="/signup">
                                                                    Sign Up
                                                                </Link>
                                                            </div>

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

            <ToastContainer />
        </>
    );
};

export default connect(null, { login })(LogIn);
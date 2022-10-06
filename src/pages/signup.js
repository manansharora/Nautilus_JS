import React, { Fragment, useState } from 'react';
import '../assets/custom-stylesheet/login_style.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
// import Recaptcha from 'react-recaptcha';
import { ToastContainer, toast } from 'react-toastify';

// Event having multiple method's to deal with the back-end
import DataService from '../services/ApiService'

const Signup = ({ signup }) => {

    console.log = console.warn = console.error = () => { };

    window.onerror = function (message, url, lineNumber) {
        // maybe some handling?  
        return true; // prevents browser error messages  
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    // const [IsVerified, setIsVerified] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { name, email, password, re_password } = formData;

    const onChange = e => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const onSubmit = e => {
        e.preventDefault();

        if (password !== re_password) {

            toast("Entered password's does not match", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        }

        // else if (!IsVerified) {

        //     toast("Please verify you are a human", {
        //         position: "top-center",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     })

        // }

        else {

            DataService.SignInUser(name, email, password, re_password).then((res) => {

                toast(`A verification link has been sent on ${formData.email}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })


            }).catch((err) => {

                toast("Make Sure The password is not similar to the email and email is not registered before.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

            })

        }

    };

    // Set's the IsVerified to true
    // const verify = () => {
    //     setIsVerified(true);
    // };

    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-sm-12 p-0">
                                <div className="auth-innerright">

                                    <div className="authentication-box">

                                        <div className="card mt-4">

                                            <div className="card-body card_css">
                                                <div className="text-center">
                                                    <h5 className="card_head">Sign Up</h5>
                                                </div>
                                                <form className="theme-form" onSubmit={e => onSubmit(e)}>

                                                    <div className="form-group">
                                                        <label htmlFor="name"> Name: </label>
                                                        <input className="form-control" name="name" placeholder="Enter Your Full Name" value={name} onChange={e => onChange(e)} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email"> Email: </label>

                                                        <input className="form-control" name="email" placeholder="Enter Your Email Address" type="email" onChange={e => onChange(e)} value={email} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label> Password: </label>
                                                        <div className="d-flex mt-2">

                                                            <input className="form-control" placeholder="Make a password using alphabets and number" onChange={e => onChange(e)} value={password} minLength={8} name="password" type={showPassword ? "text" : "password"} required />

                                                            <i className="far fa-eye m-2" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}></i>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label> Retype Password: </label>
                                                        <div className="d-flex">

                                                            <input className="form-control" placeholder="Make a password using alphabets and number" type={showPassword2 ? "text" : "password"} minLength={8} onChange={e => onChange(e)} value={re_password} name="re_password" required />

                                                            <i className="far fa-eye m-2" style={{ cursor: "pointer" }} onClick={() => setShowPassword2(!showPassword2)}></i>
                                                        </div>
                                                    </div>
                                                    {/* <div>
                                                        <Recaptcha
                                                            sitekey="6LcqonIfAAAAAEKlAAQBfGhfNcVZTP1oU9yLiF3l"
                                                            render="explicit"
                                                            verifyCallback={verify}
                                                        />
                                                    </div> */}
                                                    <div className="form-group form-row mt-3 mb-0">
                                                        <button className="btn btn-primary btn-block" type="submit" > Sign Up </button>
                                                    </div>
                                                    <div className="login_links text-center">
                                                        <div className="mt-2"> Are you already a user ?  <Link className="btn-link text-capitalize sign_in" to="/login"> Sign In </Link>
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
            <ToastContainer />
        </Fragment>
    );
};

export default connect(null, { signup })(Signup);
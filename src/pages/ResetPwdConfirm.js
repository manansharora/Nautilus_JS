import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetPasswordConfirm } from '../actions/auth';

const ResetPwdConfirm = ({ resetPasswordConfirm, match }) => {

    const [show1, setShow1] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        resetPasswordConfirm(uid, token, new_password, re_new_password);

        setShow1(true)

        setTimeout(() => {
            window.location = 'http://192.168.0.104:3000/login'
        }, 500)
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
                                                Password has been successfully changed. Please close this page and go back to logIn page.
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShow1(false)}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>}
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h5 className="card_head"> Confirm Forgot Password </h5>
                                                </div>
                                                <form className="theme-form" onSubmit={e => onSubmit(e)}>
                                                    <div className="form-group">
                                                        <label className="col-form-label pt-0"> New Password </label>
                                                        <input className="form-control" type="password" name="new_password" value={new_password}
                                                            onChange={e => onChange(e)} placeholder='Please Enter Your New Password' required />
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-form-label pt-0"> Retype New Password </label>
                                                        <input className="form-control" type="password" name="re_new_password" value={re_new_password}
                                                            onChange={e => onChange(e)} placeholder='Please Re-Enter Your New Password' required />
                                                    </div>

                                                    <div className="form-group form-row mt-3 mb-0">
                                                        <button className="btn btn-primary btn-block" type="submit"> Confirm Reset Password </button>
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
    )
}

export default connect(null, { resetPasswordConfirm })(ResetPwdConfirm);

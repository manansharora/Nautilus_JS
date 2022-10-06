import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from "./components/app";
import { Provider } from 'react-redux';
import store from './store';

import { connect } from 'react-redux';

// Import custom Components 
import Dashboard from './components/dashboard/Dashboard';

// pages 
import SixStepStudy from './components/sixstepstudy/SixStepStudy';
import LogIn from './pages/login';
import Signup from './pages/signup';
import ResetPwd from './pages/resetPwd';
import Activate from './pages/Activate'
import ResetPwdConfirm from './pages/ResetPwdConfirm';
import SessionGrid from './components/dashboard/SessionGrid';

import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFadVlJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkJiWn9YcHJRRGBYUUI=');

const Root = ({ user }) => {

    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter basename={`/`}>
                    <Switch>

                        <Route path="/login" component={LogIn} />

                        <Route path="/signup" component={Signup} />

                        <Route path="/reset-password" component={ResetPwd} />

                        <Route path="/activate/:uid/:token" component={Activate} />

                        <Route exact path='/email/reset/confirm/:uid/:token' component={ResetPwdConfirm} />

                        <App>

                            <Route exact path="/" render={() => {
                                return ( <Redirect to="/login" />)
                            }} />

                            <Route path="/dashboard/mold" component={Dashboard} />

                            <Route path="/dashboard/:MoldName/:Mold_Id/session" component={SessionGrid} />

                            <Route path="/dashboard/session" component={SessionGrid} />

                            <Route exact path="/sixstepstudy/:moldId/:sessionId/:moldName/:sessionName/sixstepstudy" render={() => {
                                return (sessionStorage.getItem('access') || user ? <SixStepStudy /> : <Redirect to="/login" />)
                            }}/>

                        </App>

                    </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)( Root );

ReactDOM.render(<Root />, document.getElementById('root'));

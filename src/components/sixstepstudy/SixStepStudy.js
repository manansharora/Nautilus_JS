import React, { useEffect, useState, useRef } from "react";
import '../App.css';

// Tab view component from syncfusion to navigate through six steps study
import { TabComponent, TabItemDirective, TabItemsDirective } from "@syncfusion/ej2-react-navigations";

import { useParams, useHistory } from 'react-router-dom';

// Import all the six step's component which are created outside this file in same folder to code complexity
import ViscocityCurve from "./ViscocityCurve";
import CavityBalance from "./CavityBalance";
import PressureDropStudy from "./PressureDropStudy";
import CosmeticPressure from "./CosmeticPressure";
import CoolingTimeStudy from "./CoolingTimeStudy";
import ColdRunner from "./ColdRunner";

import { ToastContainer } from 'react-toastify';
import Header2 from '../common/header-component/header2';

// Using a Function Component
const SixStepStudy = () => {

    const history = useHistory();

    const showAlert = useRef(false);

    function confirmAction(e) {

        let confirmAction = window.confirm('There is some unsaved data on this page. You still want to continue ?');

        if (confirmAction) {
            showAlert.current = false;
        } else {
            e.cancel = true;
        }

    }

    const tabSelecting = (e) => {

        if (showAlert.current) {
            confirmAction(e)
        }

    }

    // To get the Mold Id from url using useParams hook
    var { moldId, moldName, sessionName } = useParams();

    // Variable to store the a Mold/Session Name
    const [Mold_Name, setMold_Name] = useState();
    const [Mold_Id, setMold_Id] = useState();
    const [Session_Name, setSession_Name] = useState();

    // Event to get back to Session's
    const goBack = () => {

        // Using the "btoa" method to encrypt the URL so that the exact ID should not be visible
        var MoldName = btoa(Mold_Name)
        var MoldId = btoa(Mold_Id)

        history.push(`/dashboard/${MoldName}/${MoldId}/session`)

    }

    // Declare the names of the tab's
    let headertext = [
        { text: "Viscosity Curve" },
        { text: "Cavity Balance" },
        { text: "Pressure Drop Study" },
        { text: "Cosmetic Process Window" },
        { text: "Gate Seal Study" },
        { text: "Cooling Time Study" },
    ];

    // These are the event's which will get called when clicked on the respective step's tab and once they are called they render the component of that respective tab which we have imported above
    function content0() {
        return (
            <div>
                <ViscocityCurve showAlert={showAlert} />
            </div>);
    }

    function content1() {
        return (
            <div>
                <CavityBalance showAlert={showAlert} />
            </div>);
    }

    function content2() {
        return (
            <div>
                <PressureDropStudy showAlert={showAlert} />
            </div>);
    }

    function content3() {
        return (<div>
            <CosmeticPressure showAlert={showAlert} />
        </div>);
    }

    function content4() {
        return (<div>
            <ColdRunner showAlert={showAlert} />
        </div>);
    }

    function content5() {
        return (<div>
            <CoolingTimeStudy showAlert={showAlert} />
        </div>);
    }

    useEffect(() => {

        // Using the "atob" method we are decrypting the values getting from the URL
        setMold_Name(atob(moldName))
        setSession_Name(atob(sessionName))
        setMold_Id(atob(moldId))

    }, [moldName, sessionName, moldId])

    return (
        <>

            <Header2 Title="Six Step Study" />

            <div className="container-fluid">

                <div className="d-flex justify-content-between">

                    <div className="d-flex">
                        <div>
                            <span className="BreadCrum" onClick={goBack}> Sessions </span>
                        </div>
                        <div>
                            <span className="BreadCrum"> / </span>
                        </div>
                        <div>
                            <span className="BreadCrum"> Six Step Study </span>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="ml-2">
                            <span className="Mold-Session"> Mold Id : {Mold_Name} </span>
                        </div>

                        <div className="ml-4">
                            <span className="Mold-Session"> Session Name : {Session_Name} </span>
                        </div>
                    </div>

                </div>

                <div className="study-container">

                    {/* This is Syncfusion Tab control in which header attribute is to display the name of that tab and content attribute to display the content under that tab */}

                    <TabComponent heightAdjustMode="Auto" id="defaultTab" selecting={tabSelecting.bind(this)}>
                        <TabItemsDirective>
                            <TabItemDirective header={headertext[0]} content={content0} />
                            <TabItemDirective header={headertext[1]} content={content1} />
                            <TabItemDirective header={headertext[2]} content={content2} />
                            <TabItemDirective header={headertext[3]} content={content3} />
                            <TabItemDirective header={headertext[4]} content={content4} />
                            <TabItemDirective header={headertext[5]} content={content5} />
                        </TabItemsDirective>
                    </TabComponent>
                </div>

                <ToastContainer />
            </div>
        </>

    );
}

export default SixStepStudy
import http from "./http-common";

// *********************** Auth API's **************************

// Event to call the LogIn Api
const LogInUser = ( email, password ) => {

    const body = JSON.stringify({ email, password });

    return http.post('/auth/jwt/create/', body)

}

// Event to call the SignIn Api
const SignInUser = ( name, email, password, re_password ) => {

    const body = JSON.stringify({ name, email, password, re_password });

    return http.post('/auth/users/', body)

}

// *********************** Mold Api's ***************************

// Event to make GET request which fetches the mold as per user
const FetchMold = ( id ) => {
    return http.get(`mold_session/mold/${id}`)
}

// Event to make a POST request to save the created mold in the DB. 
const SaveMold = ( Mold ) => {
    return http.post('mold_session/mold_save/', Mold)
}

// Event to Fetch mold details as per id
const GetMold = ( id ) => {
    return http.get(`mold_session/mold_by_id/${id}`)
}

// Event to Update mold details as per id
const UpdateMold = ( id, Mold ) => {
    return http.put(`mold_session/mold_update/${id}`, Mold)
}

// Event to Delete mold details as per id
const DeleteMold = ( id ) => {
    return http.delete(`mold_session/mold_update/${id}`)
}


// *********************** Session Api's ***************************
// Event to make GET request which fetches the session as per mold
const FetchSession = ( moldId ) => {
    return http.get(`mold_session/session/${moldId}`)
}

// Event to make a POST request to save the created session in the DB. 
const SaveSession = ( session ) => {
    return http.post('mold_session/session_save/', session)
}


// *********************** Viscosity Api's ***************************

// Event to make a GET request to fetch the respective session's Viscosity data
const FetchViscosity = ( sessionId ) => {
    return http.get(`six-step/viscosity/${sessionId}`)
}

// Event to make a PUT request to update the respective session's Viscosity data
const UpdateViscosity = ( sessionId, data ) => {
    return http.put(`six-step/viscosity/${sessionId}`, data)
}

// Event to make POST request to save the respective session's Viscosity data
const SaveViscosity = ( data ) => {
    return http.post('six-step/viscosity_save/', data)
}

// *********************** Cavity Api's ***************************

// Event to make a GET request to fetch the respective session's Cavity data
const FetchCavity = ( sessionId ) => {
    return http.get(`six-step/cavity/${sessionId}`)
}

// Event to make a PUT request to update the respective session's Cavity data
const UpdateCavity = ( sessionId, data ) => {
    return http.put(`six-step/cavity/${sessionId}`, data)
}

// Event to make POST request to save the respective session's Cavity data
const SaveCavity = ( data ) => {
    return http.post('six-step/cavity_save/', data)
}

// *********************** Pressure Drop Api's ***************************

// Event to make a GET request to fetch the respective session's Pressure Drop data
const FetchPressure = ( sessionId ) => {
    return http.get(`six-step/pressure/${sessionId}`)
}

// Event to make a PUT request to update the respective session's Pressure Drop data
const UpdatePressure = ( sessionId, data ) => {
    return http.put(`six-step/pressure/${sessionId}`, data)
}

// Event to make POST request to save the respective session's Pressure Drop data
const SavePressure = ( data ) => {
    return http.post('six-step/pressure_save/', data)
}

// *********************** Cosmetic Pressure Api's ***************************

// Event to make a GET request to fetch the respective session's Cosmetic Pressure data
const FetchCosmetic = ( sessionId ) => {
    return http.get(`six-step/cosmetic/${sessionId}`)
}

// Event to make a PUT request to update the respective session's Cosmetic Pressure data
const UpdateCosmetic = ( sessionId, data ) => {
    return http.put(`six-step/cosmetic/${sessionId}`, data)
}

// Event to make POST request to save the respective session's Cosmetic Pressure data
const SaveCosmetic = ( data ) => {
    return http.post('six-step/cosmetic_save/', data)
}

// *********************** Cold Runner Pressure Api's ***************************

// Event to make a GET request to fetch the respective session's Cold Runner Pressure data
const FetchGateSeal = ( sessionId ) => {
    return http.get(`six-step/gate_seal/${sessionId}`)
}

// Event to make a PUT request to update the respective session's Cold Runner Pressure data
const UpdateGateSeal = ( sessionId, data ) => {
    return http.put(`six-step/gate_seal/${sessionId}`, data)
}

// Event to make POST request to save the respective session's Cold Runner Pressure data
const SaveGateSeal = ( data ) => {
    return http.post('six-step/gate_seal_save/', data)
}

// *********************** Cooling Time Api's ***************************

// Event to make a GET request to fetch the respective session's Cooling Time data
const FetchCooling = ( sessionId ) => {
    return http.get(`six-step/cooling_time/${sessionId}`)
}

// Event to make a PUT request to update the respective session's Cooling Time data
const UpdateCooling = ( sessionId, data ) => {
    return http.put(`six-step/cooling_time/${sessionId}`, data)
}

// Event to make POST request to save the respective session's Cooling Time data
const SaveCooling = ( data ) => {
    return http.post('six-step/cooling_time_save/', data)
}

export default { FetchMold, SaveMold, FetchSession, SaveSession, FetchViscosity, UpdateViscosity, SaveViscosity, GetMold, FetchCavity, UpdateCavity, SaveCavity, FetchPressure, UpdatePressure, SavePressure, FetchCosmetic, UpdateCosmetic, SaveCosmetic, FetchGateSeal, UpdateGateSeal, SaveGateSeal, FetchCooling, UpdateCooling, SaveCooling, UpdateMold, DeleteMold, LogInUser, SignInUser };
import {RETRIEVE_PATIENTS, RETRIEVE_PATIENT_READINGS, RETRIEVE_PATIENT_INSULINS, RETRIEVE_PATIENT_MEALS, RETRIEVE_PATIENT_PARAMETERS} from '../actions/types';

const initialState = {
    patientLst:[],
    selectedPatient:{},
    selectedPatientReadings:{},
    selectedPatientMeals:{},
    selectedPatientInsulins:{},
    selectedPatientParameters:{},
}

function findPatient(patientLst, patId){
    return patientLst.find(pat => {
        return pat.id === patId
     })
}

export default function(state=initialState, action){
    switch(action.type){
        case RETRIEVE_PATIENTS:
            return {
                ...state,
                patientLst: action.payload
            };
        case RETRIEVE_PATIENT_READINGS:
            const selectedPat = findPatient(state.patientLst,action.payload.id);
            return {
                ...state,
                selectedPatient: selectedPat,
                selectedPatientReadings: action.payload
            };
        case RETRIEVE_PATIENT_MEALS:
            return {
                ...state,
                selectedPatientMeals: action.payload
            };
        case RETRIEVE_PATIENT_INSULINS:
            return {
                ...state,
                selectedPatientInsulins: action.payload
            };
        case RETRIEVE_PATIENT_PARAMETERS:
            return {
                ...state,
                selectedPatientParameters: action.payload
            };
        
        default:
            return state;
    }
}
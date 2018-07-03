import {FETCH_POSTS, NEW_POST, RETRIEVE_PATIENT_READINGS, RETRIEVE_PATIENTS, 
    RETRIEVE_PATIENT_PARAMETERS, RETRIEVE_PATIENT_INSULINS, RETRIEVE_PATIENT_MEALS} from './types';

export const fetchPosts = ()=>dispatch=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res=>res.json())
        .then(posts=>dispatch({
            type:FETCH_POSTS,
            payload:posts.slice(0,5),
        }));
}

export const createPost = (postData)=>dispatch=>{
    fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(postData)
    })
    .then(res=>res.json())
    .then(post=>dispatch({
        type:NEW_POST,
        payload:post
    }));
}

export const retrievePatients = ()=>dispatch=>{
    fetch('http://localhost:3000/patients')
    .then(res=>res.json())
    .then(pats=>dispatch({
        type:RETRIEVE_PATIENTS,
        payload:pats,
    }));
}

export const retrievePatientReadings = (pat)=>dispatch=>{
    fetch('http://localhost:3000/readings/'+pat.id)
    .then(res=>res.json())
    .then(readings=>dispatch({
        type:RETRIEVE_PATIENT_READINGS,
        payload:readings,
    }));
}
export const retrievePatientMeals = (pat)=>dispatch=>{
    fetch('http://localhost:3000/meals/'+pat.id)
    .then(res=>res.json())
    .then(readings=>dispatch({
        type:RETRIEVE_PATIENT_MEALS,
        payload:readings,
    }));
}
export const retrievePatientInsulins = (pat)=>dispatch=>{
    fetch('http://localhost:3000/insulins/'+pat.id)
    .then(res=>res.json())
    .then(readings=>dispatch({
        type:RETRIEVE_PATIENT_INSULINS,
        payload:readings,
    }));
}

export const retrievePatientParameters = (pat)=>dispatch=>{
    fetch('http://localhost:3000/parameters/'+pat.id)
    .then(res=>res.json())
    .then(readings=>dispatch({
        type:RETRIEVE_PATIENT_PARAMETERS,
        payload:readings,
    }));
}

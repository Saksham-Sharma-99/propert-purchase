import Axios from "axios"
import { Constants} from "./Constants"



function PostReq(baseURL , route, body , callback){
    if (localStorage.getItem(Constants.authToken) != null){
        var headers = {headers :{
            'Authorization' : 'Bearer '+ localStorage.getItem(Constants.authToken)
        }}
        Axios.post(baseURL+route , body , headers).then((res)=>{
            callback(res)
        })
    }
    else{
        Axios.post(baseURL+route , body).then((res)=>{
            callback(res)
        })
    }
}

function GetReq(baseURL , route, callback){
    if (localStorage.getItem(Constants.authToken) != null){
        var headers = {headers :{
            'Authorization' : 'Bearer '+ localStorage.getItem(Constants.authToken)
        }}
        Axios.get(baseURL+route, headers).then((res)=>{
            callback(res)
        })
    }
    else{
        Axios.get(baseURL+route).then((res)=>{
            callback(res)
        })
    }
}

function PutReq(baseURL , route , body , callback){
    if (localStorage.getItem(Constants.authToken) != null){
        var headers = {headers :{
            'Authorization' : 'Bearer '+ localStorage.getItem(Constants.authToken)
        }}
        Axios.put(baseURL+route , body , headers).then((res)=>{
            callback(res)
        })
    }
    else{
        Axios.put(baseURL+route , body).then((res)=>{
            callback(res)
        })
    }
}

function DeleteReq(baseURL , route , callback){
    if (localStorage.getItem(Constants.authToken) != null){
        var headers = {headers :{
            'Authorization' : 'Bearer '+ localStorage.getItem(Constants.authToken)
        }}
        Axios.delete(baseURL+route, headers).then((res)=>{
            callback(res)
        })
    }
    else{
        Axios.delete(baseURL+route).then((res)=>{
            callback(res)
        })
    }
}

export {PostReq , GetReq , PutReq , DeleteReq}
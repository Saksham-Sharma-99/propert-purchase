import React, { useEffect, useState } from "react"
import Loader from "react-loader-spinner";
import {AuthRoute} from 'react-router-auth';
import {HashRouter, Switch} from 'react-router-dom';
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import { BaseURL, Constants, EndPoints, Paths } from "./Model/Constants";
import { GetReq } from "./Model/Request";

function App() {
  // sessionStorage.clear()
  // localStorage.clear()
  var [authenticated,setAuth]  = useState(localStorage.getItem(Constants.authToken) != null)
  var [isLoading , setLoading] = useState(false)
  var [data , setData] = useState(JSON.parse(sessionStorage.getItem(Constants.data)))
  
  useEffect(()=>{
    setAuth(localStorage.getItem(Constants.authToken) != null)
    if(authenticated && data == null){
      setLoading(true)
      GetReq(BaseURL , EndPoints.LANDS , ((res)=>{
        setData(res.data)
        sessionStorage.setItem(Constants.data,JSON.stringify(data))
        setLoading(false)
      }))
    }
  })
  
  return isLoading || (authenticated && data==null) ? 
    (<Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        className = "loader"
    />):
      (
    <div className="App">
      <HashRouter>
        <Switch>
          <AuthRoute
            authenticated={!authenticated}
            redirectTo={Paths.auth}
            path={Paths.auth}
            component={Auth}/>
          <AuthRoute
            authenticated={authenticated}
            redirectTo={Paths.auth}
            path={Paths.home}
            component={()=>(<Home data={data}/>)}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;

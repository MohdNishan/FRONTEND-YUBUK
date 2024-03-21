import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Verify from "./components/Verify";
import UserProfile from "./components/User/create";
import Userprofileedit from "./components/User/profileedit";
import Userprofileview from "./components/User/profileview";
import Businessprofile from "./components/Business/create";
import Businessedit from "./components/Business/edit";
import { injectAuthInterceptors } from "./api";
import profileview from "./components/Business/businessview";
import Businesslist from "./components/Business/List";
  
  const App = () => {

    injectAuthInterceptors()
  

  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Login}/>
        <Route path="/verify" Component={Verify}/>
        <Route path="/user/create" Component={UserProfile}/>
        <Route path="/user/edit" Component={Userprofileedit}/>
        <Route path="/user/view" Component={Userprofileview}/>
        <Route path="/business/create/:profile_id" Component={Businessprofile}/>
        <Route path="/business/edit/:business_id" Component={Businessedit}/>
        <Route path="/business/view/:business_id" Component={profileview}/>
        <Route path="/business/list/:profile_id" Component={Businesslist}/>
      </Routes>
    </Router>

  )
}

export default App

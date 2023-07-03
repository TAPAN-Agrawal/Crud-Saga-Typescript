import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import classes from './Welcome.module.css'

function Welcome() {
    const location = useLocation();
    const navigate = useNavigate()
   
  return <div className={classes.main}>
<h1 className={classes.h1}>Welcome!  {location.state}</h1><br/><br/>
<Button onClick={()=>{navigate("/dashboard")}} className={classes.Button}>Dashboard</Button>

  </div>;
}

export default Welcome;

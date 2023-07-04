import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import classes from './Welcome.module.css'
import { LeftOutlined } from "@ant-design/icons";

function Welcome() {
    const location = useLocation();
    const navigate = useNavigate()

    const backHandler=()=>{
      navigate("/login")
    }
   
  return <div style={{backgroundColor:"rgb(0,28,255)"}}>
        <Button onClick={backHandler} style={{backgroundColor:"blue",color:"white"}}>Back</Button>
  <div className={classes.main}>
<h1 className={classes.h1}>Welcome!  {location.state}</h1><br/><br/>
<Button onClick={()=>{navigate("/dashboard")}} className={classes.Button}>Dashboard</Button>

  </div>
  </div>;
}

export default Welcome;

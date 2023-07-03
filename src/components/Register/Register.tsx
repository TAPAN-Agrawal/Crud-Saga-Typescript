import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from 'react-redux';
import { addUserCredentials } from "../../Redux/Actions/Action";
import { Link, useNavigate } from "react-router-dom";
import classes from './Register.module.css'



function Register() {

  interface Info {
    name: string,
    password: string
  }

  interface ValidateErrorEntity {
    values: { [name: string]: any };
    errorFields: { name: (string | number)[]; errors: string[] }[];
    outOfDate: boolean;
  }


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [info, setInfo] = useState<Info>({ name: " ", password: " " });
  const[nameErr,setnameErr] = useState("")
const[passwordErr,setpasswordErr] = useState("")
const[err,seterr]=useState("")

  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if(value===""){
      setnameErr("name cannot be empty")
    }
    else{
      setnameErr("")
      setInfo({ ...info, name: value });
    }

  }
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "") {
      setpasswordErr("Password cannot be empty");
    } else if (value.length < 8) {
      setpasswordErr("Password must be at least 8 characters long");
    } else if (!/[a-z]/.test(value)) {
      setpasswordErr("Password must contain at least one lowercase letter");
    } else if (!/[A-Z]/.test(value)) {
      setpasswordErr("Password must contain at least one uppercase letter");
    } else if (!/[!@#$%^&*]/.test(value)) {
      setpasswordErr("Password must contain at least one special character (!@#$%^&*)");
    } else {
      setpasswordErr("");
      setInfo({ ...info, password: value });
    }
  };
  

  const submitHandler = (e: FormEvent) => {

    e.preventDefault();
   if(info.name === " "){
    setnameErr("name cannot be empty")
   }
   if(info.password === " "){
    setpasswordErr("Password cannot be empty")
   }
    
    if((nameErr === "") && (info.name !== " ") && (passwordErr === "") && (info.password !== " ")){
      dispatch(addUserCredentials(info))
      navigate("/login")
    }
    
   

  };

  const onFinish = (values: ValidateErrorEntity) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };



  return (
    <div className={classes.heading}>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={classes.form}

      >
        <div >
          <h1 >Register</h1>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input onChange={nameHandler} />
                   <span className="err">
                   {nameErr}

                   </span>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password onChange={passwordHandler} />
            <span className="err">

            {passwordErr}
                   </span>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
            <Button type="primary" htmlType="submit" onClick={submitHandler} className={classes.form} >
              Submit
            </Button>
          </Form.Item>
          <Link to="/login">already have account login?</Link>


        </div>
      </Form>
    </div>
  );
}

export default Register;

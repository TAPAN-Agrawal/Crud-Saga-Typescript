import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StateInterface } from "@/Redux/Reducers/Reducer";
import { RootState } from "../../Redux/Store/RootReducer";
import classes from './Login.module.css'



function Login() {

  interface Info {
    name: string,
    password: string
  }

  interface ValidateErrorEntity {
    values: { [name: string]: any };
    errorFields: { name: (string | number)[]; errors: string[] }[];
    outOfDate: boolean;
  }





  const userName = useSelector((state: RootState) => state.count.name);
  const userPassword = useSelector((state: RootState) => state.count.password);
  const navigate = useNavigate()

  const [info, setInfo] = useState<Info>({ name: " ", password: " " });
  const [nameErr, setnameErr] = useState("")
  const [passwordErr, setpasswordErr] = useState("")
const[err,setErr]=useState("")
  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "") {
      setnameErr("name cannot be empty")
    }
    else {
      setnameErr("")
      setInfo({ ...info, name: value });
    }

  }
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setpasswordErr("Password cannot be empty");
    } else if (value.length < 8) {
      setpasswordErr("Password should be at least 8 characters long");
    } else if (!/[a-z]/.test(value)) {
      setpasswordErr("Password should contain at least one lowercase letter");
    } else if (!/[A-Z]/.test(value)) {
      setpasswordErr("Password should contain at least one uppercase letter");
    } else if (!/[!@#$%^&*]/.test(value)) {
      setpasswordErr("Password should contain at least one special character (!@#$%^&*)");
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
    if (((userName === info.name) && (userPassword === info.password)) && (userName !== " ") && (userPassword !== " ")) {

      if ((nameErr === "") && (info.name !== " ") && (passwordErr === "") && (info.password !== " ")) {

        navigate('/welcome', { state: userName });
      }
    }
    else {
     setErr("unauthorized user")
    }

  };

  const onFinish = (values: ValidateErrorEntity) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={classes.maincontainer}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={classes.Form}

      >
        <div >
          <h1 className={classes.heading}>Login</h1>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input onChange={nameHandler} />
            <span className={classes.err}>
              {nameErr}

            </span>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password onChange={passwordHandler} />
            <span className={classes.err}>

              {passwordErr}
            </span>
          </Form.Item>
<span className={classes.err}>{err}</span>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={submitHandler}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default Login;

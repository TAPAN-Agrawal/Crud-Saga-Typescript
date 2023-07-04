import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import { useDispatch } from 'react-redux';
import { addUserCredentials } from "../../Redux/Actions/Action";
import { Link, useNavigate } from "react-router-dom";
import classes from './Register.module.css'
import TextArea from "antd/es/input/TextArea";



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
  const [nameErr, setnameErr] = useState("")
  const [passwordErr, setpasswordErr] = useState("")
  const [err, seterr] = useState("")

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
    if (info.name === " ") {
      setnameErr("name cannot be empty")
    }
    if (info.password === " ") {
      setpasswordErr("Password cannot be empty")
    }

    if ((nameErr === "") && (info.name !== " ") && (passwordErr === "") && (info.password !== " ")) {
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
    <div className={classes.main}>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className={classes.forms}

      >

        <h1 className={classes.heading}>Register</h1>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          className={classes.form_item}
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
          className={classes.form_item}
        >
          <Input.Password onChange={passwordHandler} />
          <span className={classes.err}>

            {passwordErr}
          </span>
        </Form.Item >
        <Form.Item label="Birthday" className={classes.form_item}
        >
          <DatePicker />
        </Form.Item>
       
        <Form.Item label="Radio" name="radio" className={classes.form_item}>
          <Radio.Group>
            <Radio value="apple"> Male </Radio>
            <Radio value="pear"> Female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Address" name="textarea" className={classes.form_item} style={{height:"15vh"}}>
          <TextArea rows={4} />
        </Form.Item>
       <div className={classes.btn}>
       <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
          <Button type="primary" htmlType="submit" onClick={submitHandler} >
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

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button, Space, Table, Tag } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { addData, deleteData, editData, getData } from "../../Redux/Actions/Action";
import { RootState } from "@/Redux/Store/RootReducer";
import classes from './Dashboard.module.css'
import Cardcomp from "../Card/Cardcomp";

function Dashboard() {

  interface Record {
    id: number,
    Title: string,
    subTitle: string,
  }



  const userData = useSelector((state: RootState) => state.count.arr);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState({ Title:" ",subTitle:" " });
  const [type, setType] = useState("add");

  const TitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, Title: e.target.value });
  };
  const subTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, subTitle: e.target.value });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    if (type === "add") {
      dispatch(addData(info));
      console.log("add");
      console.log("thi das",info);
      
    } else {
      setType("add")
      dispatch(editData(info));
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addHandler = () => {
    setInfo({ Title: " ", subTitle: " ", })
    showModal()
  }

  const handleEdit = (record: Record) => {
    setIsModalOpen(true);
    setType("edit");
    setInfo(record);
  };
  const handleDelete = (id: number) => {
    dispatch(deleteData(id));
  };

  const columns = [
    {
      title: "Task",
      dataIndex: "Title",
    },
    {
      title: "subTask",
      dataIndex: "subTitle",
    },
    
    {
      title: "Actions",
      render: (record: Record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const data = userData;

  useEffect(() => {
    dispatch(getData());
    console.log("userData", userData);
  }, []);

  return (
    <div className={classes.main}>
      
        <Button type="primary" onClick={addHandler}>
          ADD
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <label>Title</label>
          <input name="title" onChange={TitleHandler} value={info.Title} />
          <br />
          <label>subTitle</label>

          <input name="title" onChange={subTitle} value={info.subTitle} />
          <br />
          
        </Modal>
        {/* <Table columns={columns} dataSource={data} /> */}
      <div className={classes.todocontainer}>
      {
        data.map((item) => (
                  <Cardcomp
               
                    id ={item.id}
                    Title={item.Title}
                    subTitle={item.subTitle}
                    onEdit={()=>{handleEdit(item)}}
                    onDelete={()=>{handleDelete(item.id)}}
                   
                  />
                ))
       }
      </div>
      </div>
   
  );
}

export default Dashboard;

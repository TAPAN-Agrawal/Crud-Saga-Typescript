import React, { useState } from "react";
import "./Card.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function Cardcomp(Props) {
  const [toogle, settoogle] = useState(true);

  return (
    <div className="card">
      <h2 className="title">{Props.Title}</h2>
      <h3 className="subtitle">{Props.subTitle}</h3>

      <div className="all-btn">
        

        <button className={toogle ? "button-inprogress" : " "} onClick={() => settoogle(!toogle)}>
          {!toogle ? "completed" : "inprogress"}
        </button>
        <div>
        <EditOutlined className="editBtn" onClick={Props.onEdit} />
        <DeleteOutlined className="deleteBtn" onClick={Props.onDelete} />
        </div>
      </div>
      <div className="strip">

      </div>
    </div>
  );
}

export default Cardcomp;
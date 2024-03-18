import React from 'react';
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import "./style.scss";

const Card = ({employee}) => {

  return (
    <div className="card">
          <img
            src="https://i.pinimg.com/236x/da/fd/f2/dafdf25168edcb2f0e1d8702797946cc.jpg"
            alt="profile"
          />
          <div className="name">
            <p className="empName">{employee.name}</p>
            <p className="mail">{employee.email}</p>
          </div>
          <div className="icons">
            <EditFilled style={{ cursor: "pointer" }} />
            <DeleteFilled style={{ cursor: "pointer" }} />
          </div>
          <div className="infos">
            <div className="info_left">
              <div className="info">
                <p className="work">{employee.department}</p>
                <p className="title">Department</p>
              </div>
              <div className="info">
                <p className="work">{employee.dateOfJoining}</p>
                <p className="title">Date of joining</p>
              </div>
            </div>
            <div className="info_right">
              <div className="info">
                <p className="work">{employee.designation}</p>
                <p className="title">Designaion</p>
              </div>
              <div className="info">
                <p className="work">{employee.salary}</p>
                <p className="title">Salary</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Card
import React,{useState} from "react";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import "./style.scss";
import axios from "axios";

const Card = ({ employee, onDelete, addEmployeeAction, setModalOpen, state, handleUpdate }) => {
  //todo: delete the card
  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:10000/dashboard/employee/delete-data/${id}`
      );
      onDelete(id); // Remove the card from UI
      addEmployeeAction({ type: "addEmployee" }); //Remove it from database
    } catch (err) {
      console.log("delete", err);
    }
  };
  const callEditAPI = async(employeeID) => {
    let employeeInfo = {
      _id: employeeID,
      name: state.name,
      email: state.email,
      department: state.department,
      designation: state.designation,
      dateOfJoining: state.dateOfJoining,
      salary: state.salary,
    };
    try {
      let res = await axios.put(
        `http://localhost:10000/dashboard/employee/edit-data`,
        employeeInfo
      );
      handleUpdate(employeeID);
    } catch (err) {
      console.log("edit", err);
    }
  }
  //todo: edit employee details
  const handleEdit = async (id) => {
    setModalOpen(true);
    callEditAPI(id);
    handleDelete(id);
  };

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
        <EditFilled
          style={{ cursor: "pointer" }}
          onClick={() => handleEdit(employee._id)}
        />
        <DeleteFilled
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(employee._id)}
        />
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
  );
};

export default Card;

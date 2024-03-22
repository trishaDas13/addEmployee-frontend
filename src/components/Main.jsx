import React, { useState, useReducer, useEffect } from "react";
import "./style.scss";
import { Button, Modal } from "antd";
import Card from "./Card";
import axios from "axios";
import { nanoid } from "nanoid";

const initialState = {
  name: "",
  email: "",
  department: "",
  designation: "",
  dateOfJoining: "",
  salary: "",
  employees: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.fieldName]: action.payload };
    case "addEmployee":
      const newEmployee = {
        name: state.name,
        email: state.email,
        department: state.department,
        designation: state.designation,
        dateOfJoining: state.dateOfJoining,
        salary: state.salary,
      };
      return {
        ...state,
        name: "",
        email: "",
        department: "",
        designation: "",
        dateOfJoining: "",
        salary: "",
        employees: [...state.employees, newEmployee],
      };
    default:
      return state;
  }
};
const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  //todo: fetch data from api
  const getEmployee = async () => {
    try {
      let res = await axios.get(
        "https://addemployee.onrender.com/dashboard/employee/get-data"
      );
      setEmployeeList(res.data.result);
    } catch (error) {
      console.log("facing error at the of fetching data", error);
    }
  };

  //todo: post data to api
  const addEmployeeToServer = async () => {
    if (
      state.name === "" ||
      state.email === "" ||
      state.department === "" ||
      state.designation === "" ||
      state.dateOfJoining === "" ||
      state.salary === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    let employeeInfo = {
      name: state.name,
      email: state.email,
      department: state.department,
      designation: state.designation,
      dateOfJoining: state.dateOfJoining,
      salary: state.salary,
    };
    try {
      let res = await axios.post(
        "https://addemployee.onrender.com/dashboard/employee/post-data",
        employeeInfo
      );
      dispatch({ type: "addEmployee" });
      getEmployee();
      setModalOpen(false);
    } catch (err) {
      console.log("Error while adding Employee ", err);
    }
  };
  //todo: handle delete employee
  const handleDeleteFromUI = (id) => {
    setEmployeeList(employeeList.filter((employee) => employee._id !== id));
  };

  //todo: handle edit employee
  const handleUpdate = (updatedData) => {
    setEmployeeList((prevList) =>
      prevList.map((emp) => (emp._id === updatedData._id ? updatedData : emp))
    );
  };

  //todo: filter employee list
  // const filterEmployee = (e) => {
  //   const searchTerm = e.target.value.toLowerCase();
  //   const filteredEmployees = initialState.employees.filter((employee) =>
  //     employee.name.toLowerCase().includes(searchTerm)
  //   );
  //   setEmployeeList(filteredEmployees);
  //   getEmployee();
  // };

  //todo: render all data on load
  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <>
      <header className="header">
        <p>Employee Dashboard</p>
        {/* <input type="text" placeholder="Search by name..." onChange={filterEmployee}/> */}
        <button className="add" onClick={() => setModalOpen(true)}>
          + Add Employee
        </button>
      </header>
      <main className="main">
        <Modal
          title="Create new employee"
          centered
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={<Button onClick={addEmployeeToServer}>Create</Button>}
        >
          <form action="">
            <input
              type="text"
              placeholder="Name"
              className="field"
              value={state.name}
              onChange={(e) =>
                dispatch({
                  type: "updateField",
                  fieldName: "name",
                  payload: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Email ID"
              className="field"
              value={state.email}
              onChange={(e) =>
                dispatch({
                  type: "updateField",
                  fieldName: "email",
                  payload: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Department"
              className="field"
              value={state.department}
              onChange={(e) =>
                dispatch({
                  type: "updateField",
                  fieldName: "department",
                  payload: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Designation"
              className="field"
              value={state.designation}
              onChange={(e) =>
                dispatch({
                  type: "updateField",
                  fieldName: "designation",
                  payload: e.target.value,
                })
              }
            />
            <input
              type="date"
              placeholder="Date of joining"
              className="field"
              value={state.dateOfJoining}
              onChange={(e) =>
                dispatch({
                  type: "updateField",
                  fieldName: "dateOfJoining",
                  payload: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Salary"
              className="field"
              value={state.salary}
              onChange={(e) =>
                dispatch({
                  type: "updateField",
                  fieldName: "salary",
                  payload: e.target.value,
                })
              }
            />
            {/* <input type="file" /> */}
          </form>
        </Modal>

        <div className="employeeCards">
          {employeeList.map((employee, index) => (
            <Card
              key={nanoid()}
              employee={employee}
              index={index}
              onDelete={handleDeleteFromUI}
              addEmployeeAction={dispatch}
              setModalOpen={setModalOpen}
              state={state}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Main;

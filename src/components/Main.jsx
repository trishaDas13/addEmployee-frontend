import React, { useState, useReducer } from "react";
import "./style.scss";
import { Button, Modal } from "antd";
import Card from "./Card";

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
  const [state, dispatch] = useReducer(reducer, initialState);

  //todo: create button from modal
  const handleCreateEmployee = () => {
    if (
      state.name === "" ||
      state.email === "" ||
      state.department === "" ||
      state.designation === "" ||
      state.dateOfJoining === "" ||
      state.salary === ""
    ) {
      alert("Please fill in all fields");
    } else {
      dispatch({ type: "addEmployee" });
      setModalOpen(false);
    }
  };
  
  return (
    <main className="main">
      <button className="add" onClick={() => setModalOpen(true)}>
        + Add Employee
      </button>
      <Modal
        title="Create new employee"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={
          <Button
            onClick={handleCreateEmployee}
          >
            Create
          </Button>
        }
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
        {state.employees.map((employee, index) => (
          <Card key={index} employee={employee} />
        ))}
      </div>
    </main>
  );
};

export default Main;

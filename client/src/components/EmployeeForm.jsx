import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("token");
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/employees/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { name, position, department, salary } = response.data;
          setName(name);
          setPosition(position);
          setDepartment(department);
          setSalary(salary);
        } catch (error) {
          console.error("Error fetching employee data", error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (!name || !position || !department || !salary) {
        setError("Please fill out all fields");
        return;
      }
      const employeeData = { name, position, department, salary };
      if (id) {
        await axios.put(
          `http://localhost:5000/api/employees/${id}`,
          employeeData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post("http://localhost:5000/api/employees", employeeData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate("/employees");
    } catch (error) {
      console.error("Error saving employee data", error);
      setError("Failed to save employee data");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          {id ? "Edit Employee" : "Add Employee"}
        </h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter employee name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter employee position"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter employee department"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salary
          </label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter employee salary"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 font-semibold"
        >
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;

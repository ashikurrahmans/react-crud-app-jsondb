import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "axios";

const Edit = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3333/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, [students, id]);

  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };

  const studentInformation = (e) => {
    e.preventDefault();
    const studentName = e.target.name.value;
    const email = e.target.email.value;
    const id = e.target.stId.value;

    fetch(`http://localhost:3333/students/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id,
        studentName,
        email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <>
      <div className="bg-yellow-700 py-8">
        <h1 className="text-center text-white text-5xl font-bold">
          React CRUD Application
        </h1>
      </div>
      <h1 className="text-center bg-green-600 text-4xl py-5 text-white">
        Update your information
      </h1>

      <form
        className="w-full max-w-lg mx-auto my-12"
        onSubmit={studentInformation}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Student ID
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              defaultValue={id}
              name="stId"
              disabled
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Full Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              defaultValue={students.studentName}
              name="name"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Email Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="email"
              name="email"
              defaultValue={students.email}
            />
          </div>
        </div>
        <button className="btn btn-wide">Update Information</button>
        <button onClick={backToHome} className="btn btn-secondary ml-20">
          Back To Home
        </button>
      </form>
    </>
  );
};

export default Edit;

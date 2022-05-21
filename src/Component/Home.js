import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3333/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, [students]);

  const navigate = useNavigate();
  const studentInfo = (e) => {
    e.preventDefault();
    const studentName = e.target.names.value;
    const email = e.target.email.value;
    axios.post(`http://localhost:3333/students`, {
      studentName,
      email,
    });
    e.target.reset();
  };

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:3333/students/${id}`);
  };

  return (
    <div>
      <div className="bg-yellow-700 py-8">
        <h1 className="text-center text-white text-5xl font-bold">
          React CRUD Application
        </h1>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
        <div>
          <h1 className="text-center bg-green-600 text-4xl py-5 text-white">
            Add Student
          </h1>

          <form action="" className="py-4 ml-8" onSubmit={studentInfo}>
            <input
              name="names"
              type="text"
              placeholder="Your Name..."
              className="input input-bordered w-full max-w-xs my-3 "
            />
            <br />
            <input
              name="email"
              type="text"
              placeholder="Email Address..."
              className="input input-bordered w-full max-w-xs my-3"
            />
            <br />
            <button className="btn btn-wide">ADD</button>
          </form>
        </div>
        <div className="overflow-x-auto">
          <h1 className="text-center bg-orange-600 text-4xl py-5 text-white">
            All Students List
          </h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Operations</th>
                </tr>
              </thead>

              {students.map((student, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <th>{index + 1}</th>
                      <td>
                        <b>{student.studentName}</b>
                      </td>
                      <td>
                        <b>{student.email}</b>
                      </td>
                      <td className="flex">
                        <div>
                          <AiFillEye
                            onClick={() => navigate(`/student/${student.id}`)}
                            size="1.5rem"
                            color="red"
                            className="mx-4 cursor-pointer"
                          />
                        </div>
                        <div>
                          <FiEdit
                            onClick={() =>
                              navigate(`student/profile/${student.id}`)
                            }
                            size="1.5rem"
                            color="red"
                            className="mx-4 cursor-pointer"
                          />
                        </div>
                        <div>
                          <AiFillDelete
                            onClick={() => {
                              deleteStudent(student.id);
                            }}
                            size="1.5rem"
                            color="red"
                            className="mx-4 cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

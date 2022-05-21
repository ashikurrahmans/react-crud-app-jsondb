import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3333/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [id]);

  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-center text-white text-5xl font-bold bg-yellow-700 py-8">
        React CRUD Application
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="active">
              <th>ID</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-red-600">
              <th>{id}</th>
              <td>{student.studentName}</td>
              <td>{student.email}</td>
              <td>
                <Link
                  className="btn btn-active btn-link"
                  to={`/student/profile/${student.id}`}
                >
                  Edit
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={backToHome} className="btn btn-secondary">
        Back To Home
      </button>
    </div>
  );
};

export default View;

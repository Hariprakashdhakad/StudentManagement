import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, updateStudent } from "../redux/dataSlice";
import AddStudent from "./AddStudent";

const StudentsTable = ({ students }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleAddStudentClick = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <>
      <div className="mt-8">
        <button
          className="flex items-center bg-gray-700 text-white hover:bg-gray-800 font-bold py-2 px-4 rounded float-right mb-3"
          onClick={handleAddStudentClick}
        >
          <span>Add New Student</span>
        </button>

        {isModalOpen && (
          <AddStudent
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            initialData={editingStudent}
          />
        )}
      </div>

      <div className="mt-3">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Cohort</th>
              <th className="border border-gray-300 px-4 py-2">Courses</th>
              <th className="border border-gray-300 px-4 py-2">Date Joined</th>
              <th className="border border-gray-300 px-4 py-2">Last Login</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {student.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.cohort}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.courses}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(student.dateJoined))}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }).format(new Date(student.lastLogin))}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.status ? (
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full" />
                  ) : (
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full" />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEditClick(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteClick(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentsTable;

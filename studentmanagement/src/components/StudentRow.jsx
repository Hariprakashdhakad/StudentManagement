import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStudent, deleteStudent } from "../redux/dataSlice";

const StudentRow = ({ student }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: student.name,
    cohort: student.cohort,
    courses: student.courses,
    status: student.status,
  });

  const handleUpdate = () => {
    dispatch(updateStudent({ id: student.id, updatedData }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      dispatch(deleteStudent(student.id));
    }
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td className="px-4 py-2">
            <input
              type="text"
              value={updatedData.name}
              onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="text"
              value={updatedData.cohort}
              onChange={(e) => setUpdatedData({ ...updatedData, cohort: e.target.value })}
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="text"
              value={updatedData.courses}
              onChange={(e) => setUpdatedData({ ...updatedData, courses: e.target.value })}
            />
          </td>
          <td className="px-4 py-2">{student.dateJoined}</td>
          <td className="px-4 py-2">{student.lastLogin}</td>
          <td className="px-4 py-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded ml-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="px-4 py-2">{student.name}</td>
          <td className="px-4 py-2">{student.cohort}</td>
          <td className="px-4 py-2">{student.courses}</td>
          <td className="px-4 py-2">{student.dateJoined}</td>
          <td className="px-4 py-2">{student.lastLogin}</td>
          <td className="px-4 py-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded ml-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default StudentRow;

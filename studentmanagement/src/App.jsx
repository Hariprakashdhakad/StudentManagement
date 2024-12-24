import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, addStudent, updateStudent, deleteStudent } from './redux/dataSlice';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StudentsTable from './components/StudentsTable';

const App = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.data.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleAdd = (newStudent) => dispatch(addStudent(newStudent));
  const handleUpdate = (id, updatedData) => dispatch(updateStudent({ id, updatedData }));
  const handleDelete = (id) => dispatch(deleteStudent(id));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <StudentsTable
          students={students}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createClient } from '@supabase/supabase-js';

// Use import.meta.env for Vite environment variables
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const fetchStudents = createAsyncThunk('data/fetchStudents', async () => {
  const { data, error } = await supabase.from('Student').select('*');
  if (error) throw error;
  return data;
});

export const addStudent = createAsyncThunk('data/addStudent', async (student) => {
  const { data, error } = await supabase.from('Student').insert([student]);
  if (error) {
    console.error("Error adding student:", error); // Log the error for debugging
    throw error; // This will be caught in the rejected case
  }
  
  if (!data || data.length === 0) {
    throw new Error("No data returned after adding student."); // Handle case where no data is returned
  }

  return data[0]; // Return the first element of the data array
});

export const updateStudent = createAsyncThunk('data/updateStudent', async ({ id, updatedData }) => {
  const { data, error } = await supabase.from('Student').update(updatedData).eq('id', id);
  if (error) throw error;
  return data[0];
});

export const deleteStudent = createAsyncThunk('data/deleteStudent', async (id) => {
  const { error } = await supabase.from('Student').delete().eq('id', id);
  if (error) throw error;
  return id;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: { students: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students.push(action.payload); 
      })
      .addCase(addStudent.rejected, (state, action) => {
        console.error('Failed to add student:', action.error.message);
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.students[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s.id !== action.payload);
      });
  },
});

export default dataSlice.reducer;

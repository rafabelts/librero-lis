import { useEffect, useState } from 'react';
import { getStudents } from '../services/userServices';

export function useGetStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function handleStudentsFetch() {
      const students = await getStudents();
      setStudents(students);
    }

    handleStudentsFetch();
  }, []);

  return students;
}

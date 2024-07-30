import { useEffect, useState } from 'react';
import { getUsers } from '../services/userServices';

export function useGetStudents() {
  const [students, setStudents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')!);
  const userId = user.id;

  useEffect(() => {
    async function handleStudentsFetch(userId: string) {
      const data = await getUsers(userId);
      console.log(data);
      setStudents(data);
    }

    handleStudentsFetch(userId);
  }, []);

  return students;
}

import { useEffect, useState } from 'react';
import { StudentInfoContainer } from '../components/StudentInfoContainer/StudentInfoContainer';
import { getUsers } from '../services/userServices';
import { firebaseAuth } from '../firebase_options';
import { Student } from '../types';
import { useAppContext } from '../context/ctxt';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const ctxt = useAppContext();

  useEffect(() => {
    async function handleStudentsFetch(userId: string) {
      const data = await getUsers(userId);
      console.log(data);
      setStudents(data);
    }

    handleStudentsFetch(ctxt?.user?.id!);
  }, []);

  return (
    <div className="studentsGrid">
      {students.map((student: Student) => (
        <StudentInfoContainer key={student.studentId} {...student} />
      ))}
    </div>
  );
}

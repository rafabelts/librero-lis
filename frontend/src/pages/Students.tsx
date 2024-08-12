import { StudentInfoContainer } from '../components/StudentInfoContainer/StudentInfoContainer';
import { Student } from '../types';
import { useGetStudents } from '../hooks/useGetStudents';

export default function StudentsPage() {
  const students = useGetStudents();

  return students.length > 0 ? (
    <div className="studentsGrid">
      {students.map((student: Student) => (
        <StudentInfoContainer key={student.studentId} {...student} />
      ))}
    </div>
  ) : (
    <div>No se encontraron alumnos registrados</div>
  );
}

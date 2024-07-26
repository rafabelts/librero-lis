import { StudentInfoContainer } from '../components/StudentInfoContainer/StudentInfoContainer';
import { StudentData } from '../types';

export default function StudentsPage() {
  const students: Array<StudentData> = [];
  for (let i = 0; i <= 5; i++) {
    students.push({
      id: `${i}`,
      student_id: 'S23017374',
      name: 'Rafa',
      debts: 1,
    });
  }

  return (
    <div className="studentsGrid">
      {students.map((student: StudentData) => (
        <StudentInfoContainer {...student} />
      ))}
    </div>
  );
}

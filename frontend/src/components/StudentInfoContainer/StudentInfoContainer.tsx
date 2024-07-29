import { Student } from '../../types';
import styles from './StudentInfoContainer.module.css';
export function StudentInfoContainer(student: Student) {
  return (
    <div className={styles.container}>
      <h2>{student.name}</h2>
      <p>{student.studentId}</p>
      <p>No. de adeudos: {student.debts}</p>
    </div>
  );
}

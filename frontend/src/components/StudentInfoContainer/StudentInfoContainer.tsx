import { StudentData } from '../../types/index';
import styles from './StudentInfoContainer.module.css';
export function StudentInfoContainer(student: StudentData) {
  return (
    <div className={styles.container}>
      <h2>{student.name}</h2>
      <p>{student.student_id}</p>
      <p>No. de adeudos: {student.debts}</p>
    </div>
  );
}

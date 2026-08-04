interface Student {
  name: string;
  grade: number;
  id: number;
}

const students: Student[] = [
  { name: "Олена", grade: 92, id: 1 },
  { name: "Максим", grade: 67, id: 2 },
  { name: "Софія", grade: 78, id: 3 },
  { name: "Ігор", grade: 30, id: 4 },
];

export default function Stud() {
  const listStudents = students.map((student: Student) => (
    <li
      key={student.id}
      style={{
        color: student.grade > 70 ? "green" : student.grade > 50 ? "orange" : "red"
      }}
    >
      {student.name} — {student.grade}
    </li>
  ));

  return <ul>{listStudents}</ul>;
}
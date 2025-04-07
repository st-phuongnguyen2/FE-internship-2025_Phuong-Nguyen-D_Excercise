// Giả sử bạn có một mảng các học sinh, mỗi học sinh có name, group, và score.
// Bạn cần tính điểm trung bình của mỗi nhóm (group).

// {
//   A: 85.67,
//   B: 84.33,
//   C: 82.00
// }

const students = [
  { name: 'Alice', group: 'A', score: 85 },
  { name: 'Bob', group: 'B', score: 92 },
  { name: 'Charlie', group: 'A', score: 78 },
  { name: 'David', group: 'C', score: 91 },
  { name: 'Eve', group: 'B', score: 88 },
  { name: 'Frank', group: 'A', score: 94 },
  { name: 'Grace', group: 'C', score: 75 },
  { name: 'Hannah', group: 'B', score: 77 },
  { name: 'Isaac', group: 'C', score: 80 }
];

function calculateGroupAverage(students) {
  const groupStudents = {};

  students.forEach((item) => {
    if (groupStudents[item.group]) {
      groupStudents[item.group].push(item.score);
    } else {
      groupStudents[item.group] = [item.score];
    }
  });

  for (const key in groupStudents) {
    const sum = groupStudents[key].reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    groupStudents[key] = Number((sum / groupStudents[key].length).toFixed(2));
  }

  return groupStudents;
}

console.log('exercise 2:', calculateGroupAverage(students));

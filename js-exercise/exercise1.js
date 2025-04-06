// teen: từ 13 đến 19 tuổi
// adult: từ 20 đến 64 tuổi
// senior: từ 65 tuổi trở lên

// {
//   teen: ['A', 'E'],
//   adult: ['B', 'D'],
//   senior: ['C']
// }

const users = [
  { name: 'A', age: 16 },
  { name: 'B', age: 24 },
  { name: 'C', age: 70 },
  { name: 'D', age: 40 },
  { name: 'E', age: 13 }
];

function groupByAgeUsingForEach(users) {
  const newUser = {
    teen: [],
    adult: [],
    senior: []
  };

  users.forEach((item) => {
    if (item.age >= 13 && item.age <= 19) {
      newUser.teen.push(item.name);
    } else if (item.age >= 20 && item.age <= 64) {
      newUser.adult.push(item.name);
    } else if (item.age >= 65) {
      newUser.senior.push(item.name);
    }
  });

  return newUser;
}

function groupByAgeUsingReduce(users) {
  const newUser = {
    teen: [],
    adult: [],
    senior: []
  };

  return users.reduce((acc, cur) => {
    if (cur.age >= 13 && cur.age <= 19) {
      acc.teen.push(cur.name);
    } else if (cur.age >= 20 && cur.age <= 64) {
      acc.adult.push(cur.name);
    } else if (cur.age >= 65) {
      acc.senior.push(cur.name);
    }

    return acc;
  }, newUser);
}

console.log(groupByAgeUsingForEach(users));
console.log(groupByAgeUsingReduce(users));

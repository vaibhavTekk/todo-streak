// const exampledates = [
//   { dateCompleted: "2023-05-06T07:08:06.655Z" },
//   { dateCompleted: "2023-05-03T07:08:06.655Z" },
//   { dateCompleted: "2023-05-02T07:22:35.487Z" },
//   { dateCompleted: "2023-05-01T07:31:56.287Z" },
//   { dateCompleted: "2023-04-04T07:31:56.287Z" },
//   { dateCompleted: "2023-04-30T07:31:56.287Z" },
//   { dateCompleted: "2023-04-27T07:31:56.287Z" },
//   { dateCompleted: "2023-04-28T07:31:56.287Z" },
//   { dateCompleted: "2023-04-08T07:31:56.287Z" },
//   { dateCompleted: "2023-04-16T07:31:56.287Z" },
//   { dateCompleted: "2023-04-15T07:31:56.287Z" },
//   { dateCompleted: "2023-04-14T07:31:56.287Z" },
//   { dateCompleted: "2023-04-23T07:31:56.287Z" },
//   { dateCompleted: "2023-04-19T07:31:56.287Z" },
//   { dateCompleted: "2023-04-03T07:08:06.655Z" },
//   { dateCompleted: "2023-04-02T07:22:35.487Z" },
//   { dateCompleted: "2023-04-01T07:31:56.287Z" },
// ];

const calculateStreak = (dateList) => {
  let currentStreak = 0;
  let maxStreak = 0;
  let prevStreak = 0;
  let today = new Date().setUTCHours(0, 0, 0, 0);
  dateList = dateList
    .map((e) => {
      const d = new Date(e.dateCompleted).setUTCHours(0, 0, 0, 0);
      return d;
    })
    .sort();
  //console.log(dateList.map((e) => new Date(e)));
  let arr = [];
  for (let i = 1; i < dateList.length; i++) {
    arr.push((dateList[i] - dateList[i - 1]) / 86400000);
  }
  //console.log(arr);
  let streaks = [];
  let streak = 0;
  let i = 0;
  let j = 1;
  while (j < arr.length) {
    if (arr[i] == arr[j]) {
      if (arr[i] == 1) {
        streak += 1;
      }
    } else {
      if (arr[i] == 1) {
        streak += 1;
        streaks.push(streak + 1);
        streak = 0;
      }
    }
    if (j == arr.length - 1) {
      if (arr[j] == 1) {
        streak += 1;
        streaks.push(streak + 1);
      }
    }
    i++;
    j++;
  }
  //console.log(streaks);
  if (streaks.length > 0) {
    if (dateList.at(-1) == today && arr.at(-1) == 1) {
      currentStreak = streaks.at(-1);
    } else {
      currentStreak = 0;
    }
    maxStreak = Math.max(...streaks);
    prevStreak = streaks.at(-1);
    //console.log(currentStreak, maxStreak, prevStreak);
  }
  return { currentStreak, maxStreak, prevStreak };
};

const { currentStreak, maxStreak, prevStreak } = calculateStreak(exampledates);
console.log(currentStreak, maxStreak, prevStreak);

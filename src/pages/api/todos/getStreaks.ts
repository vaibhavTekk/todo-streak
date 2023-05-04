/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const removeDuplicates = (arr: any) => {
  const set = new Set(arr);
  return [...set];
};
const calculateStreak = (dateList: any) => {
  let currentStreak: number | undefined = 0;
  let maxStreak: number = 0;
  let prevStreak: number | undefined = 0;
  let today = new Date().setUTCHours(0, 0, 0, 0);
  dateList = dateList
    .map((e: any) => {
      const d = new Date(e.dateCompleted).setUTCHours(0, 0, 0, 0);
      return d;
    })
    .sort();
  dateList = removeDuplicates(dateList);
  // console.log(dateList.map((e: number) => new Date(e)));
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
    if (arr.length == 1) {
      if (arr[i] == 1) {
        streak += 1;
      }
    } else {
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
  console.log(streaks, arr);
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const response = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
        completed: true,
        NOT: {
          dateCompleted: null,
        },
      },
      select: {
        dateCompleted: true,
      },
    });
    const { currentStreak, maxStreak, prevStreak } = calculateStreak(response);
    // console.log(response);
    // console.log(currentStreak, maxStreak, prevStreak);
    res.status(200).json({ currentStreak, maxStreak, prevStreak });
  } else {
    res.status(400).send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
};

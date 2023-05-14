/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  let date: Date | null = new Date();
  let score: number = 0;
  if (req.body.checked === true) {
    date = null;
    score = -10;
  } else {
    score = 10;
  }

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
    //console.log(streaks, arr);
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

  if (session) {
    const transaction = async (req: NextApiRequest, res: NextApiResponse) => {
      const result = await prisma.$transaction(async (tx) => {
        // 1. Update Todo
        const result = await prisma.todo.update({
          where: {
            id: req.body.id,
          },
          data: {
            completed: !req.body.checked,
            dateCompleted: date,
          },
        });
        //3. Fetch Dates Data
        const streaks = await prisma.todo.findMany({
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
        //4. Calculate Streaks
        const { currentStreak, maxStreak, prevStreak } = calculateStreak(streaks);
        //5. Update Score
        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            score: { increment: score },
            maxStreak,
            currentStreak,
            prevStreak,
          },
        });
        return result;
      });
      return result;
    };

    transaction(req, res)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        res.status(400).send({
          error: "Database Error",
        });
      });
  } else {
    res.status(400).send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
};

/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  let date: Date | null = new Date();
  if (req.body.checked === true) {
    date = null;
  }
  if (session) {
    await prisma.todo.update({
      where: {
        id: req.body.id,
      },
      data: {
        completed: !req.body.checked,
        dateCompleted: date,
      },
    });
    let score: number = 0;
    if (req.body.checked == true) {
      score = -10;
    } else {
      score = 10;
    }
    const resp = await prisma.user
      .update({
        where: {
          id: session.user.id,
        },
        data: {
          score: { increment: score },
        },
      })
      .then((response) => res.status(200).json(response))
      .catch((err) =>
        res.status(400).send({
          error: "Error Connecting to database",
        })
      );
  } else {
    res.status(400).send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
};

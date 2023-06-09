/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    await prisma.user
      .findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          score: true,
          maxStreak: true,
          currentStreak: true,
          prevStreak: true,
        },
      })
      .then((stats) => {
        //console.log(stats);
        res.status(200).json({ ...stats });
      })
      .catch((err) => res.status(400).json({ error: "Error connecting to database", err }));
  } else {
    res.status(400).send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
};

/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/db/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    await prisma
      .$transaction([
        prisma.todo.create({
          data: {
            title: req.body.title as string,
            completed: false,
            userId: session.user.id,
          },
        }),
        prisma.user.update({
          where: {
            id: session.user.id as string,
          },
          data: {
            score: {
              increment: 5,
            },
          },
        }),
      ])
      .then((response) => {
        res.status(200).json(response);
      })
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

/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "@/db/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const response = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        User: true,
      },
    });
    res.status(200).json(response);
  } else {
    res.status(400).send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
};

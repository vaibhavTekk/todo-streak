import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { prisma } from "@/db/prisma";

export default async function follow(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const userID = req.query;
    console.log(userID);
    await prisma.user
      .update({
        where: {
          id: session.user.id,
        },
        data: { following: { connect: [{ id: userID.id as string }] } },
      })
      .then((response) => res.status(200).json(response))
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          error: "Error Connecting to database",
        });
      });
  } else {
    res.status(400).send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
}

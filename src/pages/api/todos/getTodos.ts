import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

// export default async function getTodos(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const response = await prisma.todo.findMany({
//       where: {
//         userId: req.query.userid as string,
//       },
//     });
//     console.log(response);
//     res.status(200).json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// }

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    console.log(session.user);
    const response = await prisma.todo.findMany({
      where: {
        User: session.user,
      },
    });
    res.status(200).json(response);
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
};

import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function Create(req: NextApiRequest, res: NextApiResponse) {
  const todo = await prisma.todo.create({
    data:{
        title:req.body.title,
    }
  });
}

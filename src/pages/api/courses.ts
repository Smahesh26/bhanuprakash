// pages/api/courses.ts
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const courses = await prisma.subject.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  res.status(200).json(courses);
}

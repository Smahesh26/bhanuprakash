import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid subject id' });
  }

  try {
    const subject = await prisma.subject.findFirst({
      where: {
        name: {
          equals: id,
          mode: 'insensitive',
        },
      },
      include: {
        chapters: {
          include: {
            topics: {
              include: {
                subtopics: {
                  include: {
                    mcqs: true,
                  },
                },
                mcqs: true,
              },
            },
          },
        },
      },
    });

    if (!subject) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.status(200).json({
      name: subject.name,
      chapters: subject.chapters.map((ch) => ({
        title: ch.title,
        topics: ch.topics.map((tp) => ({
          title: tp.title,
          youtubeUrl: tp.youtubeUrl,
          pdfUrl: tp.pdfUrl,
          mcqs: (tp.mcqs || []).map((mcq) => ({
            question: mcq.question,
            options: mcq.options,
            correctIndex: mcq.correctIndex,
          })),
          subtopics: tp.subtopics.map((sub) => ({
            title: sub.title,
            youtubeUrl: sub.youtubeUrl,
            pdfUrl: sub.pdfUrl,
            mcqUrl: sub.mcqUrl,
            caseStudyUrl: sub.caseStudyUrl,
            pdfAccess: sub.pdfAccess,
            mcqs: (sub.mcqs || []).map((mcq) => ({
              question: mcq.question,
              options: mcq.options,
              correctIndex: mcq.correctIndex,
            })),
          })),
        })),
      })),
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

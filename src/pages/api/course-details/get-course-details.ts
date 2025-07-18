import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// Add type definitions for better TypeScript support
interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
}

interface Subtopic {
  title: string;
  youtubeUrl?: string | null;
  pdfUrl?: string | null;
  mcqUrl?: string | null;
  caseStudyUrl?: string | null;
  pdfAccess?: string | null;
  mcqs: MCQ[];
}

interface Topic {
  title: string;
  youtubeUrl?: string | null;
  pdfUrl?: string | null;
  mcqs: MCQ[];
  subtopics: Subtopic[];
}

interface Chapter {
  title: string;
  topics: Topic[];
}

interface Subject {
  name: string;
  chapters: Chapter[];
}

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
      id: id,
      name: subject.name,
      chapters: subject.chapters.map((ch: any) => ({
        title: ch.title,
        topics: ch.topics.map((tp: any) => ({
          title: tp.title,
          youtubeUrl: tp.youtubeUrl,
          pdfUrl: tp.pdfUrl,
          mcqs: (tp.mcqs || []).map((mcq: any) => ({
            question: mcq.question,
            options: mcq.options,
            correctIndex: mcq.correctIndex,
          })),
          subtopics: tp.subtopics.map((sub: any) => ({
            title: sub.title,
            youtubeUrl: sub.youtubeUrl,
            pdfUrl: sub.pdfUrl,
            mcqUrl: sub.mcqUrl,
            caseStudyUrl: sub.caseStudyUrl,
            pdfAccess: sub.pdfAccess,
            mcqs: (sub.mcqs || []).map((mcq: any) => ({
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

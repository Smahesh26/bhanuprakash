import { NextResponse } from "next/server";

// Sample curriculum data for testing
const sampleCurriculumData = {
  "react": {
    id: "1",
    subject: "react",
    chapters: [
      {
        chapter: "Chapter 1: Introduction to React",
        topics: [
          {
            topic: "What is React?",
            hasSubtopics: false,
            youtubeUrl: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
            pdf: "https://example.com/react-intro.pdf",
            mcqs: [
              {
                question: "What is React primarily used for?",
                options: ["Backend development", "Frontend development", "Database management", "Server configuration"],
                description: "React is a JavaScript library for building user interfaces, primarily for frontend development."
              }
            ]
          },
          {
            topic: "Components and JSX",
            hasSubtopics: true,
            subtopics: [
              {
                title: "Understanding Components",
                youtubeUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY",
                pdf: "https://example.com/components.pdf",
                mcqs: [
                  {
                    question: "What are React components?",
                    options: ["Functions or classes", "CSS files", "HTML templates", "Database schemas"],
                    description: "React components are reusable pieces of code that return JSX elements to be rendered."
                  }
                ]
              },
              {
                title: "JSX Syntax",
                youtubeUrl: "https://www.youtube.com/watch?v=7fPXI_MnBOY",
                caseStudy: "https://example.com/jsx-case-study.pdf"
              }
            ]
          }
        ]
      },
      {
        chapter: "Chapter 2: React Hooks",
        topics: [
          {
            topic: "useState Hook",
            hasSubtopics: false,
            youtubeUrl: "https://www.youtube.com/watch?v=O6P86uwfdR0",
            pdf: "https://example.com/usestate.pdf",
            mcqs: [
              {
                question: "What does useState return?",
                options: ["A string", "An array with state value and setter", "A function", "An object"],
                description: "useState returns an array with the current state value and a function to update it."
              }
            ]
          }
        ]
      }
    ],
    createdAt: new Date().toISOString()
  },
  "javascript": {
    id: "2", 
    subject: "javascript",
    chapters: [
      {
        chapter: "Chapter 1: JavaScript Fundamentals",
        topics: [
          {
            topic: "Variables and Data Types",
            hasSubtopics: false,
            youtubeUrl: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
            pdf: "https://example.com/js-variables.pdf"
          }
        ]
      }
    ],
    createdAt: new Date().toISOString()
  }
};

export async function GET(req: Request, context: { params: Promise<{ subject: string }> }) {
  const { subject } = await context.params;
  try {
    // For demo purposes, return sample data
    const curriculumData = sampleCurriculumData[subject.toLowerCase() as keyof typeof sampleCurriculumData];
    
    if (!curriculumData) {
      return NextResponse.json({ error: "Curriculum not found for subject: " + subject }, { status: 404 });
    }
    
    return NextResponse.json(curriculumData);
    
    // Commented out the database code since Prisma client is not available
    /*
    const item = await prisma.curriculum.findFirst({
      where: { subject: { equals: subject, mode: "insensitive" } },
    });
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    // Parse the chapters JSON and return it in the expected format
    const parsedChapters = typeof item.chapters === 'string' 
      ? JSON.parse(item.chapters) 
      : item.chapters;
    
    return NextResponse.json({
      id: item.id,
      subject: item.subject,
      chapters: parsedChapters,
      createdAt: item.createdAt
    });
    */
  } catch (error) {
    console.error("Error fetching curriculum:", error);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
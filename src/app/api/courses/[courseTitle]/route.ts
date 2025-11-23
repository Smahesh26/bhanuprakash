import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch course by title
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseTitle: string }> }
) {
  try {
    const { courseTitle } = await params;

    if (!courseTitle) {
      return NextResponse.json(
        { error: "Course title is required" },
        { status: 400 }
      );
    }

    const decodedTitle = decodeURIComponent(courseTitle);

    // First try to find a course
    let course = await prisma.course.findFirst({
      where: {
        title: {
          contains: decodedTitle,
          mode: "insensitive",
        },
      },
    });

    // If no course found, try to find curriculum with matching subject
    if (!course) {
      const curriculum = await prisma.curriculum.findFirst({
        where: {
          subject: {
            contains: decodedTitle,
            mode: "insensitive",
          },
        },
      });

      if (curriculum) {
        // Create a course object from curriculum data
        course = {
          id: curriculum.id,
          title: curriculum.subject,
          category: "Medical Education",
          description: `Complete course on ${curriculum.subject}`,
          thumb: "/assets/img/courses/course_thumb01.jpg", // Default thumb
          instructors: "Dr. Bhanu Prakash",
          price: 29.99,
          videoUrl: (curriculum as any).introVideoUrl || null,
          createdAt: curriculum.createdAt,
          updatedAt: curriculum.updatedAt,
        };
      }
    }

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainCourseDetailsPage() {
  const params = useParams();
  const subject = params ? params["subject"] : undefined;
  type MainCourse = {
    title?: string;
    description?: string;
    error?: string;
    // Add other properties as needed
  };
  const [mainCourse, setMainCourse] = useState<MainCourse | null>(null);

  useEffect(() => {
    if (!subject) return;
    fetch(`/api/main-courses/${subject}`)
      .then(res => res.json())
      .then(setMainCourse);
  }, [subject]);

  if (!mainCourse) return <div>Loading…</div>;
  if (mainCourse.error) return <div>Course not found.</div>;

  return (
    <div>
      <h1>{mainCourse.title}</h1>
      <p>{mainCourse.description}</p>
      {/* Render chapters, topics, etc. */}
    </div>
  );
}
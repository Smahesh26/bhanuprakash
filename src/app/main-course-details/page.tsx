// src/app/main-course-details/[id]/page.tsx
"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MainCourseDetailsPage() {
  const router = useRouter();
  // For App Router, we'd need to get the ID from params if this was a dynamic route
  // For now, let's handle it differently since this appears to be a static route
  const [id, setId] = useState<string | null>(null);
  type MainCourse = { title: string; /* add other properties as needed */ };
  const [mainCourse, setMainCourse] = useState<MainCourse | null>(null);

  useEffect(() => {
    // Extract ID from URL or handle the routing properly
    // This is a temporary fix for the build error
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    setId(courseId);
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/main-courses/${id}`)
      .then(res => res.json())
      .then(setMainCourse);
  }, [id]);

  if (!mainCourse) return <div>Loading…</div>;

  return (
    <div>
      <h1>{mainCourse.title}</h1>
      {/* Render anatomy, chapters, topics, etc. */}
    </div>
  );
}
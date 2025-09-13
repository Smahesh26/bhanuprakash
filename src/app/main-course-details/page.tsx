// src/app/main-course-details/[id]/page.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MainCourseDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  type MainCourse = { title: string; /* add other properties as needed */ };
  const [mainCourse, setMainCourse] = useState<MainCourse | null>(null);

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
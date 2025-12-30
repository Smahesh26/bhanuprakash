import { PrismaClient } from '@prisma/client';
import { generateCourseSlug } from '../src/lib/slugify';

const prisma = new PrismaClient();

async function generateSlugsForExistingCourses() {
  console.log('🔄 Generating slugs for existing courses...');

  const courses = await prisma.course.findMany({
    where: {
      slug: null
    },
    include: {
      instructor: true
    }
  });

  console.log(`📊 Found ${courses.length} courses without slugs`);

  for (const course of courses) {
    const instructorName = course.instructor.name || course.instructor.role || 'instructor';
    let slug = generateCourseSlug(course.title, instructorName);

    // Check if slug exists and make it unique if needed
    let counter = 1;
    let uniqueSlug = slug;
    while (await prisma.course.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    await prisma.course.update({
      where: { id: course.id },
      data: { slug: uniqueSlug }
    });

    console.log(`✅ Updated course "${course.title}" with slug: ${uniqueSlug}`);
  }

  console.log('✨ Done! All courses now have slugs.');
}

generateSlugsForExistingCourses()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

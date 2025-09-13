import { selectCourses } from "@/redux/features/courseSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating';
import Link from "next/link";

const CourseSidebar = ({ setCourses }: any) => {

   const [showMoreCategory, setShowMoreCategory] = useState(false);
   const [showMoreLanguage, setShowMoreLanguage] = useState(false);
   const [showMoreInstructor, setShowMoreInstructor] = useState(false);

   const [categorySelected, setCategorySelected] = useState('');
   const [languageSelected, setLanguageSelected] = useState('');
   const [priceSelected, setPriceSelected] = useState('');
   const [skillSelected, setSkillSelected] = useState('');
   const [instructorSelected, setInstructorSelected] = useState('');
   const [ratingSelected, setRatingSelected] = useState<number | null>(null);

   // Ensure courses is always an array
   const rawCourses = useSelector(selectCourses);
   const courses = Array.isArray(rawCourses) ? rawCourses : [];

   const categoryFilter = courses.map(course => course.category);
   const languageFilter = courses.map(course => course.language);
   const priceFilter = courses.map(course => course.price_type);
   const skillFilter = courses.map(course => course.skill_level);
   const instructorFilter = courses.map(course => course.instructors);

   const allCourses = courses;

   const allCategory = [ ...new Set(categoryFilter)];
   const allLanguage = ['All Language', ...new Set(languageFilter)];
   const allPrice = ['All Price', ...new Set(priceFilter)];
   const allSkill = ['All Skill', ...new Set(skillFilter)];
   const allInstructor = ['All Instructors', ...new Set(instructorFilter)];

   // Handle category selection
   const handleCategory = async (category: string) => {
      setCategorySelected(prevCategory => prevCategory === category ? '' : category);

      // If "All Category" or deselect, fetch all courses
      if (category === categorySelected || category === 'All Category') {
         // Optionally fetch all courses from backend
         // const res = await fetch('/api/courses');
         // const data = await res.json();
         // setCourses(data);
         filterCourses({ category: '', language: languageSelected, price: priceSelected, rating: ratingSelected, skill: skillSelected, instructor: instructorSelected });
         return;
      }

      // Fetch courses by category/subject from backend
      try {
         const res = await fetch(`/api/courses?category=${encodeURIComponent(category)}`);
         if (res.ok) {
            const data = await res.json();
            setCourses(data);
         } else {
            // fallback to local filter if API fails
            filterCourses({ category, language: languageSelected, price: priceSelected, rating: ratingSelected, skill: skillSelected, instructor: instructorSelected });
         }
      } catch (e) {
         // fallback to local filter on error
         filterCourses({ category, language: languageSelected, price: priceSelected, rating: ratingSelected, skill: skillSelected, instructor: instructorSelected });
      }
   };

   // Handle language selection
   const handleLanguage = (language: string) => {
      setLanguageSelected(prevLanguage => prevLanguage === language ? '' : language);
      filterCourses({ category: categorySelected, language: language === languageSelected ? '' : language, price: priceSelected, rating: ratingSelected, skill: skillSelected, instructor: instructorSelected });
   };

   // Handle price selection
   const handlePrice = (price: string) => {
      setPriceSelected(prevPrice => prevPrice === price ? '' : price);
      filterCourses({ category: categorySelected, language: languageSelected, price: price === priceSelected ? '' : price, rating: ratingSelected, skill: skillSelected, instructor: instructorSelected });
   };

   // Handle skill selection
   const handleSkill = (skill: string) => {
      setSkillSelected(prevSkill => prevSkill === skill ? '' : skill);
      filterCourses({ category: categorySelected, language: languageSelected, price: priceSelected, skill: skill === skillSelected ? '' : skill, rating: ratingSelected, instructor: instructorSelected });
   };

   // Handle Instructor selection
   const handleInstructor = (instructor: string) => {
      setInstructorSelected(instructor);
      filterCourses({ category: categorySelected, language: languageSelected, price: priceSelected, rating: ratingSelected, skill: skillSelected, instructor });
   };

   // Handle rating selection
   const handleRating = (rating: number) => {
      setRatingSelected(prevRating => prevRating === rating ? null : rating);
      filterCourses({ category: categorySelected, language: languageSelected, price: priceSelected, rating: rating === ratingSelected ? null : rating, skill: skillSelected, instructor: instructorSelected });
   };

   // Filter courses based on selected criteria
   const filterCourses = ({ category, language, price, rating, skill, instructor }: any) => {
      let filteredCourses = allCourses;

      if (category && category !== 'All Category') {
         filteredCourses = filteredCourses.filter(course => course.category === category);
      }

      if (language && language !== 'All Language') {
         filteredCourses = filteredCourses.filter(course => course.language === language);
      }

      if (price && price !== 'All Price') {
         filteredCourses = filteredCourses.filter(course => course.price_type === price);
      }

      if (skill && skill !== 'All Skill') {
         filteredCourses = filteredCourses.filter(course => course.skill_level === skill);
      }

      if (instructor && instructor !== 'All Instructors') {
         filteredCourses = filteredCourses.filter(course => course.instructors === instructor);
      }

      if (rating) {
         filteredCourses = filteredCourses.filter(course => course.rating >= rating);
      }

      setCourses(filteredCourses);
   };

   // Determine categories to display based on "Show More" toggle
   const categoriesToShow = showMoreCategory ? allCategory : allCategory.slice(0, 8);
   const languageToShow = showMoreLanguage ? allLanguage : allLanguage.slice(0, 4);
   const instructorToShow = showMoreInstructor ? allInstructor : allInstructor.slice(0, 4);

   return (
      <div className="col-xl-3 col-lg-4">
         <aside className="courses__sidebar">
            <div className="courses-widget">
               <h4 className="widget-title">Categories</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {categoriesToShow.map((category: any, i: any) => (
                        <li key={i}>
                           <div className="form-check">
                              <input className="form-check-input" type="checkbox" checked={category === categorySelected} readOnly id={`cat_${i}`} />
                              {/* Link to /course-details/[category] */}
                              <label className="form-check-label" htmlFor={`cat_${i}`}>
                                 <Link href={`/course-details/${encodeURIComponent(category)}`}>
                                    {category}
                                 </Link>
                              </label>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className="show-more">
                     <a className={`show-more-btn ${showMoreCategory ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => setShowMoreCategory(!showMoreCategory)}>
                        {showMoreCategory ? "Show Less -" : "Show More +"}
                     </a>
                  </div>
               </div>
            </div>

            {/* Language Filter */}
            {/* <div className="courses-widget">
               <h4 className="widget-title">Languages</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {languageToShow.map((language: any, i: any) => (
                        <li key={i}>
                           <div onClick={() => handleLanguage(language)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={language === languageSelected} readOnly id={`lang_${i}`} />
                              <label className="form-check-label" htmlFor={`lang_${i}`} onClick={() => handleLanguage(language)}>{language}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className="show-more">
                     <a className={`show-more-btn ${showMoreLanguage ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => setShowMoreLanguage(!showMoreLanguage)}>
                        {showMoreLanguage ? "Show Less -" : "Show More +"}
                     </a>
                  </div>
               </div>
            </div> */}

            {/* Price Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Price</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {allPrice.map((price: any, i: any) => (
                        <li key={i}>
                           <div onClick={() => handlePrice(price)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={price === priceSelected} readOnly id={`price_${i}`} />
                              <label className="form-check-label" htmlFor={`price_${i}`} onClick={() => handlePrice(price)}>{price}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Skill Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Skill level</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {allSkill.map((skill: any, i: any) => (
                        <li key={i}>
                           <div onClick={() => handleSkill(skill)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={skill === skillSelected} readOnly id={`skill_${i}`} />
                              <label className="form-check-label" htmlFor={`skill_${i}`} onClick={() => handleSkill(skill)}>{skill}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Instructors Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Instructors</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {instructorToShow.map((instructor: any, i: any) => (
                        <li key={i}>
                           <div onClick={() => handleInstructor(instructor)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={instructor === instructorSelected} readOnly id={`instructor_${i}`} />
                              <label className="form-check-label" htmlFor={`instructor_${i}`} onClick={() => handleInstructor(instructor)}>{instructor}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className="show-more">
                     <a className={`show-more-btn ${showMoreInstructor ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => setShowMoreInstructor(!showMoreInstructor)}>
                        {showMoreInstructor ? "Show Less -" : "Show More +"}
                     </a>
                  </div>
               </div>
            </div>

            {/* Rating Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Ratings</h4>
               <div className="courses-rating-list">
                  <ul className="list-wrap">
                     {[5, 4, 3, 2, 1].map((rating, i) => (
                        <li key={i}>
                           <div onClick={() => handleRating(rating)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={rating === ratingSelected} readOnly id={`rating_${i}`} />
                              <label className="form-check-label" htmlFor={`rating_${i}`} onClick={() => handleRating(rating)}>
                                 <div className="rating">
                                    <Rating initialValue={rating} size={20} readonly />
                                 </div>
                              </label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </aside>
      </div>
   );
}

export default CourseSidebar;
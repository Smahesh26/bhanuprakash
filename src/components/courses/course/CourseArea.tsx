'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CourseSidebar from './CourseSidebar';
import CourseTop from './CourseTop';

const CourseArea = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from API
  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data || []);
        setLoading(false);
      });
  }, []);

  const itemsPerPage = 12;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = courses.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(courses.length / itemsPerPage);
  const startOffset = itemOffset + 1;
  const totalItems = courses.length;

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % courses.length;
    setItemOffset(newOffset);
  };

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: any) => setActiveTab(index);

  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "",
    thumb: "",
    instructors: "",
    rating: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      // Refresh courses after upload
      fetch("/api/courses")
        .then((res) => res.json())
        .then((data) => setCourses(data || []));
    } catch (err) {
      alert("Upload failed!");
    }
  };

  return (
    <section className="all-courses-area section-py-120">
      <div className="container">
        <div className="row">
          <CourseSidebar setCourses={setCourses} />
          <div className="col-xl-9 col-lg-8">
            <CourseTop
              startOffset={startOffset}
              endOffset={Math.min(endOffset, totalItems)}
              totalItems={totalItems}
              setCourses={setCourses}
              handleTabClick={handleTabClick}
              activeTab={activeTab}
            />
            <div className="tab-content" id="myTabContent">
              <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="grid">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="row row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
                    {currentItems.map((item: any) => (
                      <div key={item.id} className="col">
                        <div className="courses__item shine__animate-item">
                          <div className="courses__item-thumb">
                            <Link href={`/course-details/${item.title}`}>
                              <Image src={item.thumb} alt="img" width={370} height={150} />
                            </Link>
                          </div>
                          <div className="courses__item-content">
                            <ul className="courses__item-meta list-wrap">
                              <li className="courses__item-tag">
                                <Link href="/course">{item.category}</Link>
                              </li>
                              <li className="avg-rating">
                                <i className="fas fa-star"></i> ({item.rating} Reviews)
                              </li>
                            </ul>
                            <h5 className="title">
                              <Link href={`/course-details/${item.title}`}>{item.title}</Link>
                            </h5>
                            <p className="author">By <Link href="#">{item.instructors}</Link></p>
                            <div className="courses__item-bottom">
                              <div className="button">
                                <Link href={`/course-details/${item.title}`}>
                                  <span className="text">Get Started</span>
                                  <i className="flaticon-arrow-right"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <nav className="pagination__wrap mt-30">
                  <ReactPaginate
                    breakLabel="..."
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    className="list-wrap"
                  />
                </nav>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseArea;

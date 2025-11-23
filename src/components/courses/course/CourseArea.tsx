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
    <section className="all-courses-area section-py-120" style={{ backgroundColor: '#f8fafc' }}>
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
                  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                    <div className="spinner-border" style={{ color: "#0d447a" }} role="status">
                      <span className="visually-hidden">Loading courses...</span>
                    </div>
                  </div>
                ) : (
                  <div className="row g-4">
                    {currentItems.map((item: any) => (
                      <div key={item.id} className="col-xl-4 col-lg-6 col-md-6">
                        <div className="course-card">
                          <Link href={`/course-details/${item.title}`} className="text-decoration-none">
                            <div className="course-image-wrapper">
                              <Image 
                                src={item.thumb} 
                                alt={item.title} 
                                width={400} 
                                height={250} 
                                className="course-image"
                              />
                              <div className="course-overlay">
                                <div className="course-category">
                                  {item.category}
                                </div>
                              </div>
                            </div>
                            
                            <div className="course-content">
                              <h5 className="course-title">
                                {item.title}
                              </h5>
                              
                              <div className="course-meta">
                                <div className="course-instructor">
                                  <i className="fas fa-user-circle"></i>
                                  <span>By {item.instructors}</span>
                                </div>
                              </div>
                              
                              <div className="course-footer">
                                <div className="course-button">
                                  <span>Learn More</span>
                                  <i className="fas fa-arrow-right"></i>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Pagination */}
                {!loading && courses.length > itemsPerPage && (
                  <nav className="pagination-wrapper mt-5">
                    <ReactPaginate
                      breakLabel="..."
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      pageCount={pageCount}
                      className="pagination-list"
                      activeClassName="active"
                      previousLabel="←"
                      nextLabel="→"
                    />
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .course-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          border: 2px solid #f1f5f9;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .course-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0d447a 0%, #5dba47 100%);
          transition: opacity 0.3s ease;
        }

        .course-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(13, 68, 122, 0.15);
          border-color: #0d447a;
        }

        .course-image-wrapper {
          position: relative;
          overflow: hidden;
          height: 200px;
        }

        .course-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .course-card:hover .course-image {
          transform: scale(1.05);
        }

        .course-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(13, 68, 122, 0.85) 0%,
            rgba(93, 186, 71, 0.75) 100%
          );
          display: flex;
          align-items: flex-end;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .course-card:hover .course-overlay {
          opacity: 1;
        }

        .course-category {
          background: #ffffff;
          color: #0d447a;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .course-content {
          padding: 24px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .course-title {
          color: #0d447a;
          font-family: 'Poppins', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 0;
          text-align: left;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 1.6rem;
          letter-spacing: 0.3px;
        }

        .course-meta {
          text-align: left;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin: 16px 0;
        }

        .course-instructor {
          color: #64748b;
          font-size: 13px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.2px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .course-instructor i {
          color: #5dba47;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .course-card:hover .course-instructor i {
          color: #0d447a;
          transform: scale(1.1);
        }

        .course-footer {
          display: flex;
          justify-content: flex-start;
        }

        .course-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #0d447a 0%, #5dba47 100%);
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.4px;
          border: none;
          width: fit-content;
          box-shadow: 0 4px 15px rgba(13, 68, 122, 0.2);
        }

        .course-card:hover .course-button {
          background: linear-gradient(135deg, #5dba47 0%, #0d447a 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(93, 186, 71, 0.3);
        }

        .course-button i {
          font-size: 11px;
          transition: transform 0.3s ease;
        }

        .course-card:hover .course-button i {
          transform: translateX(3px);
        }

        /* Pagination Styles */
        .pagination-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 50px;
        }

        .pagination-list {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          gap: 8px;
          background: white;
          padding: 16px;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          border: 2px solid #f1f5f9;
        }

        .pagination-list li a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          text-decoration: none;
          color: #64748b;
          background: #f8fafc;
          border: 2px solid transparent;
          border-radius: 12px;
          transition: all 0.3s ease;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }

        .pagination-list li a:hover {
          background: linear-gradient(135deg, #0d447a 0%, #5dba47 100%);
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
        }

        .pagination-list li.active a {
          background: linear-gradient(135deg, #5dba47 0%, #0d447a 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(93, 186, 71, 0.3);
        }

        /* Loading Spinner */
        .spinner-border {
          width: 3rem;
          height: 3rem;
          border-width: 3px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .course-content {
            padding: 20px;
          }
          
          .course-title {
            font-size: 1rem;
          }
          
          .course-image-wrapper {
            height: 180px;
          }
        }

        @media (max-width: 576px) {
          .course-content {
            padding: 16px;
          }

          .course-title {
            font-size: 0.95rem;
          }

          .pagination-list {
            gap: 6px;
            padding: 12px;
          }

          .pagination-list li a {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </section>
  );
};

export default CourseArea;

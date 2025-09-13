'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import CourseSidebar from './CourseSidebar';
import CourseTop from './CourseTop';
import styles from './CourseArea.module.css';

// MainCourse type for this page
type MainCourse = {
  id: string;
  title: string;
  subtitle?: string;
  thumb?: string | null;
  isFeatured?: boolean;
  isFree?: boolean;
  price?: number;
  courseIds: string[];
  createdAt?: string;
  description?: string;
  rating?: number;
  uploadedBy?: string;
};

const CourseArea = () => {
  const [mainCourses, setMainCourses] = useState<MainCourse[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch main courses from API
  useEffect(() => {
    let mounted = true;
    const fetchMainCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/main-courses');
        if (!res.ok) throw new Error('Failed to load main courses');
        const data = await res.json();
        if (mounted && Array.isArray(data)) {
          setMainCourses(data);
        }
      } catch (err) {
        console.error('CourseArea fetch error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMainCourses();
    return () => { mounted = false; };
  }, []);

  const itemsPerPage = 12;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = (mainCourses || []).slice(itemOffset, endOffset);
  const pageCount = Math.ceil((mainCourses || []).length / itemsPerPage);
  const startOffset = itemOffset + 1;
  const totalItems = (mainCourses || []).length;

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % Math.max(1, (mainCourses || []).length);
    setItemOffset(newOffset);
  };

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: any) => setActiveTab(index);

  return (
    <section className="all-courses-area section-py-120">
      <div className="container">
        <div className="row">
          <CourseSidebar setCourses={() => {}} />
          <div className="col-xl-9 col-lg-8">
            <CourseTop
              startOffset={startOffset}
              endOffset={Math.min(endOffset, totalItems)}
              totalItems={totalItems}
              setCourses={() => {}}
              handleTabClick={handleTabClick}
              activeTab={activeTab}
            />

            {loading ? (
              <div className="p-4 bg-white border rounded text-center">Loading main courses…</div>
            ) : (
              <div className="tab-content" id="myTabContent">
                <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="grid">
                  <div className="row row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
                    {currentItems.map((item: MainCourse) => (
                      <div key={item.id} className="col mb-4">
                        <div className={styles['card-root']}>
                          <Link href={`/course-details/${item.title.toLowerCase()}`} className="d-block position-relative">
                            {item.subtitle && (
                              <span className={styles['card-tag']}>{item.subtitle}</span>
                            )}
                            <img
                              src={item.thumb || '/placeholder-course.png'}
                              alt={item.title || 'img'}
                              className={styles['card-thumb']}
                            />
                          </Link>
                          <div className={styles['card-content']}>
                            <div className={styles['card-title']}>{item.title}</div>
                            <div className={styles['card-subtitle']}>{item.subtitle}</div>
                            <div className={styles['card-by']}>By <span>{item.uploadedBy || "N/A"}</span></div>
                            <div className={styles['card-desc']}>{item.description}</div>
                            <div className={styles['card-btn-row']}>
                              <Link
                                href={`/course-details/${item.title.toLowerCase()}`}
                                className={styles['card-btn']}
                              >
                                Get Started <i className="flaticon-arrow-right"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseArea;

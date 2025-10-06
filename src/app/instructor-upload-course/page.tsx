"use client";
import DashboardSidebar from "@/dashboard/dashboard-common/DashboardSidebar";
import Image from "next/image";
import bg_img from "@/assets/img/bg/dashboard_bg.jpg";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const InstructorUploadCourse = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    thumb: "",
    instructors: "",
    price: "",
    videoUrl: "",
    explanation: "", // <-- Add this line
  });
  const [file, setFile] = useState<File | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [editFile, setEditFile] = useState<File | null>(null);

  // Fetch all courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      if (res.ok) {
        setCourses(data || []);
      } else {
        toast.error(data.error || "Failed to fetch courses");
      }
    } catch (err) {
      toast.error("Error fetching courses");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editId) {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      editId ? setEditFile(e.target.files[0]) : setFile(e.target.files[0]);
    }
  };

  // Add course
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedThumb = "";

    if (file) {
      const imageForm = new FormData();
      imageForm.append("file", file);

      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        body: imageForm,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        toast.error("Image upload failed");
        return;
      }

      uploadedThumb = `/uploads/${uploadData.filename}`;
    }

    const finalForm = { ...form, thumb: uploadedThumb };

    try {
      const res = await fetch("/api/courses/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalForm),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Course added successfully");
        setForm({
          title: "",
          category: "",
          description: "",
          thumb: "",
          instructors: "",
          price: "",
          videoUrl: "",
          explanation: "",
        });
        setFile(null);
        fetchCourses();
      } else {
        toast.error(data.error || "Failed to add course");
      }
    } catch (err) {
      toast.error("Error adding course");
    }
  };

  // Edit course
  const handleEdit = (id: string) => {
    setEditId(id);
    const course = courses.find((c) => c._id === id);
    if (course) {
      setEditForm(course);
      setEditFile(null);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    let updatedThumb = editForm.thumb;

    if (editFile) {
      const imageForm = new FormData();
      imageForm.append("file", editFile);

      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        body: imageForm,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        toast.error("Image upload failed");
        return;
      }

      updatedThumb = `/uploads/${uploadData.filename}`;
    }

    const finalEditForm = { ...editForm, thumb: updatedThumb };

    try {
      const res = await fetch(`/api/courses/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalEditForm),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Course updated successfully");
        setEditId(null);
        setEditForm(null);
        setEditFile(null);
        fetchCourses();
      } else {
        toast.error(data.error || "Failed to update course");
      }
    } catch (err) {
      toast.error("Error updating course");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        const res = await fetch(`/api/courses/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Course deleted successfully");
          fetchCourses();
        } else {
          toast.error(data.error || "Failed to delete course");
        }
      } catch (err) {
        toast.error("Error deleting course");
      }
    }
  };

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.url; // The URL to save in your curriculum JSON
  }

  return (
    <section className="dashboard__area section-pb-120" style={{ position: "relative" }}>
      {/* BG image covers the whole dashboard area */}
      <div
        className="dashboard__bg"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <Image src={bg_img} alt="bg" fill style={{ objectFit: "cover", opacity: 0.13 }} />
      </div>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="dashboard__inner-wrap row">
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="dashboard__content-title mb-4">
              <h4 className="title">Manage Your Courses</h4>
            </div>
            <form onSubmit={editId ? handleUpdate : handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    name="title"
                    className="form-control"
                    placeholder="Course Title"
                    value={editId ? editForm.title : form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    name="category"
                    className="form-control"
                    placeholder="Category"
                    value={editId ? editForm.category : form.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    value={editId ? editForm.description : form.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    name="instructors"
                    className="form-control"
                    placeholder="Instructor Name"
                    value={editId ? editForm.instructors : form.instructors}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    name="price"
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={editId ? editForm.price : form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    name="videoUrl"
                    className="form-control"
                    placeholder="Intro Video URL"
                    value={editId ? editForm.videoUrl : form.videoUrl}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                    required={!editId}
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    name="explanation"
                    className="form-control"
                    placeholder="Explanation (for MCQs or course details)"
                    value={editId ? editForm.explanation : form.explanation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-warning"
                    style={{ color: "#230908", fontWeight: 700 }}
                  >
                    {loading
                      ? "Uploading..."
                      : editId
                      ? "Update Course"
                      : "Upload Course"}
                  </button>
                  {editId && (
                    <button
                      type="button"
                      onClick={() => setEditId(null)}
                      className="btn btn-secondary ms-2"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>

            <div className="dashboard__content-title mt-5 mb-3">
              <h4 className="title">Uploaded Courses</h4>
            </div>
            {loading ? (
              <p>Loading courses...</p>
            ) : courses.length === 0 ? (
              <p>No courses found</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Instructors</th>
                      <th>Price</th>
                      <th>Explanation</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) =>
                      editId === course.id ? (
                        <tr key={course.id}>
                          <td>
                            <input
                              value={editForm.title}
                              name="title"
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              value={editForm.category}
                              name="category"
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <textarea
                              value={editForm.description}
                              name="description"
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              value={editForm.instructors}
                              name="instructors"
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              value={editForm.price}
                              name="price"
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              value={editForm.videoUrl}
                              name="videoUrl"
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input type="file" onChange={handleFileChange} />
                            {editForm.thumb && (
                              <img
                                src={editForm.thumb}
                                alt="thumb"
                                width={60}
                              />
                            )}
                          </td>
                          <td>
                            <button
                              onClick={handleUpdate}
                              className="btn btn-sm btn-warning"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditId(null)}
                              className="btn btn-sm btn-secondary ms-2"
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={course.id}>
                          <td>{course.title}</td>
                          <td>{course.category}</td>
                          <td>{course.description}</td>
                          <td>{course.instructors}</td>
                          <td>{course.price}</td>
                          <td>{course.videoUrl}</td>
                          <td>
                            {course.thumb && (
                              <img src={course.thumb} alt="thumb" width={60} />
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => handleEdit(course._id)}
                              className="btn btn-sm btn-warning"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(course._id)}
                              className="btn btn-sm btn-danger ms-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorUploadCourse;
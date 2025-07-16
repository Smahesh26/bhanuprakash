"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditVideo = () => {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    tag: "",
    review: "",
    price: "",
    lesson: "",
    student: "",
    thumb: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/latest-videos/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/latest-videos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Video updated!");
      router.push("/instructor-updates/manage-latest-videos");
    } else {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="container my-5">
      <h2>Edit Video</h2>
      <form onSubmit={handleSubmit}>
        {["title", "tag", "review", "price", "lesson", "student", "thumb"].map((field) => (
          <div key={field} className="form-group mb-3">
            <label>{field}</label>
            <input
              name={field}
              className="form-control"
              value={(form as any)[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default EditVideo;

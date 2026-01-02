
"use client";

import { useState } from "react";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    blog: "",
    catagory: "",
    image: null,
    nickname: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      alert("Blog posted!");
    } catch (err) {
      console.error(err);
      alert("Failed to post blog.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
        className="border p-2 w-full mb-2"
      />
      <textarea
        name="blog"
        placeholder="Content"
        onChange={handleChange}
        required
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="catagory"
        placeholder="Category"
        onChange={handleChange}
        required
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="nickname"
        placeholder="Your Nickname"
        onChange={handleChange}
        required
        className="border p-2 w-full mb-2"
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
        className="mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Post
      </button>
    </form>
  );
}

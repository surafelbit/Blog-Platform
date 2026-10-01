
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
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-cyan-950/20 sm:p-8"
      >
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            New post
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Share your story</h1>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Post title"
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

          <textarea
            name="blog"
            placeholder="Write your content here..."
            rows={8}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

          <input
            type="text"
            name="catagory"
            placeholder="Category"
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

          <input
            type="text"
            name="nickname"
            placeholder="Your nickname"
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Cover image</span>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="block w-full cursor-pointer rounded-xl border border-dashed border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-cyan-400 file:px-3 file:py-2 file:font-semibold file:text-slate-950"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Publish post
        </button>
      </form>
    </main>
  );
}

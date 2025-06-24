"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Modal from "./../../components/ui/Modal";
// import { useModal } from "./context/ModalContext";
import axios from "axios";
export default function CreatePost() {
  const [info, setInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState();

  // const { showModal, hideModal } = useModal();
  const [tempNickname, setTempNickname] = useState("");
  // const [nickname, setNickname] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    blog: "",
    catagory: "",
    image: "",
    nickname: "",
  });
  function saveNickname(e) {
    e.preventDefault();
    setIsModalOpen(false);
    localStorage.setItem("nickname", tempNickname);
  }
  useEffect(() => {
    // console.log(localStorage.getItem("nicsahfd"));
    console.log(localStorage.getItem("nickname"));
    const savedNickname = localStorage.getItem("nickname");
    if (!savedNickname) {
      setIsModalOpen(true);
    } else {
      setTempNickname(savedNickname);
      //setNickname(savedNickname);
    }
    async function getter() {
      const data = await axios.get(`/api/posts`);
      setInfo(data.data);
      console.log(data);
    }
    getter();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendData = {
      ...formData,
      nickname: localStorage.getItem("nickname"),
    };
    try {
      const res = await fetch(
        "https://blog-platform-two-omega.vercel.app/api/external-post",
        {
          // const res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendData),
        }
      );

      if (res.ok) {
        alert("Post created!");
        setFormData({ title: "", blog: "", catagory: "", image: "" });
      } else {
        alert("Error creating post");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create a New Blog Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="mb-1">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          {isModalOpen && (
            <Modal
            //  onClose={closer}
            >
              <h2 className="text-xl font-bold mb-4">Set Your Nickname</h2>
              <input
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                placeholder="Enter nickname"
                className="border p-2 rounded w-full mb-4"
              />
              <button
                onClick={saveNickname}
                disabled={tempNickname.trim() === ""}
                className={
                  tempNickname.trim()
                    ? "bg-green-500 text-white px-4 py-2 rounded"
                    : "bg-gray-400 px-4 py-2 cursor-not-allowed"
                }
              >
                Save
              </button>
            </Modal>
          )}
          <div>
            <Label htmlFor="blog" className="mb-1">
              Blog Content
            </Label>
            <Textarea
              id="blog"
              name="blog"
              placeholder="Write your blog content here"
              value={formData.blog}
              onChange={handleChange}
              required
              rows={6}
            />
          </div>

          <div>
            <Label htmlFor="catagory" className="mb-1">
              Category
            </Label>
            <Input
              id="catagory"
              name="catagory"
              type="text"
              placeholder="Category"
              value={formData.catagory}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="image" className="mb-1">
              Image URL
            </Label>
            <Input
              id="image"
              name="image"
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Post Blog
          </Button>
        </form>
      </div>
      <ul>
        {info.map((e) => {
          return <li key={e.id}>{e.blog}</li>;
        })}
      </ul>
    </div>
  );
}

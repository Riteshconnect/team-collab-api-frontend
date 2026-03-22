import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Modal from "../components/ui/Modal"; // ✅ IMPORTANT

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const createProject = async () => {
    try {
      if (!title) return alert("Enter title");

      const res = await API.post("/projects", {
        title,
        description,
      });

      setProjects((prev) => [...prev, res.data]);

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log("ERROR:", error.response?.data);
    }
  };

  return (
  <Layout onCreateProject={() => setOpen(true)}>
    

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Projects</h1>
    </div>

    {/* ✅ MODAL (THIS IS STEP 4 YOU ASKED ABOUT) */}
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <h2 className="text-lg font-semibold mb-4">Create Project</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
        onClick={() => {
          createProject();
          setOpen(false);
        }}
      >
        Create Project
      </button>
    </Modal>

    {/* PROJECT GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((p) => (
        <div
          key={p._id}
          onClick={() => navigate(`/projects/${p._id}`)}
          className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg"
        >
          <h4 className="text-lg font-semibold">{p.title}</h4>
          <p className="text-sm text-gray-500">
            {p.description || "No description"}
          </p>
        </div>
      ))}
    </div>

  </Layout>
);
}

export default Dashboard;
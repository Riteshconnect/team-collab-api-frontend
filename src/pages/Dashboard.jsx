import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
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
    const res = await API.post("/projects", {
      title,
      description
    });

    // ✅ update UI correctly
    setProjects((prev) => [...prev, res.data]);

    // optional: clear inputs
    setTitle("");
    setDescription("");

  } catch (error) {
    console.log("ERROR:", error.response?.data);
  }
};

  return (
    <div>
        <h3>Create Project</h3>

<input
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<input
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

<button onClick={createProject}>
  Create Project
</button>

      <h2>Projects</h2>

     {projects.map((p) => (
<div
  key={p._id}
  onClick={() => navigate(`/project/${p._id}`)}
  style={{
    border: "1px solid black",
    margin: "10px",
    padding: "10px",
    cursor: "pointer"
  }}
>
  <h4>{p.title}</h4>
  <p>{p.description}</p>
</div>
))}
    </div>
  );
};

export default Dashboard;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ProjectPage = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState({});

  useEffect(() => {
    if(id){
    fetchTasks();
    }
  }, [id]);

  const fetchTasks = async () => {
    const res = await API.get(`/projects/${id}/tasks`);
    setTasks(res.data);
  };

  const createTask = async () => {
    try {
       if (!title) {
      alert("Enter title");
      return;
    }

      const res = await API.post(`/projects/${id}/tasks`, {
        title
      });

     setTasks((prev) => [...prev, res.data]); 
     setTitle("");

    } catch (error) {
  console.log(error.response?.data || error.message);
  alert("Failed to create task");
}
  };

  const updateStatus = async (taskId, currentStatus) => {
  try {
    const newStatus =
      currentStatus === "todo" ? "done" : "todo";

    const res = await API.put(`/tasks/${taskId}`, {
      status: newStatus
    });

    // update UI
        await fetchTasks();


  } catch (error) {
    alert("Failed to update status");
  }
};

const uploadFile = async (taskId) => {
    console.log("UPLOAD CLICKED:", taskId); 
    console.log("FILES STATE:", files);
    console.log("SELECTED FILE:", files[taskId]);// 👈 ADD THIS
  try {
    const file = files[taskId];
    
    if (!file) {
      alert("Select file first");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    
await API.post(`/projects/tasks/${taskId}/attachment`, formData);
await fetchTasks();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h2>Tasks</h2>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createTask}>Create Task</button>

  {tasks.map((t) => (
  <div key={t._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
    <p>{t.title}</p>
    <p>Status: {t.status}</p>

    <button onClick={() => updateStatus(t._id, t.status)}>
      Change Status
    </button>

    <input
      type="file"
      onChange={(e) =>
        setFiles({
          ...files,
          [t._id]: e.target.files[0],
        })
      }
      
    />

    <button onClick={() => uploadFile(t._id)}>
      Upload File
    </button>

    {/* ✅ Attachments INSIDE */}
    {t.attachments?.map((file, index) => (
      <div key={index}>
        <a href={`http://localhost:5000${file}`} target="_blank">
          View File
        </a>
      </div>
    ))}
  </div>
))}
  


    </div>
  );
};

export default ProjectPage;
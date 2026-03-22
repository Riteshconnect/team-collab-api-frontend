import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/layout/Layout";
import Board from "../components/task/Board";

const ProjectPage = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
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
      title,
    });

    setTasks((prev) => [...prev, res.data]);
    setTitle("");

  } catch (error) {
    console.log(error);
    alert("Failed to create task");
  }
};

  const updateStatus = async (taskId, currentStatus) => {
    try {
      const statuses = ["todo", "in-progress", "done"];
      const currentIndex = statuses.indexOf(currentStatus);
      const newStatus = statuses[(currentIndex + 1) % statuses.length];

      await API.put(`/tasks/${taskId}`, {
        status: newStatus,
      });

      await fetchTasks();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const uploadFile = async (taskId) => {
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
    <Layout onCreateProject={() => {}}>
      {/* Create Task */}
      <div className="mb-6 flex gap-2">
        <input
          className="border p-2 rounded w-64"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

       <button
  className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
  onClick={() => setOpen(true)}
>
  + New Task
</button>

      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
  <h2 className="text-lg font-semibold mb-4">Create Task</h2>

  <input
    className="border p-2 w-full mb-3"
    placeholder="Task title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <button
    className="bg-green-500 text-white px-4 py-2 rounded w-full"
    onClick={() => {
      createTask();
      setOpen(false);
    }}
  >
    Create Task
  </button>
</Modal>

      {/* Kanban Board */}
      <Board
        tasks={tasks}
        updateStatus={updateStatus}
        uploadFile={uploadFile}
        setFiles={setFiles}
        files={files}
      />
    </Layout>
  );
};

export default ProjectPage;
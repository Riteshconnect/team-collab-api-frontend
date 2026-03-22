const TaskCard = ({ task, updateStatus, uploadFile, setFiles, files }) => {
  return (
    <div className="bg-white p-3 rounded shadow mb-3">
      <h3 className="font-medium">{task.title}</h3>

      <p className="text-sm text-gray-500">Status: {task.status}</p>

      <button
        className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
        onClick={() => updateStatus(task._id, task.status)}
      >
        Change Status
      </button>

      <input
        type="file"
        className="mt-2"
        onChange={(e) =>
          setFiles({
            ...files,
            [task._id]: e.target.files[0],
          })
        }
      />

      <button
        className="bg-green-500 text-white px-2 py-1 rounded mt-2"
        onClick={() => uploadFile(task._id)}
      >
        Upload
      </button>

      {task.attachments?.map((file, index) => (
        <div key={index}>
          <a
            href={`https://team-collab-api-btlh.onrender.com${file}`}
            target="_blank"
          >
            View File
          </a>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
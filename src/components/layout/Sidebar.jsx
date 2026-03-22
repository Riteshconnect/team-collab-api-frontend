import { useNavigate } from "react-router-dom";

const Sidebar = ({ onCreateProject, projects = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">TeamCollab</h2>

      <button
  onClick={onCreateProject}
  disabled={!onCreateProject}
  className="bg-blue-500 text-white px-3 py-2 rounded w-full disabled:bg-gray-400"
>
  + New Project
</button>

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2">Projects</p>

        {projects.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/projects/${p._id}`)}
            className="p-2 rounded cursor-pointer hover:bg-gray-100 text-sm"
          >
            {p.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
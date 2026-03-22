import TaskCard from "./TaskCard";

const Column = ({ title, tasks, ...props }) => {
  return (
    <div className="bg-gray-100 p-4 rounded w-80 min-h-[400px]">
      <h2 className="font-semibold mb-4">{title}</h2>

      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} {...props} />
      ))}
    </div>
  );
};

export default Column;
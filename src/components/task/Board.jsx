import Column from "./Column";

const Board = ({ tasks, updateStatus, uploadFile, setFiles, files }) => {
  const todo = tasks.filter((t) => t.status === "todo");
  const inProgress = tasks.filter((t) => t.status === "in-progress");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <div className="flex gap-4 overflow-x-auto">
      <Column title="Todo" tasks={todo} {...{ updateStatus, uploadFile, setFiles, files }} />
      <Column title="In Progress" tasks={inProgress} {...{ updateStatus, uploadFile, setFiles, files }} />
      <Column title="Done" tasks={done} {...{ updateStatus, uploadFile, setFiles, files }} />
    </div>
  );
};

export default Board;
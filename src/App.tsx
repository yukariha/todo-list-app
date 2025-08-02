import { useState, useEffect, useMemo } from "react";
import Modal from "./components/Modal";
import { PriorityToString, Status, StatusToString, Todo } from "./todo";
import ReactLogo from "./assets/react.svg";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("tasks");
    if (stored === null) return [];

    try {
      const parsed = JSON.parse(stored);
      return parsed.map((task: any) => ({
        ...task,
        status: Number(task.status),
        priority: Number(task.priority),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }));
    } catch (e) {
      console.error("Failed to parse tasks:", e);
      return [];
    }
  });

  function addTask(task: Todo) {
    setTasks((prev) => [...prev, task]);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const removeTaskById = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const incompleteTasks = useMemo(
    () => tasks.filter((t) => t.status !== Status.Completed),
    [tasks],
  );

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 p-4 sm:p-8">
      <main className="mx-auto w-full max-w-3xl flex-1">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold text-gray-900">Todo List</h1>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md bg-indigo-600 px-5 py-2 text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            Add Task
          </button>
        </header>

        <section className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            {incompleteTasks.length} Incomplete Task
            {incompleteTasks.length !== 1 ? "s" : ""}
          </h2>

          <ul
            id="tasks-container"
            className="flex max-h-[60vh] flex-col gap-5 overflow-auto"
          >
            {tasks.map((task) => (
              <li key={task.id}>
                <div className="flex flex-col rounded-lg border border-gray-300 bg-neutral-50 p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1 sm:flex-1">
                    <span className="text-xl font-bold text-gray-900">
                      {task.title}
                    </span>
                    <span className="text-gray-700">{task.description}</span>
                    <div className="mt-2 grid grid-cols-1 gap-2 text-sm font-medium text-gray-600 sm:grid-cols-3">
                      <span>Due: {task.dueDate.toDateString()}</span>
                      <span>Priority: {PriorityToString(task.priority)}</span>
                      <span>Status: {StatusToString(task.status)}</span>
                    </div>
                    <span className="mt-2 text-xs text-gray-500">
                      ID: {task.id}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTaskById(task.id)}
                    className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none sm:mt-0 sm:ml-6"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <Modal
          modal={{
            isOpen: showModal,
            onClose: () => setShowModal(false),
            onAddTask: addTask,
          }}
        />
      </main>

      <footer className="mt-10 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 text-neutral-600">
          <img src={ReactLogo} alt="React Logo" className="h-6 w-6" />
          <span className="font-medium">
            Made with ❤️ in React to be as slow as possible
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;

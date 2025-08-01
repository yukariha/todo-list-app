import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { StringToPriority, StringToStatus, Todo } from "../todo.ts";

type ModalProps = {
  modal: {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: Todo) => void;
  };
};

function Modal({ modal }: ModalProps) {
  const [startDate, setStartDate] = useState(new Date());

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const task = new Todo(
      data.title as string,
      data.description as string,
      new Date(data.dueDate as string),
      StringToPriority(data.priority as string),
      StringToStatus(data.status as string),
    );

    modal.onAddTask(task);
    modal.onClose();
  }

  return (
    <div>
      {modal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="w-sm rounded-2xl bg-white p-8">
            <div className="-mt-4 flex items-center justify-between">
              <h2 className="text-center text-2xl font-semibold">
                Create new Task
              </h2>
              <button
                type="button"
                onClick={modal.onClose}
                className="flex size-10 items-center justify-center rounded-lg hover:text-neutral-500 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className=""
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="-mx-8 my-4 border-1 border-gray-300" />
            <form action="" className="flex flex-col" onSubmit={onSubmit}>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="What's your todo task?"
                className="py-2 text-xl font-semibold focus:outline-none"
                required
              />
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Describe your task in more detail"
                className="py-2 text-lg font-medium focus:outline-none"
              />
              <label htmlFor="due-at">Due at: </label>
              <DatePicker
                name="dueDate"
                selected={startDate}
                onChange={(date) => {
                  console.log(date);
                  console.log(typeof date);
                  setStartDate(date ?? new Date());
                }}
                className="flex h-9 w-full appearance-none items-center rounded-lg border border-neutral-200 px-3 py-2 outline-none hover:bg-neutral-100"
              />

              <label
                htmlFor="priority"
                className="mb-1 block text-sm font-medium"
              >
                Select Priority:
              </label>
              <div className="flex h-9 w-full items-center rounded-lg border border-neutral-200 bg-white px-3 py-2 hover:bg-neutral-100">
                <select
                  name="priority"
                  id="priority"
                  defaultValue=""
                  className="flex-grow appearance-none bg-transparent pr-2 text-sm font-medium outline-none"
                  required
                >
                  <option value="" disabled hidden>
                    Select an option
                  </option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-gray-500"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              </div>
              <label htmlFor="status" className="block">
                Select status:{" "}
              </label>
              <div className="flex h-9 w-full items-center rounded-lg border border-neutral-200 bg-white px-3 py-2 hover:bg-neutral-100">
                <select
                  name="status"
                  id="status"
                  defaultValue=""
                  className="flex-grow appearance-none bg-transparent pr-2 text-sm font-medium outline-none"
                  required
                >
                  <option value="" disabled hidden>
                    Select an option
                  </option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-gray-500"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              </div>

              <button
                type="submit"
                className="mt-4 rounded-md bg-indigo-600 px-5 py-2 text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;

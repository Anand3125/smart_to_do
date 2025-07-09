import { useEffect, useState } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tasks/");
      setTasks(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  function getTimeRemaining(deadline) {
    const now = new Date();
    const due = new Date(deadline);
    const diff = due - now;

    if (diff <= 0) return "🚨 Deadline passed";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    return `${days}d ${remainingHours}h remaining`;
  }

  const handleDelete = async (taskId) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}/`);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success("🗑️ Task deleted!");
    } catch (error) {
      console.error("❌ Failed to delete task:", error);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-white text-black p-6 sm:p-10`}
    >
      <Toaster position="top-right" />
      <header className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/next.svg" alt="Next.js" width={100} height={24} />
          <span className="text-sm text-gray-500">AI Smart Todo App</span>
        </div>
        <a
          href="/add-task"
          className="text-sm px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
        >
          + Add Task
        </a>
      </header>

      <main>
        <h1 className="text-3xl font-bold mb-4">📋 Your Tasks</h1>

        {loading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found. Add one above 👆</p>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => {
              const remainingTime = getTimeRemaining(task.deadline);

              return (
                <div
                  key={task.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-blue-800">
                        {task.title}
                      </h2>
                      <p className="text-gray-700 text-sm mt-1">
                        {task.description}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {task.status}
                    </span>
                  </div>

                  <div className="mt-4 text-xs text-gray-600 space-y-1">
                    <p>
                      <strong>Category:</strong>{" "}
                      {task.category?.name || "Uncategorized"}
                    </p>
                    <p>
                      <strong>Priority:</strong>{" "}
                      {task.priority_score ?? "—"}
                    </p>
                    <p>
                      <strong>Deadline:</strong>{" "}
                      {task.deadline || "N/A"}
                    </p>
                    <p className="text-yellow-600 font-medium">⏳ {remainingTime}</p>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => router.push(`/edit-task?id=${task.id}`)}
                        className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="mt-10 text-xs text-gray-400 text-center">
        Built with ❤️ using Next.js, Tailwind, Gemini, and Django.
      </footer>
    </div>
  );
}

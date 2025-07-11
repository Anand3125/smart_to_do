import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AddTaskPage() {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
  
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/ai/suggest/auto/",
        {
          title,
          context,
        }
      );
  
      setResult(res.data);
  
      toast.custom(
        <div>
          <p className="font-bold text-green-700">✅ Task generated successfully!</p>
         
        </div>,
        { duration: 1000 }
      );
    } catch (err) {
      const msg = err?.response?.data?.error || "Something went wrong.";
      setError(msg);
      toast.error("❌ " + msg);
    } finally {
      setLoading(false);
    }
  }; // ✅ This closes handleSubmit correctly
  
    

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-white text-black p-6 sm:p-10`}
    >
      <Toaster position="top-right" />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          Add Smart Task 🤖
        </h1>
      </header>

      <div className="max-w-xl mx-auto border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Fix checkout issue"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Context (optional)
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={3}
              placeholder="e.g., Mobile users can't complete payment"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-medium py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Thinking..." : "Generate Task with AI"}
          </button> */}
       <button
  type="submit"
  disabled={loading}
  className="w-full bg-black text-white font-medium py-2 px-4 rounded hover:bg-gray-800 transition flex justify-center items-center h-[52px]"
>
  {loading ? (
    <div className="spinner-box scale-75">
      <div className="blue-orbit leo"></div>
      <div className="green-orbit leo"></div>
      <div className="red-orbit leo"></div>
      <div className="white-orbit w1 leo"></div>
      <div className="white-orbit w2 leo"></div>
      <div className="white-orbit w3 leo"></div>
    </div>
  ) : (
    "Generate Task with AI"
  )}
</button>


        </form>

        {result && (
          <div className="mt-6 border border-green-200 rounded-lg bg-green-50 p-4 text-green-900 text-sm space-y-2">
           
            <p>
              <strong>Title:</strong> {result.title}
            </p>
            <p>
              <strong>Description:</strong> {result.description}
            </p>
            <p>
              <strong>Deadline:</strong> {result.deadline}
            </p>
            <p>
              <strong>Category:</strong> {result.category?.name || "N/A"}
            </p>
            <p>
              <strong>Priority:</strong> {result.priority_score}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600 text-sm font-medium">
            ❌ {error}
          </div>
        )}
      </div>

      <footer className="mt-10 text-xs text-gray-400 text-center">
        Built with ❤️ using Next.js, Tailwind, Gemini, and Django.
      </footer>
    </div>
  );
}

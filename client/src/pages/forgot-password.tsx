import React, { useState } from "react";
import { apiCall } from "../lib/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await apiCall("/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setMessage("If this email exists, a reset link has been sent.");
    } catch (err: any) {
      setError(err?.message || "Network error");
    }
    setLoading(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 w-full max-w-md animate-fade-in"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Forgot Password</h2>
        {message && <div className="mb-4 text-green-600 text-center">{message}</div>}
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-pink-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword; 
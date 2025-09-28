import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../component/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

export const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { isLoading, register, error } = useAuthStore();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register(email, password, name);
            navigate("/verify-email");
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
            >
                {/* Header */}
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
                    Create Account
                </h2>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm mb-2">Name</label>
                    <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-purple-400 transition">
                        <User className="text-gray-400 mr-2" size={18} />
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full bg-transparent outline-none text-gray-700"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm mb-2">Email</label>
                    <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-purple-400 transition">
                        <Mail className="text-gray-400 mr-2" size={18} />
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full bg-transparent outline-none text-gray-700"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-gray-600 text-sm mb-2">Password</label>
                    <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-purple-400 transition">
                        <Lock className="text-gray-400 mr-2" size={18} />
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-transparent outline-none text-gray-700"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-semibold mt-2">{error}</p>}

                <PasswordStrengthMeter password={password} />

                {/* Register Button */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-purple-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:bg-purple-700 transition flex items-center justify-center gap-2"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Register"}
                </motion.button>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">or</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                {/* Already have account */}
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-purple-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

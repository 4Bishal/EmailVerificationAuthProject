import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { ArrowLeft, Loader, Mail, Check } from "lucide-react";
import { Link } from "react-router-dom";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isLoading, forgotPassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center"
            >
                {!isSubmitted ? (
                    <>
                        <h2 className="text-2xl font-bold mb-2 text-purple-700">
                            Forgot Password
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Enter your email address and we’ll send you a link to reset your password.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3">
                                <Mail className="text-gray-400" size={20} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full p-3 focus:outline-none rounded-lg"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className={`w-full bg-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader className="animate-spin" size={20} />
                                ) : (
                                    "Send Reset Link"
                                )}
                            </motion.button>
                        </form>
                    </>
                ) : (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <Check className="h-8 w-8 text-purple-600" />
                        </motion.div>
                        <h2 className="text-2xl font-bold mb-2 text-purple-700">
                            Check Your Email
                        </h2>
                        <p className="text-gray-500 mb-6">
                            If an account exists for{" "}
                            <span className="font-medium">{email}</span>, you’ll receive a
                            password reset link shortly.
                        </p>
                    </>
                )}

                <div className="mt-6">
                    <Link
                        to="/login"
                        className="text-sm text-purple-600 font-semibold hover:underline flex items-center justify-center"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};



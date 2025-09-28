import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date.js";

export const Home = () => {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
            >
                {/* Header */}
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
                    Dashboard
                </h2>

                {/* Profile Info */}
                <motion.div
                    className="p-4 bg-purple-50 rounded-lg border border-purple-200 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-lg font-semibold text-purple-600 mb-2">
                        Profile Information
                    </h3>
                    <p className="text-gray-700">
                        <span className="font-bold">Name: </span>
                        {user.name}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-bold">Email: </span>
                        {user.email}
                    </p>
                </motion.div>

                {/* Account Activity */}
                <motion.div
                    className="p-4 bg-purple-50 rounded-lg border border-purple-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-lg font-semibold text-purple-600 mb-2">
                        Account Activity
                    </h3>
                    <p className="text-gray-700">
                        <span className="font-bold">Joined: </span>
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-bold">Last Login: </span>
                        {formatDate(user.lastLogin)}
                    </p>
                </motion.div>

                {/* Logout Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6"
                >
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleLogout}
                        className="w-full bg-purple-500 text-white font-semibold py-2.5 
                       rounded-lg shadow-md hover:bg-purple-600 transition 
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        Logout
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

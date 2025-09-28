import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"

export const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    const { verifyEmail, isLoading, error } = useAuthStore();

    const handleChange = (e, index) => {
        const val = e.target.value.replace(/\D/, ""); // only numbers
        if (!val) return;

        const newCode = [...code];
        newCode[index] = val;
        setCode(newCode);

        // auto-focus next input
        if (index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, 6);
        if (!pasteData) return;
        const newCode = pasteData.split("");
        setCode([...newCode, ...Array(6 - newCode.length).fill("")]);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const newCode = [...code];
            if (newCode[index]) {
                newCode[index] = "";
                setCode(newCode);
            } else if (index > 0) {
                const prevInput = document.getElementById(`code-${index - 1}`);
                if (prevInput) prevInput.focus();
                newCode[index - 1] = "";
                setCode(newCode);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");


        try {
            const response = await verifyEmail(verificationCode);
            navigate("/");
            toast.success("Email Verified Successfully!");
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {

        if (code.every(digit => digit != "")) {
            handleSubmit(new Event("submit"))
        }

    }, [code])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center"
            >
                <h1 className="text-2xl font-bold text-purple-700 mb-2">Verify Your Email</h1>
                <p className="text-gray-500 mb-8">Enter the 6-digit code sent to your email</p>

                <div className="flex justify-between mb-8">
                    {code.map((digit, index) => (
                        <motion.input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onPaste={handlePaste}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            whileFocus={{ scale: 1.1, borderColor: "#7c3aed" }}
                            className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-xl font-semibold focus:outline-none focus:border-purple-500 transition-all"
                        />
                    ))}
                </div>

                {error && <p className="text-red-500 text-semibold mt-1 text-left">{error}</p>}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-purple-600 text-white py-3  rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors ${!isLoading ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                    disabled={isLoading}
                >
                    {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Verify Email"}
                </motion.button>
            </motion.div>
        </div>
    );
};

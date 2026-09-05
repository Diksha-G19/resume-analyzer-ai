import { useState } from "react";
import Navbar from "../components/common/Navbar";
import PageTitle from "../components/common/PageTitle";
import { uploadResume } from "../services/resumeService";

function UploadResume() {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {

        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            return;
        }

        if (selectedFile.type !== "application/pdf") {
            setFile(null);
            setMessage("Please select a PDF file.");
            return;
        }

        setFile(selectedFile);
        setMessage("");
    };

    const handleUpload = async () => {

        if (!file) {
            setMessage("Please select a PDF file.");
            return;
        }

        try {

            setUploading(true);
            setMessage("");

            const response = await uploadResume(file);

            console.log("UPLOAD SUCCESS:", response);

            setMessage("Resume uploaded successfully!");

            setFile(null);

            // Reset file input
            document.getElementById("resume-file").value = "";

        } catch (error) {

            console.error("UPLOAD ERROR:", error);

            setMessage("Upload failed. Please try again.");

        } finally {

            setUploading(false);

        }
    };

    return (
        <>
            <Navbar title="Upload Resume" />

            <div className="mt-8">

                <PageTitle
                    title="Upload Resume"
                    subtitle="Upload your resume in PDF format"
                />

                <div className="bg-white p-8 rounded-xl shadow-sm max-w-lg">

                    {/* File selection */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">

                        <p className="text-gray-600 mb-4">
                            Select your resume
                        </p>

                        <label
                            htmlFor="resume-file"
                            className="inline-block bg-slate-800 text-white px-5 py-3 rounded-lg cursor-pointer hover:bg-slate-700 transition"
                        >
                            Choose PDF
                        </label>

                        <input
                            id="resume-file"
                            type="file"
                            accept="application/pdf,.pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {/* Selected file */}
                        {file && (
                            <div className="mt-5">

                                <p className="text-sm text-gray-700">
                                    Selected file:
                                </p>

                                <p className="font-semibold text-blue-600 mt-1">
                                    {file.name}
                                </p>

                            </div>
                        )}

                    </div>

                    {/* Upload button */}
                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className="mt-6 w-full bg-blue-600 text-white px-4 py-3 rounded-lg
                                   font-semibold hover:bg-blue-700 transition
                                   disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {uploading ? "Uploading..." : "Upload Resume"}
                    </button>

                    {/* Message */}
                    {message && (
                        <p
                            className={`mt-4 text-center ${
                                message.includes("successfully")
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {message}
                        </p>
                    )}

                </div>

            </div>
        </>
    );
}

export default UploadResume;
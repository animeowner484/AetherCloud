import { useState } from "react";
import { uploadFile } from "../api";

export default function FileUpload({ onUpload }: { onUpload?: () => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function handleUpload() {
        if (!file) return;

        setUploading(true);
        setError("");

        try {
            const result = await uploadFile(file);
            if (result.success) {
                alert(`File "${result.filename}" uploaded successfully!`);
                setFile(null);
                if (onUpload) {
                    onUpload();
                }
            } else {
                setError("Upload failed");
            }
        } catch (err) {
            setError("An error occurred during upload");
        } finally {
            setUploading(false);
        }
    }

    return (
        <div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <input
                type="file"
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        setFile(e.target.files[0]);
                    }
                }}
            />

            <button onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {file && <p>Selected: {file.name}</p>}
        </div>
    );
}
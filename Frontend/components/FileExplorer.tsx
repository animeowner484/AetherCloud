import { useState, useEffect } from "react";
import { listFiles, deleteFile, downloadFile } from "../api";
import FileUpload from "./FileUpload";
import "../styles/FileExplorer.css";

interface FileItem {
    name: string;
    size: number;
    path: string;
}

export default function FileExplorer() {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadFiles();
    }, []);

    async function loadFiles() {
        setLoading(true);
        setError("");
        try {
            const result = await listFiles();
            setFiles(result.files || []);
        } catch (err) {
            setError("Failed to load files");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(filename: string) {
        if (!confirm(`Are you sure you want to delete ${filename}?`)) {
            return;
        }

        try {
            await deleteFile(filename);
            setFiles(files.filter((f) => f.name !== filename));
        } catch (err) {
            setError("Failed to delete file");
        }
    }

    async function handleDownload(filename: string) {
        try {
            await downloadFile(filename);
        } catch (err) {
            setError("Failed to download file");
        }
    }

    function formatSize(bytes: number): string {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    }

    return (
        <div className="file-explorer">
            <div className="explorer-header">
                <h1>File Explorer</h1>
                <FileUpload onUpload={loadFiles} />
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading files...</div>
            ) : files.length === 0 ? (
                <div className="empty-state">
                    <p>No files uploaded yet. Upload your first file to get started!</p>
                </div>
            ) : (
                <div className="files-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Filename</th>
                                <th>Size</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file) => (
                                <tr key={file.name}>
                                    <td>{file.name}</td>
                                    <td>{formatSize(file.size)}</td>
                                    <td className="actions">
                                        <button
                                            className="btn-download"
                                            onClick={() => handleDownload(file.name)}
                                        >
                                            Download
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(file.name)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

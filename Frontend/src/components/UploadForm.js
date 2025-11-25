// src/components/UploadForm.js
import React, { useState } from "react";

function UploadForm({ onUploadSuccess, mode = "landing" }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const isLanding = mode === "landing";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a CSV file.");
      return;
    }

    setUploading(true);
    setMessage("");
    setErrors([]);

    try {
      const result = await onUploadSuccess(file);
      if (result) {
        setMessage(
          `Uploaded: ${result.successCount}/${result.totalRows} rows. Failed: ${result.failureCount}.`
        );
        if (result.errors && result.errors.length > 0) {
          setErrors(result.errors);
        }
      } else {
        setMessage("Upload completed, but no response received.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Please check the file and try again.");
    } finally {
      setUploading(false);
    }
  };

  if (isLanding) {
    // Big, pretty uploader for the landing page
    return (
      <form className="upload-form-landing" onSubmit={handleSubmit}>
        <label className="upload-dropzone">
          <div className="upload-icon">📂</div>
          <div className="upload-text-main">Drop your CSV here</div>
          <div className="upload-text-sub">
            or <span className="upload-cta">browse from your device</span>
          </div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Analyze my expenses"}
        </button>

        {message && <p className="status landing-status">{message}</p>}

        {errors.length > 0 && (
          <details className="error-list landing-error-list">
            <summary>View row-level issues ({errors.length})</summary>
            <ul>
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </details>
        )}
      </form>
    );
  }

  // Compact uploader for dashboard header
  return (
    <form className="upload-form-inline" onSubmit={handleSubmit}>
      <label className="upload-inline-label">
        <span>Upload CSV</span>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </label>
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Re-analyze"}
      </button>
      {message && <p className="status inline-status">{message}</p>}
    </form>
  );
}

export default UploadForm;

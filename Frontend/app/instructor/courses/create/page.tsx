"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export default function CreateCourse() {
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (!title || title.length < 5) {
            setError("Title must be at least 5 characters")
            return
        }

        if (!shortDescription || shortDescription.length < 10) {
            setError("Description must be at least 10 characters")
            return
        }

        if (!price || isNaN(Number(price)) || Number(price) < 0) {
            setError("Please enter a valid price")
            return
        }

        setLoading(true)

        try {
            await axios.post(
                `${API_URL}/courses`,
                {
                    title,
                    shortDescription,
                    price: Number(price),
                },
                { withCredentials: true }
            )

            router.push("/instructor/courses")
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create course")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: "600px" }}>
            <h1 style={{ marginBottom: "24px" }}>Create New Course</h1>

            <div
                style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "24px",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={labelStyle}>Course Title *</label>
                        <input
                            type="text"
                            placeholder="e.g. Introduction to JavaScript"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={labelStyle}>Short Description *</label>
                        <textarea
                            placeholder="Describe what students will learn..."
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            rows={4}
                            style={{ ...inputStyle, resize: "vertical" }}
                        />
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <label style={labelStyle}>Price (৳) *</label>
                        <input
                            type="number"
                            placeholder="e.g. 500"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="0"
                            style={inputStyle}
                        />
                    </div>

                    {error && (
                        <p
                            style={{
                                color: "#dc2626",
                                fontSize: "14px",
                                marginBottom: "16px",
                                padding: "10px",
                                background: "#fee2e2",
                                borderRadius: "6px",
                            }}
                        >
                            {error}
                        </p>
                    )}

                    <div style={{ display: "flex", gap: "12px" }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                flex: 1,
                                padding: "12px",
                                background: "var(--accent)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "15px",
                                cursor: loading ? "not-allowed" : "pointer",
                                opacity: loading ? 0.7 : 1,
                            }}
                        >
                            {loading ? "Creating..." : "Create Course"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            style={{
                                padding: "12px 24px",
                                background: "transparent",
                                border: "1px solid var(--border)",
                                borderRadius: "8px",
                                fontSize: "15px",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <p
                style={{
                    marginTop: "16px",
                    fontSize: "13px",
                    color: "var(--muted)",
                }}
            >
                Note: Your course will be set to "Approved" status For immediate visibility.
            </p>
        </div>
    )
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    fontSize: "14px",
}

const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "8px",
}

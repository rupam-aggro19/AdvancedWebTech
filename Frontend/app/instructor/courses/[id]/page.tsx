"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

interface Course {
    id: number
    title: string
    shortDescription: string
    price: number
    status: string
}

export default function EditCourse() {
    const router = useRouter()
    const params = useParams()
    const courseId = params.id

    const [course, setCourse] = useState<Course | null>(null)
    const [title, setTitle] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`${API_URL}/courses/${courseId}`, { withCredentials: true })
                const data = res.data
                setCourse(data)
                setTitle(data.title)
                setShortDescription(data.shortDescription)
                setPrice(data.price.toString())
            } catch (err) {
                console.error("Failed to fetch course", err)
                setError("Course not found")
            } finally {
                setLoading(false)
            }
        }

        fetchCourse()
    }, [courseId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Frontend validation
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

        setSaving(true)

        try {
            await axios.patch(
                `${API_URL}/courses/${courseId}`,
                {
                    title,
                    shortDescription,
                    price: Number(price),
                },
                { withCredentials: true }
            )

            router.push("/instructor/courses")
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update course")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <p>Loading course...</p>
    }

    if (!course) {
        return (
            <div style={{ textAlign: "center", padding: "60px" }}>
                <h2>Course Not Found</h2>
                <Link href="/instructor/courses" style={{ color: "var(--accent)" }}>
                    Back to Courses
                </Link>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: "600px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                }}
            >
                <h1>Edit Course</h1>
                <StatusBadge status={course.status} />
            </div>

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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={labelStyle}>Short Description *</label>
                        <textarea
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
                            disabled={saving}
                            style={{
                                flex: 1,
                                padding: "12px",
                                background: "var(--accent)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "15px",
                                cursor: saving ? "not-allowed" : "pointer",
                                opacity: saving ? 0.7 : 1,
                            }}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <Link
                            href={`/instructor/courses/${courseId}/lessons`}
                            style={{
                                padding: "12px 20px",
                                border: "1px solid var(--border)",
                                borderRadius: "8px",
                                fontSize: "15px",
                                textAlign: "center",
                            }}
                        >
                            Manage Lessons
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, { bg: string; text: string }> = {
        APPROVED: { bg: "#dcfce7", text: "#16a34a" },
        PENDING: { bg: "#fef9c3", text: "#ca8a04" },
        REJECTED: { bg: "#fee2e2", text: "#dc2626" },
    }

    const style = colors[status] || { bg: "#e5e7eb", text: "#6b7280" }

    return (
        <span
            style={{
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 500,
                background: style.bg,
                color: style.text,
            }}
        >
            {status}
        </span>
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

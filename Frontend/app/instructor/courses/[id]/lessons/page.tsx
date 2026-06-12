"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import Link from "next/link"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

interface Lesson {
    id: number
    title: string
    videoUrl: string
}

export default function ManageLessons() {
    const params = useParams()
    const courseId = params.id

    const [lessons, setLessons] = useState<Lesson[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // New lesson form
    const [showForm, setShowForm] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [newVideoUrl, setNewVideoUrl] = useState("")
    const [formError, setFormError] = useState("")
    const [saving, setSaving] = useState(false)

    // Edit lesson
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editTitle, setEditTitle] = useState("")
    const [editVideoUrl, setEditVideoUrl] = useState("")

    useEffect(() => {
        fetchLessons()
    }, [courseId])

    const fetchLessons = async () => {
        try {
            const res = await axios.get(`${API_URL}/lessons/${courseId}`, { withCredentials: true })
            setLessons(res.data)
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch lessons")
        } finally {
            setLoading(false)
        }
    }

    const handleAddLesson = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError("")

        if (!newTitle || newTitle.length < 3) {
            setFormError("Title must be at least 3 characters")
            return
        }

        if (!newVideoUrl || newVideoUrl.length < 5) {
            setFormError("Please enter a valid video URL")
            return
        }

        setSaving(true)

        try {
            const res = await axios.post(
                `${API_URL}/lessons`,
                {
                    title: newTitle,
                    videoUrl: newVideoUrl,
                    courseId: Number(courseId),
                },
                { withCredentials: true }
            )

            setLessons([...lessons, res.data])
            setNewTitle("")
            setNewVideoUrl("")
            setShowForm(false)
        } catch (err: any) {
            setFormError(err.response?.data?.message || "Failed to add lesson")
        } finally {
            setSaving(false)
        }
    }

    const handleUpdateLesson = async (id: number) => {
        if (!editTitle || editTitle.length < 3) {
            alert("Title must be at least 3 characters")
            return
        }

        try {
            await axios.patch(
                `${API_URL}/lessons/${id}`,
                {
                    title: editTitle,
                    videoUrl: editVideoUrl,
                },
                { withCredentials: true }
            )

            setLessons(
                lessons.map((l) =>
                    l.id === id ? { ...l, title: editTitle, videoUrl: editVideoUrl } : l
                )
            )
            setEditingId(null)
        } catch (err) {
            console.error("Failed to update lesson", err)
            alert("Failed to update lesson")
        }
    }

    const handleDeleteLesson = async (id: number) => {
        if (!confirm("Are you sure you want to delete this lesson?")) return

        try {
            await axios.delete(`${API_URL}/lessons/${id}`, { withCredentials: true })
            setLessons(lessons.filter((l) => l.id !== id))
        } catch (err) {
            console.error("Failed to delete lesson", err)
            alert("Failed to delete lesson")
        }
    }

    const startEdit = (lesson: Lesson) => {
        setEditingId(lesson.id)
        setEditTitle(lesson.title)
        setEditVideoUrl(lesson.videoUrl)
    }

    if (loading) {
        return <p>Loading lessons...</p>
    }

    return (
        <div style={{ maxWidth: "800px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                }}
            >
                <div>
                    <Link
                        href={`/instructor/courses/${courseId}`}
                        style={{ color: "var(--muted)", fontSize: "14px" }}
                    >
                        ← Back to Course
                    </Link>
                    <h1 style={{ marginTop: "8px" }}>Manage Lessons</h1>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    style={{
                        padding: "10px 20px",
                        background: showForm ? "var(--muted)" : "var(--accent)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "14px",
                        cursor: "pointer",
                    }}
                >
                    {showForm ? "Cancel" : "+ Add Lesson"}
                </button>
            </div>

            {error && (
                <p
                    style={{
                        color: "#dc2626",
                        padding: "12px",
                        background: "#fee2e2",
                        borderRadius: "6px",
                        marginBottom: "20px",
                    }}
                >
                    {error}
                </p>
            )}

            {/* Add Lesson Form */}
            {showForm && (
                <div
                    style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "10px",
                        padding: "20px",
                        marginBottom: "20px",
                    }}
                >
                    <h3 style={{ marginBottom: "16px" }}>Add New Lesson</h3>
                    <form onSubmit={handleAddLesson}>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={labelStyle}>Lesson Title *</label>
                            <input
                                type="text"
                                placeholder="e.g. Introduction to Variables"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={labelStyle}>Video URL *</label>
                            <input
                                type="text"
                                placeholder="e.g. https://youtube.com/watch?v=..."
                                value={newVideoUrl}
                                onChange={(e) => setNewVideoUrl(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        {formError && (
                            <p style={{ color: "#dc2626", fontSize: "14px", marginBottom: "12px" }}>
                                {formError}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={saving}
                            style={{
                                padding: "10px 24px",
                                background: "var(--accent)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                cursor: saving ? "not-allowed" : "pointer",
                            }}
                        >
                            {saving ? "Adding..." : "Add Lesson"}
                        </button>
                    </form>
                </div>
            )}

            {/* Lessons List */}
            {lessons.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: "60px",
                        background: "var(--card)",
                        borderRadius: "10px",
                        border: "1px solid var(--border)",
                    }}
                >
                    <p style={{ color: "var(--muted)" }}>No lessons yet. Add your first lesson!</p>
                </div>
            ) : (
                <div
                    style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    {lessons.map((lesson, index) => (
                        <div
                            key={lesson.id}
                            style={{
                                padding: "16px 20px",
                                borderBottom: index < lessons.length - 1 ? "1px solid var(--border)" : "none",
                            }}
                        >
                            {editingId === lesson.id ? (
                                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        style={{ ...inputStyle, flex: 1, minWidth: "200px" }}
                                    />
                                    <input
                                        type="text"
                                        value={editVideoUrl}
                                        onChange={(e) => setEditVideoUrl(e.target.value)}
                                        style={{ ...inputStyle, flex: 2, minWidth: "250px" }}
                                    />
                                    <button
                                        onClick={() => handleUpdateLesson(lesson.id)}
                                        style={{
                                            padding: "8px 16px",
                                            background: "#16a34a",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        style={{
                                            padding: "8px 16px",
                                            background: "transparent",
                                            border: "1px solid var(--border)",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        <span
                                            style={{
                                                display: "inline-block",
                                                width: "24px",
                                                height: "24px",
                                                background: "var(--accent)",
                                                color: "#fff",
                                                borderRadius: "50%",
                                                textAlign: "center",
                                                lineHeight: "24px",
                                                fontSize: "12px",
                                                marginRight: "12px",
                                            }}
                                        >
                                            {index + 1}
                                        </span>
                                        <strong>{lesson.title}</strong>
                                        <p
                                            style={{
                                                fontSize: "12px",
                                                color: "var(--muted)",
                                                marginLeft: "36px",
                                                marginTop: "4px",
                                            }}
                                        >
                                            {lesson.videoUrl}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button
                                            onClick={() => startEdit(lesson)}
                                            style={{
                                                padding: "6px 12px",
                                                background: "transparent",
                                                border: "1px solid var(--border)",
                                                borderRadius: "4px",
                                                fontSize: "13px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteLesson(lesson.id)}
                                            style={{
                                                padding: "6px 12px",
                                                background: "#fee2e2",
                                                color: "#dc2626",
                                                border: "none",
                                                borderRadius: "4px",
                                                fontSize: "13px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid var(--border)",
    fontSize: "14px",
}

const labelStyle = {
    display: "block",
    fontSize: "14px",
    marginBottom: "6px",
}

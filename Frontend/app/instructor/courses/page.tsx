"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

interface Course {
    id: number
    title: string
    shortDescription: string
    price: number
    status: string
}

export default function InstructorCourses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(`${API_URL}/courses/my`, { withCredentials: true })
                setCourses(res.data)
            } catch (err) {
                console.error("Failed to fetch courses", err)
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this course?")) return

        try {
            await axios.delete(`${API_URL}/courses/${id}`, { withCredentials: true })
            setCourses(courses.filter((c) => c.id !== id))
        } catch (err) {
            console.error("Failed to delete course", err)
            alert("Failed to delete course")
        }
    }

    if (loading) {
        return <p>Loading courses...</p>
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                }}
            >
                <h1>My Courses</h1>
                <Link
                    href="/instructor/courses/create"
                    style={{
                        padding: "10px 20px",
                        background: "var(--accent)",
                        color: "#fff",
                        borderRadius: "8px",
                        fontSize: "14px",
                    }}
                >
                    + Create Course
                </Link>
            </div>

            {courses.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: "60px 20px",
                        background: "var(--card)",
                        borderRadius: "10px",
                        border: "1px solid var(--border)",
                    }}
                >
                    <p style={{ color: "var(--muted)", marginBottom: "20px" }}>
                        You haven't created any courses yet.
                    </p>
                    <Link
                        href="/instructor/courses/create"
                        style={{
                            color: "var(--accent)",
                            textDecoration: "underline",
                        }}
                    >
                        Create your first course
                    </Link>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            style={{
                                background: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: "10px",
                                padding: "20px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "12px",
                                }}
                            >
                                <h3 style={{ fontSize: "16px" }}>{course.title}</h3>
                                <StatusBadge status={course.status} />
                            </div>

                            <p
                                style={{
                                    color: "var(--muted)",
                                    fontSize: "14px",
                                    marginBottom: "12px",
                                }}
                            >
                                {course.shortDescription}
                            </p>

                            <p style={{ fontWeight: 600, marginBottom: "16px" }}>৳{course.price}</p>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <Link
                                    href={`/instructor/courses/${course.id}`}
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        padding: "8px",
                                        background: "var(--accent)",
                                        color: "#fff",
                                        borderRadius: "6px",
                                        fontSize: "13px",
                                    }}
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={`/instructor/courses/${course.id}/lessons`}
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        padding: "8px",
                                        border: "1px solid var(--border)",
                                        borderRadius: "6px",
                                        fontSize: "13px",
                                    }}
                                >
                                    Lessons
                                </Link>
                                <button
                                    onClick={() => handleDelete(course.id)}
                                    style={{
                                        padding: "8px 12px",
                                        background: "#fee2e2",
                                        color: "#dc2626",
                                        border: "none",
                                        borderRadius: "6px",
                                        fontSize: "13px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
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
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: 500,
                background: style.bg,
                color: style.text,
            }}
        >
            {status}
        </span>
    )
}

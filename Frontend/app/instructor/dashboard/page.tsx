"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

interface Course {
    id: number
    title: string
    status: string
}

export default function InstructorDashboard() {
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

    const approved = courses.filter((c) => c.status === "APPROVED").length
    const pending = courses.filter((c) => c.status === "PENDING").length
    const rejected = courses.filter((c) => c.status === "REJECTED").length

    if (loading) {
        return <p>Loading dashboard...</p>
    }

    return (
        <div>
            <h1 style={{ marginBottom: "24px" }}>Welcome, Instructor!</h1>

            
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "20px",
                    marginBottom: "30px",
                }}
            >
                <StatCard title="Total Courses" value={courses.length} color="#2563eb" />
                <StatCard title="Approved" value={approved} color="#16a34a" />
                <StatCard title="Pending" value={pending} color="#ca8a04" />
                <StatCard title="Rejected" value={rejected} color="#dc2626" />
            </div>

            <div style={{ marginBottom: "30px" }}>
                <h2 style={{ marginBottom: "16px", fontSize: "18px" }}>Quick Actions</h2>
                <div style={{ display: "flex", gap: "12px" }}>
                    <Link
                        href="/instructor/courses/create"
                        style={{
                            padding: "12px 24px",
                            background: "var(--accent)",
                            color: "#fff",
                            borderRadius: "8px",
                            fontSize: "14px",
                        }}
                    >
                        Create New Course
                    </Link>
                    <Link
                        href="/instructor/courses"
                        style={{
                            padding: "12px 24px",
                            background: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            fontSize: "14px",
                        }}
                    >
                        View All Courses
                    </Link>
                </div>
            </div>


            <div>
                <h2 style={{ marginBottom: "16px", fontSize: "18px" }}>Recent Courses</h2>
                {courses.length === 0 ? (
                    <p style={{ color: "var(--muted)" }}>No courses yet. Create your first course!</p>
                ) : (
                    <div
                        style={{
                            background: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "10px",
                            overflow: "hidden",
                        }}
                    >
                        {courses.slice(0, 5).map((course) => (
                            <div
                                key={course.id}
                                style={{
                                    padding: "16px 20px",
                                    borderBottom: "1px solid var(--border)",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <span>{course.title}</span>
                                <StatusBadge status={course.status} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
    return (
        <div
            style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "20px",
                borderLeft: `4px solid ${color}`,
            }}
        >
            <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "8px" }}>{title}</p>
            <p style={{ fontSize: "28px", fontWeight: 600 }}>{value}</p>
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
                fontSize: "12px",
                fontWeight: 500,
                background: style.bg,
                color: style.text,
            }}
        >
            {status}
        </span>
    )
}

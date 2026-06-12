"use client"

import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

interface User {
    id: number
    name?: string
    email: string
    role: string
}

export default function InstructorProfile() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState("")
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${API_URL}/users/me`, { withCredentials: true })
                setUser(res.data)
                setName(res.data.name || "")
            } catch (err) {
                console.error("Failed to fetch profile", err)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    const handleSave = async () => {
        setError("")
        setSuccess("")

        if (!name || name.length < 2) {
            setError("Name must be at least 2 characters")
            return
        }

        setSaving(true)

        try {
            const res = await axios.patch(
                `${API_URL}/users/me`,
                { name },
                { withCredentials: true }
            )
            setUser(res.data)
            setEditing(false)
            setSuccess("Profile updated successfully!")
            setTimeout(() => setSuccess(""), 3000)
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update profile")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <p>Loading profile...</p>
    }

    if (!user) {
        return <p>Failed to load profile</p>
    }

    return (
        <div style={{ maxWidth: "500px" }}>
            <h1 style={{ marginBottom: "24px" }}>My Profile</h1>

            <div
                style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "24px",
                }}
            >
                {/* Avatar */}
                <div
                    style={{
                        width: "80px",
                        height: "80px",
                        background: "var(--accent)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                        fontSize: "32px",
                        color: "#fff",
                        fontWeight: 600,
                    }}
                >
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                {/* Role Badge */}
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <span
                        style={{
                            padding: "6px 16px",
                            background: "#dbeafe",
                            color: "#2563eb",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: 500,
                        }}
                    >
                        {user.role}
                    </span>
                </div>

                {/* Profile Fields */}
                <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Full Name</label>
                    {editing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                        />
                    ) : (
                        <p style={valueStyle}>{user.name || "—"}</p>
                    )}
                </div>

                <div style={{ marginBottom: "24px" }}>
                    <label style={labelStyle}>Email Address</label>
                    <p style={valueStyle}>{user.email}</p>
                    <small style={{ color: "var(--muted)", fontSize: "12px" }}>
                        Email cannot be changed
                    </small>
                </div>

                {/* Messages */}
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

                {success && (
                    <p
                        style={{
                            color: "#16a34a",
                            fontSize: "14px",
                            marginBottom: "16px",
                            padding: "10px",
                            background: "#dcfce7",
                            borderRadius: "6px",
                        }}
                    >
                        {success}
                    </p>
                )}

                {editing ? (
                    <div style={{ display: "flex", gap: "12px" }}>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            style={{
                                flex: 1,
                                padding: "12px",
                                background: "var(--accent)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: saving ? "not-allowed" : "pointer",
                            }}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            onClick={() => {
                                setEditing(false)
                                setName(user.name || "")
                                setError("")
                            }}
                            style={{
                                padding: "12px 24px",
                                background: "transparent",
                                border: "1px solid var(--border)",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setEditing(true)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: "transparent",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        Edit Profile
                    </button>
                )}
            </div>
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
    fontSize: "12px",
    color: "var(--muted)",
    marginBottom: "6px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
}

const valueStyle = {
    fontSize: "16px",
    fontWeight: 500,
}

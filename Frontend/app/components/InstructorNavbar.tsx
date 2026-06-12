"use client"

import { useAuth } from "../context/AuthContext"

export default function InstructorNavbar() {
    const { logout } = useAuth()

    return (
        <header
            style={{
                marginLeft: "240px",
                height: "60px",
                background: "var(--card)",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 30px",
                position: "fixed",
                top: 0,
                right: 0,
                left: "240px",
                zIndex: 10,
            }}
        >
            <h1 style={{ fontSize: "16px", fontWeight: 600 }}>Instructor Dashboard</h1>

            <button
                onClick={logout}
                style={{
                    background: "transparent",
                    border: "1px solid var(--border)",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    cursor: "pointer",
                }}
            >
                Logout
            </button>
        </header>
    )
}

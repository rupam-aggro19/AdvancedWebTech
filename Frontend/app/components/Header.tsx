"use client"

import Link from "next/link"
import { useAuth } from "../context/AuthContext"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header
      style={{
        height: "60px",
        background: "var(--primary)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
      }}
    >
      <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
        <h2>Course Library</h2>
      </Link>

      <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {user ? (
          <>
            <Link href="/instructor/courses">My Courses</Link>
            <Link href="/instructor/dashboard">Dashboard</Link>
            <button
              onClick={logout}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "6px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/register" style={{ color: "#fff" }}>Register Today</Link>
          </>
        )}
      </nav>
    </header>
  )
}

"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!name || !email || !password) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    try {
      await axios.post(
        `${API_URL}/auth/register`,
        { name, email, password, role: "INSTRUCTOR" },
        { withCredentials: true }
      )

      router.push("/login")
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Project Name */}
        <h1
          style={{
            textAlign: "center",
            marginBottom: "16px",
            color: "var(--primary)",
          }}
        >
          Course Library
        </h1>

        {/* Register Card */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "28px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "8px" }}>Create an Account</h2>
          <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
            Join Course Library to start learning
          </p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Error */}
            {error && (
              <p
                style={{
                  color: "#dc2626",
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                {error}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "15px",
              }}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid var(--border)",
  fontSize: "14px",
}

const labelStyle = {
  display: "block",
  fontSize: "14px",
  color: "var(--muted)",
  marginBottom: "6px",
}

"use client"


import { useState } from "react"
import Link from "next/link"

import { useAuth } from "../context/AuthContext"

export default function LoginPage() {
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!email || !password) {
      setError("Email and password are required")
      setLoading(false)
      return
    }

    try {
      await login({ email, password })
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Invalid email or password"
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

        <h1
          style={{
            textAlign: "center",
            marginBottom: "16px",
            color: "var(--primary)",
          }}
        >
          Course Library
        </h1>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "28px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "8px" }}>Welcome Back</h2>
          <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit}>
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

            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

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
              {loading ? "Signing in..." : "Login"}
            </button>
            <p
              style={{
                marginTop: "18px",
                textAlign: "center",
                fontSize: "14px",
                color: "var(--muted)",
              }}
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                style={{
                  color: "var(--accent)",
                  fontWeight: 500,
                }}
              >
                Create an account
              </Link>
            </p>

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

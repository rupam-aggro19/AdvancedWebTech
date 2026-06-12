import Link from "next/link"

export default function NotFound() {
    return (
        <div style={{ padding: "30px", textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px" }}>Page Not Found</h2>
            <p style={{ color: "var(--muted)", marginBottom: "20px" }}>
                The instructor page you're looking for doesn't exist.
            </p>
            <Link
                href="/instructor/dashboard"
                style={{
                    color: "var(--accent)",
                    textDecoration: "underline",
                }}
            >
                Go to Dashboard
            </Link>
        </div>
    )
}

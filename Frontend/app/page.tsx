"use client"; 

import Link from "next/link";
import { useAuth } from "./context/AuthContext";

export default function HomePage() {
  const { user } = useAuth(); 

  return (
    <main>
      {}
      <section
        style={{
          textAlign: "center",
          padding: "80px 20px",
          background: "linear-gradient(to right, #4f46e5, #06b6d4)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          Master New Skills Today
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "40px", opacity: 0.9 }}>
          Join thousands of learners and instructors on our platform.
        </p>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          {user ? (
            <Link
              href={user.role === "INSTRUCTOR" ? "/instructor/dashboard" : "/courses"}
              style={buttonStyle}
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/register" style={primaryButtonStyle}>
                Get Started
              </Link>
              <Link href="/login" style={secondaryButtonStyle}>
                Login
              </Link>
            </>
          )}
        </div>
      </section>

      {}
      <section style={{ padding: "60px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px", color: "var(--foreground)" }}>
          Why Choose Us?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          <FeatureCard
            title="Expert Instructors"
            description="Learn from industry experts who are passionate about teaching."
          />
          <FeatureCard
            title="Flexible Learning"
            description="Study at your own pace, anytime and anywhere."
          />
          <FeatureCard
            title="Diverse Courses"
            description="Explore a wide range of topics from coding to design."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "12px",
        background: "var(--card)",
        border: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "12px", color: "var(--foreground)" }}>{title}</h3>
      <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}

const buttonStyle = {
  padding: "12px 30px",
  borderRadius: "8px",
  background: "white",
  color: "#4f46e5",
  fontWeight: "bold",
  textDecoration: "none",
  display: "inline-block",
};

const primaryButtonStyle = {
  ...buttonStyle,
  background: "white",
  color: "#4f46e5",
};

const secondaryButtonStyle = {
  ...buttonStyle,
  background: "transparent",
  border: "2px solid white",
  color: "white",
};

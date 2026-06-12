"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function InstructorSidebar() {
    const pathname = usePathname()

    const links = [
        { href: "/instructor/dashboard", label: "Dashboard" },
        { href: "/instructor/courses", label: "My Courses" },
        { href: "/instructor/courses/create", label: "Create Course" },
        { href: "/instructor/profile", label: "Profile" },
    ]

    return (
        <aside
            style={{
                width: "240px",
                minHeight: "100vh",
                background: "var(--primary)",
                padding: "20px 0",
                position: "fixed",
                left: 0,
                top: 0,
            }}
        >
            <h2
                style={{
                    color: "#fff",
                    padding: "0 20px",
                    marginBottom: "30px",
                    fontSize: "18px",
                }}
            >
                Instructor Panel
            </h2>

            <nav>
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                display: "block",
                                padding: "12px 20px",
                                color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                                background: isActive ? "var(--primary-light)" : "transparent",
                                borderLeft: isActive ? "3px solid var(--accent)" : "3px solid transparent",
                                fontSize: "14px",
                                transition: "all 0.2s",
                            }}
                        >
                            {link.label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

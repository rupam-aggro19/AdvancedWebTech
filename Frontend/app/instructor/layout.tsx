import InstructorSidebar from "../components/InstructorSidebar"
import InstructorNavbar from "../components/InstructorNavbar"

export default function InstructorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
            <InstructorSidebar />
            <InstructorNavbar />
            <main
                style={{
                    marginLeft: "240px",
                    marginTop: "60px",
                    padding: "30px",
                    minHeight: "calc(100vh - 60px)",
                }}
            >
                {children}
            </main>
        </div>
    )
}

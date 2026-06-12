export default function Footer() {
  return (
    <footer
      style={{
        height: "60px",
        background: "var(--primary-light)",
        color: "#cbd5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
      }}
    >
      © {new Date().getFullYear()} Course Library — All rights reserved
    </footer>
  )
}

"use client"

import { usePathname, useRouter } from "next/navigation"
import Header from "./Header"
import Footer from "./Footer"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading) {
      if (!user && pathname !== "/login" && pathname !== "/register" && pathname !== "/") {
        router.push("/login")
      } else if (
        user &&
        (pathname === "/login" || pathname === "/register")
      ) {
        router.push("/instructor/dashboard")
      }
    }
  }, [user, loading, pathname, router, mounted])

  if (!mounted || loading) {
    return <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>
  }

  const hideLayout =
    pathname === "/login" || pathname === "/register"

  return (
    <>
      {!hideLayout && <Header />}
      <main className="content">{children}</main>
      <Footer />
    </>
  )
}

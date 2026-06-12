import "./globals.css"
import LayoutWrapper from "@/app/components/LayoutWrapper"
import { AuthProvider } from "@/app/context/AuthContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}

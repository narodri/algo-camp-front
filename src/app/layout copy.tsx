import Link from "next/link";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <div className="navbar">
            <Link href="/">Home</Link>
          </div>
          {children}
        </body>
      </html>
    )
  }
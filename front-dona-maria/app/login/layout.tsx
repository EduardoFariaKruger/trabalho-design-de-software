export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
          <main className="flex min-h-screen items-center justify-center bg-gray-100">
            {children}
          </main>
    )
  }
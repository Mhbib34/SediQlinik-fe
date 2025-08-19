export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-emerald-50 flex items-center justify-center p-4">
      {children}
    </div>
  );
}

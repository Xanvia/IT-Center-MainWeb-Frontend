export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="rounded-sm border border-primary-border bg-white shadow-default dark:border-primary-border-dark">
        {children}
      </div>
    </section>
  );
}

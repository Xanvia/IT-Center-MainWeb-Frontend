import NavBar from "./components/sections/navbar";
import Footer from "./components/sections/footer";

export default function MainWebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}

import Navbar from "@/components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Add any app-specific headers here */}
      <Navbar/>
      {children}
    </div>
  );
}

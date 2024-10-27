import NavbarPublic from "@/components/NavbarPublic";


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Add any app-specific headers here */}
        <NavbarPublic/>
      {children}
    </div>
  );
}

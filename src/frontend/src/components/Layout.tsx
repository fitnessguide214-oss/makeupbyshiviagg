import { FloatingButtons } from "./FloatingButtons";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

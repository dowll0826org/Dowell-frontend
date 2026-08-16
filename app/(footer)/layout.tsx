import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function FooterPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <div className="flex-grow bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
      <Footer />
    </div>
  );
}

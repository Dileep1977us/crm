import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRM Dashboard",
  description: "Modern CRM Dashboard built with Next.js and Shadcn UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <div className="flex">
            {/* Sidebar */}
            <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
              <div className="flex-1 flex flex-col min-h-0 border-r bg-gray-50">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <div className="flex items-center flex-shrink-0 px-4">
                    <h1 className="text-xl font-semibold">CRM Dashboard</h1>
                  </div>
                  <div className="mt-5 flex-1 px-2">
                    <Navigation />
                  </div>
                </div>
              </div>
            </div>
            {/* Main content */}
            <div className="md:pl-64 flex flex-col flex-1">
              <main className="flex-1">
                <div className="py-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

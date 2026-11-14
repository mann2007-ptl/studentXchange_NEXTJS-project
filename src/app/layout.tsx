import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'StudentXchange | Campus Second-Hand Marketplace',
  description:
    'Buy, sell, and exchange textbooks, electronics, dorm furniture, and student essentials easily on campus.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StudentXchange • Built for Campus Students</p>
        </footer>
      </body>
    </html>
  );
}

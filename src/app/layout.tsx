import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChunkErrorRecovery from '@/components/ChunkErrorRecovery';

export const metadata: Metadata = {
  title: 'CareerFind | Discover Careers & Experience Real Job Shadowing',
  description:
    'Don’t just choose a career—experience it before you commit. AI-driven career discovery, Day in the Life video documentaries, and 1-on-1 job shadowing with verified industry leaders.',
  keywords: [
    'career discovery',
    'job shadowing',
    'day in the life',
    'career exploration',
    'internship mentorship',
    'AI engineer',
    'forward deployed engineer',
    'product manager',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <ChunkErrorRecovery />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

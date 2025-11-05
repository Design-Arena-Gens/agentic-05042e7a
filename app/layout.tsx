import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '../components/Nav';
import { ProgressProvider } from '../components/ProgressProvider';

export const metadata: Metadata = {
  title: 'LingoSpark',
  description: 'Interactive language learning with gamified exercises and progress.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>
          <Nav />
          <main className="container">{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}

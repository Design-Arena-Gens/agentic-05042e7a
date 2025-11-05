'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from './ProgressProvider';

export function Nav() {
  const pathname = usePathname();
  const { totalPoints, dailyStreak } = useProgress();
  const links = [
    { href: '/', label: 'Home' },
    { href: '/lessons', label: 'Lessons' },
    { href: '/exercises', label: 'Exercises' },
    { href: '/dashboard', label: 'Dashboard' }
  ];
  return (
    <header className="nav">
      <div className="nav-left">
        <span className="brand">LingoSpark</span>
        <nav>
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`nav-link ${pathname === l.href ? 'active' : ''}`}>{l.label}</Link>
          ))}
        </nav>
      </div>
      <div className="nav-right">
        <span className="badge">?? {dailyStreak}</span>
        <span className="badge">? {totalPoints}</span>
      </div>
    </header>
  );
}

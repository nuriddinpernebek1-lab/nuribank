import Link from 'next/link';

const items = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Wallet' },
  { href: '/transfers', label: 'Send' },
  { href: '/admin', label: 'Admin' }
];

export function MobileTabBar() {
  return (
    <nav className="mobile-tabbar" aria-label="Mobile navigation">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="mobile-tabbar__item">
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

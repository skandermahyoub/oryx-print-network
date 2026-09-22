import Link from "next/link";

const nav=[
  ["الخدمات","/services"],
  ["الباقات","/packages"],
  ["مشاريعنا","/projects"],
  ["شركاؤنا","/partners"],
  ["المجلة","/magazine"],
];

export function SiteHeader(){
  return <header className="site-header">
    <Link className="brand" href="/" aria-label="ORYX Print Network">
      <span className="brand-mark">ORYX</span><span className="brand-sub">PRINT NETWORK</span>
    </Link>
    <nav className="desktop-nav" aria-label="التنقل الرئيسي">
      {nav.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}
    </nav>
    <Link className="primary-button small" href="/services">ابدأ طلبك</Link>
  </header>;
}

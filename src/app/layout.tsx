import type { Metadata } from "next";
import "./globals.css";

export const metadata:Metadata={
  title:"ORYX Print Network | نطبع أي شيء على أي شيء",
  description:"منصة أوريكس الرقمية للتصميم والطباعة والإعلان والتصنيع حسب الطلب."
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}

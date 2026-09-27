import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const runtime = 'edge';
const display=Space_Grotesk({subsets:["latin"],weight:["500","600","700"],variable:"--font-display",display:"swap"});
const sans=Manrope({subsets:["latin"],weight:["400","500","600","700","800"],variable:"--font-sans",display:"swap"});
export const metadata={title:"ArmorGames — Enter the Next Arena",description:"ArmorGames is a premium discovery platform for free-to-play games.",icons:{icon:"/brand-mark.png"}};
export default function RootLayout({children}){return <html lang="en" className={`${display.variable} ${sans.variable}`}><body className="noise antialiased"><div className="site-shell"><Navbar/><main>{children}</main><Footer/></div>


</body></html>}

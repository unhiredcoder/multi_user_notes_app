import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast'; // Import this instead

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 min-h-screen`}>
        {children}
        <Toaster position="bottom-right" reverseOrder={false} /> 
      </body>
    </html>
  );
}
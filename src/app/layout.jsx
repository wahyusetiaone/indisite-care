import PluginInit from "@/helper/PluginInit";
import "./font.css";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import ConfirmDialogProvider from "@/components/ConfirmDialog";

export const metadata = {
  title: "WowDash NEXT JS - Admin Dashboard Multipurpose Bootstrap 5 Template",
  description:
    "Wowdash NEXT JS is a developer-friendly, ready-to-use admin template designed for building attractive, scalable, and high-performing web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <PluginInit />
      <body suppressHydrationWarning={true}>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <ConfirmDialogProvider>
          {children}
        </ConfirmDialogProvider>
      </body>
    </html>
  );
}

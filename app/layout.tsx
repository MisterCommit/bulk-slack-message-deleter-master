import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import { themeInitScript } from "./theme-script";

export const metadata: Metadata = {
  title: "Slack Message Deleter",
  description: "Delete Slack messages containing a specific keyword",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
      </head>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

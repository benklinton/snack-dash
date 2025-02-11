import "./globals.css";

export const metadata = {
  title: "Snack Dash",
  description: "Brought to you by God's Perfect Idiot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        </body>
    </html>
  )
}

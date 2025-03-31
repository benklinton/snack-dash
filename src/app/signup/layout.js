export default function Layout({ children }) {
    return (
        <html lang="en" className="h-full bg-gray-50">
            <body className="h-full">{children}</body>
        </html>
    )
}
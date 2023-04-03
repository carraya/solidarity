import "./globals.css";

export const metadata = {
  title: "Solidarity",
  description:
    "A worker's union management application that prioritizes anonymity and security.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

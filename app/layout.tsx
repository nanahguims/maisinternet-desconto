import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculadora",
  description: "Calculadora de desconto Mais Internet",
  icons: {
    icon: "https://maisinternet.net.br/site/wp-content/uploads/2022/08/MAIS_HAPPY_ICON-01.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
       <head>
        <link rel="icon" href="https://maisinternet.net.br/site/wp-content/uploads/2022/08/MAIS_HAPPY_ICON-01.png" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

import React from "react";
import AppLayout from "@components/AppLayout/AppLayout";
import Providers from "@components/Providers/Providers";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <title>Nueve09 - Remesas</title>
        <meta name="Nueve09" content="Nueve09" />
      </head>
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}

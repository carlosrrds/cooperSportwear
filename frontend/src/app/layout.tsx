import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/reset.css"

import Header from "../components/header/Header"; 
import FilterBar from "../components/filterBar/FilterBar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
          <Header />
          <FilterBar/>
          {children}
      </body>
    </html>
  );
}

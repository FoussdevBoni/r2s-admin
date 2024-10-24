import { Inter } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/reducer/GlobalProvider";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap
import "../assets/plugins/nucleo/css/nucleo.css";
import "../assets/scss/argon-dashboard-react.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Interface d’administration et de gestion des activités Ride 2 School",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}

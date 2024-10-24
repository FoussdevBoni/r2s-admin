import FlottesTable from "@/components/ADMIN/FlottesTable";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "La liste des gestionnaires de flottes",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <div>
       <FlottesTable />
    </div>
  );
}

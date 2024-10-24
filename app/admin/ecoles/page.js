import EcolesTable from "@/components/ADMIN/EcolesTable";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "La liste des écoles partenaires",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <div>
       <EcolesTable />
    </div>
  );
}

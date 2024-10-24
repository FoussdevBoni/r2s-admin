"use client";
import React, { useEffect, useRef } from "react";
import { Container } from "reactstrap";
import AdminNavbar from "@/components/Navbars/AdminNavbar.js";
import AdminFooter from "@/components/Footers/AdminFooter.js";
import Sidebar from "@/components/Sidebar/Sidebar.js";
import adminRoutes from "@/routes";
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap

const Admin = ({ children }) => {
  const mainContent = useRef(null);
  const router = useRouter(); // Utilisation de useRouter pour obtenir l'URL actuelle

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [router.asPath]); // Utiliser router.asPath pour déclencher l'effet lorsque l'URL change

 
  return (
    <>
      <Sidebar
        routes={adminRoutes}
        logo={{
          innerLink: "admin/dashboard",
          imgSrc: require("../../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          brandText={''} // Utilisation de router.asPath pour récupérer le chemin
        />
        {children}

        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;


import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { flotteRoutes } from "routes";


const Flotte = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);



  const getBrandText = (path) => {
    for (let i = 0; i < flotteRoutes.length; i++) {
      if (
        props?.location?.pathname.indexOf(flotteRoutes[i].layout + flotteRoutes[i].path) !==
        -1
      ) {
        return flotteRoutes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={flotteRoutes}
        logo={{
          innerLink: "/dashboard",
          imgSrc: require("../../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
           {
            flotteRoutes.map((route)=>{
              return(
                <Route path={route.path} element={route.component} />

              )
            })
           }
        </Routes>


        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Flotte;

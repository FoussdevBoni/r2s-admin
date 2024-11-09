import Ecoles from "views/Ecoles";
import Flottes from "views/Flottes";
import Index from "views/Index";
import Drivers from './views/FLOTTE/Drivers';
import R2SMap from "views/R2SMap";
import Enfants from "views/ECOLE/Enfants";

// adminRoutes.js
const adminRoutes = [
  {
    path: "/dashboard",
    name: "Tableau de bord",
    icon: "ni ni-tv-2",
    layout: "/admin",
    component: <Index />
  },
  {
    path: "/flottes",
    name: "Comptes Flottes",
    icon: "ni ni-bus-front-12",
    layout: "/admin",
    component: <Flottes />
  },
 
  {
    path: "/partenaires-clients",
    name: "Partenaires Clients",
    icon: "ni ni-building",
    layout: "/admin",
     component: <Ecoles />

  },
   {
    path: "/monitoring",
    name: "R2S Monitoring",
    icon: "ni ni-map-big",
    layout: "/admin",
    component: <R2SMap />
  },
  {
    path: "/gestion-paiement",
    name: "Gestionnaire de Paiement",
    icon: "ni ni-credit-card",
    layout: "/admin",
  },
  {
    path: "/contrats",
    name: "Contrats",
    icon: "ni ni-paper-diploma",
    layout: "/admin",
  },
  {
    path: "/annonces",
    name: "Annonces",
    icon: "ni ni-bell-55",
    layout: "/admin",
  },
  {
    path: "/urgences",
    name: "Urgences",
    icon: "ni ni-alert-circle-exc",
    layout: "/admin",
  },
  {
    path: "/historiques",
    name: "Historiques",
    icon: "ni ni-archive-2",
    layout: "/admin",
  },
  {
    path: "/performances",
    name: "Performances",
    icon: "ni ni-chart-bar-32",
    layout: "/admin",
  },
  {
    path: "/messagerie",
    name: "Messagerie",
    icon: "ni ni-email-83",
    layout: "/admin",
  },
];

export const flotteRoutes = [
  {
    path: "/dashboard",
    name: "Tableau de bord",
    icon: "ni ni-tv-2",
    layout: "/admin",
    component: <Index />
  },
  {
    path: "/chauffeurs",
    name: "Gestion des Chauffeurs",
    icon: "ni ni-bus-front-12",
    layout: "/admin",
    component: <Drivers />
  },
  {
    path: "/r2s-monitoring",
    name: "R2S Monitoring",
    icon: "ni ni-map-big",
    layout: "/admin",
    component: null
  },
  {
    path: "/clients",
    name: "Gestion des Clients",
    icon: "ni ni-building",
    layout: "/admin",
    component: null
  },
  {
    path: "/gestion-paiement",
    name: "Gestionnaire de Paiement",
    icon: "ni ni-credit-card",
    layout: "/admin",
    component: null
  },
  {
    path: "/contrats",
    name: "Contrats",
    icon: "ni ni-paper-diploma",
    layout: "/admin",
    component: null
  },
  {
    path: "/annonces",
    name: "Annonces",
    icon: "ni ni-bell-55",
    layout: "/admin",
    component: null
  },
  {
    path: "/urgences",
    name: "Urgences",
    icon: "ni ni-alert-circle-exc",
    layout: "/admin",
    component: null
  },
  {
    path: "/historiques",
    name: "Historiques",
    icon: "ni ni-archive-2",
    layout: "/admin",
    component: null
  },
  {
    path: "/performances",
    name: "Performances",
    icon: "ni ni-chart-bar-32",
    layout: "/admin",
    component: null
  },
  {
    path: "/messagerie",
    name: "Messagerie",
    icon: "ni ni-email-83",
    layout: "/admin",
    component: null
  }
];

export const ecoleRoutes = [
  {
    path: "/dashboard",
    name: "Tableau de bord",
    icon: "ni ni-tv-2",
    layout: "/admin",
    component: <Index />
  },
  {
    path: "/chauffeurs",
    name: "Gestion des enfants",
    icon: "ni ni-bus-front-12",
    layout: "/admin",
    component: <Enfants />
  },
  {
    path: "/r2s-monitoring",
    name: "R2S Monitoring",
    icon: "ni ni-map-big",
    layout: "/admin",
    component: null
  },
  {
    path: "/clients",
    name: "Gestion des Clients",
    icon: "ni ni-building",
    layout: "/admin",
    component: null
  },
  {
    path: "/gestion-paiement",
    name: "Gestionnaire de Paiement",
    icon: "ni ni-credit-card",
    layout: "/admin",
    component: null
  },
  {
    path: "/contrats",
    name: "Contrats",
    icon: "ni ni-paper-diploma",
    layout: "/admin",
    component: null
  },
  {
    path: "/annonces",
    name: "Annonces",
    icon: "ni ni-bell-55",
    layout: "/admin",
    component: null
  },
  {
    path: "/urgences",
    name: "Urgences",
    icon: "ni ni-alert-circle-exc",
    layout: "/admin",
    component: null
  },
  {
    path: "/historiques",
    name: "Historiques",
    icon: "ni ni-archive-2",
    layout: "/admin",
    component: null
  },
  {
    path: "/performances",
    name: "Performances",
    icon: "ni ni-chart-bar-32",
    layout: "/admin",
    component: null
  },
  {
    path: "/messagerie",
    name: "Messagerie",
    icon: "ni ni-email-83",
    layout: "/admin",
    component: null
  }
];



export default adminRoutes;

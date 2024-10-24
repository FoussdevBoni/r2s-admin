
const adminRoutes = [
  {
    path: "/dashboard",
    name: "Tableau de bord",
    icon: "ni ni-tv-2",
    layout: "/admin"
  },
  {
    path: "/flottes",
    name: "Comptes Flottes",
    icon: "ni ni-bus-front-12",
    layout: "/admin",
  },
 
  {
    path: "/partenaires-clients",
    name: "Partenaires Clients",
    icon: "ni ni-building",
    layout: "/admin",

  },
   {
    path: "/monitoring",
    name: "R2S Monitoring",
    icon: "ni ni-map-big",
    layout: "/admin",
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
  },
  {
    path: "/chauffeurs",
    name: "Gestion des Chauffeurs",
    icon: "ni ni-bus-front-12",
    layout: "/admin",
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

// home icons
import home from "../../../public/assets/icons/home.png";
import homeSelected from "../../../public/assets/icons/home-selected.png";
// remittances icons
import remittances from "../../../public/assets/icons/remittances.png";
import remittancesSelected from "../../../public/assets/icons/remittances-selected.png";
// card icons
import card from "../../../public/assets/icons/card.png";
import cardSelected from "../../../public/assets/icons/card-selected.png";
// billing icons
import billing from "../../../public/assets/icons/billing.png";
import billingSelected from "../../../public/assets/icons/billing-selected.png";
// maneyBack icons
import moneyBack from "../../../public/assets/icons/moneyBack.png";
import moneyBackSelected from "../../../public/assets/icons/moneyBack-selected.png";
// folder icons
import folder from "../../../public/assets/icons/folder.png";
import folderSelected from "../../../public/assets/icons/folder-selected.png";

export const navbarButtons = [
  {
    activeComponent: "Home",
    route: "/",
    icon: home,
    iconSelected: homeSelected,
  },
  {
    activeComponent: "Remittances",
    route: "/Remittances",
    icon: remittances,
    iconSelected: remittancesSelected,
  },
  {
    activeComponent: "Page0",
    route: "/Page0",
    icon: card,
    iconSelected: cardSelected,
  },
  {
    activeComponent: "Page1",
    route: "/Page1",
    icon: billing,
    iconSelected: billingSelected,
  },
  {
    activeComponent: "Page2",
    route: "/Page2",
    icon: moneyBack,
    iconSelected: moneyBackSelected,
  },
  {
    activeComponent: "Page3",
    route: "/Page3",
    icon: folder,
    iconSelected: folderSelected,
  },
];

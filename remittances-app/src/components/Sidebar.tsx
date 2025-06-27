import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMoneyBillTransfer,
  faCreditCard,
  faFileInvoiceDollar,
  faMoneyBillTrendUp,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/n09-logo.webp";

interface SidebarProps {
  selectedIndex: number;
  onNavClick: (index: number) => void;
  drawerOpen: boolean;
  onDrawerToggle: () => void;
}

export default function Sidebar({
  drawerOpen,
  onDrawerToggle,
  selectedIndex,
  onNavClick,
}: SidebarProps) {
  const navItems = [
    { icon: faHome, label: "Home" },
    { icon: faMoneyBillTransfer, label: "Pagos" },
    { icon: faCreditCard, label: "Tarjetas" },
    { icon: faFileInvoiceDollar, label: "Cheques" },
    { icon: faMoneyBillTrendUp, label: "Reversiones" },
    { icon: faChartColumn, label: "Reportes" },
  ];

  return (
    <>
      {drawerOpen && (
        <>
          <div
            className={`
                fixed inset-0 bg-black z-20 md:hidden
                transition-opacity duration-500 ease-out
                ${drawerOpen ? "opacity-50" : "opacity-0 pointer-events-none"}
              `}
            onClick={onDrawerToggle}
          />

          <aside
            className={`
              fixed inset-y-0 left-0 z-30 w-32 bg-[#353535] text-gray-200
              flex flex-col items-center py-6 space-y-6 md:hidden
              transform transition-transform duration-500 ease-out
              ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <div className="w-18 h-18 rounded mb-8">
              <img src={Logo} alt="Logo" className="rounded-xl" />
            </div>
            <nav className="flex-1 flex flex-col items-center space-y-4">
              {navItems.map((item, i) => {
                const isActive = i === selectedIndex;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      onDrawerToggle();
                      onNavClick(i);
                    }}
                    aria-label={item.label}
                    className={`
                        w-14 h-14 flex items-center justify-center rounded
                        transition-colors duration-200
                        ${
                          isActive
                            ? "text-blue-400"
                            : "hover:bg-gray-600 text-gray-200"
                        }
                      `}
                  >
                    <FontAwesomeIcon icon={item.icon} size="lg" />
                  </button>
                );
              })}
            </nav>
          </aside>
        </>
      )}

      <aside
        className="
          hidden md:flex h-screen w-20 bg-[#353535] text-gray-200
          flex-col items-center py-6 space-y-6 z-20
        "
      >
        <div className="w-12 h-12 rounded mb-8">
          <img src={Logo} alt="Logo" className="rounded-xl" />
        </div>
        <nav className="flex-1 flex flex-col items-center space-y-4">
          {navItems.map((item, i) => {
            const isActive = i === selectedIndex;
            return (
              <button
                key={i}
                onClick={() => onNavClick(i)}
                aria-label={item.label}
                className={`
                    w-14 h-14 flex items-center justify-center rounded
                    transition-colors duration-200
                    ${
                      isActive
                        ? "text-[#00cfdd]"
                        : "hover:bg-gray-600 text-gray-200"
                    }
                  `}
              >
                <FontAwesomeIcon icon={item.icon} size="lg" />
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

import React from "react";
import Sidebar from "./components/Sidebar";
import RemittancePanel from "./components/RemittancePanel";
import RemittanceHeader from "./components/RemittanceHeader";
import ErrorMessage from "./components/ErrorMessage";
import RemittanceList from "./components/RemittanceList";
import Pagination from "./components/Pagination";
import { useUIStore } from "./store/useUIStore";

const App: React.FC = () => {
  const drawerOpen = useUIStore((s) => s.drawerOpen);
  const toggleDrawer = useUIStore((s) => s.toggleDrawer);
  const expanded = useUIStore((s) => s.expanded);
  const selectedIndex = useUIStore((s) => s.selectedIndex);
  const navClick = useUIStore((s) => s.navClick);

  const panelOffset = expanded
    ? "flex-1 p-4 lg:p-6 overflow-y-auto md:ml-[calc(5rem+min(40vw,20rem))] lg:ml-[calc(5rem+min(35vw,28rem))] xl:ml-[calc(5rem+min(30vw,32rem))] 2xl:ml-[calc(5rem+min(25vw,32rem))] transition-all duration-300 ease-in-out"
    : "flex-1 p-4 lg:p-6 overflow-y-auto md:ml-0 transition-all duration-300 ease-in-out";

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar
        selectedIndex={selectedIndex}
        onNavClick={navClick}
        drawerOpen={drawerOpen}
        onDrawerToggle={toggleDrawer}
      />

      <RemittancePanel />

      <div className={panelOffset}>
        <RemittanceHeader onDrawerToggle={toggleDrawer} />
        <div className="mb-4 flex space-x-2">
          <ErrorMessage />
        </div>
        <RemittanceList />
        <Pagination />
      </div>
    </div>
  );
};

export default App;

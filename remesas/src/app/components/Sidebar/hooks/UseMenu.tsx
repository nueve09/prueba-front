/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { MenuItem } from "@common/interfaces";
import React, { useCallback, useEffect } from "react";
import Calculator from "../../Calculator/Calculator";
import { useRouter } from "next/navigation";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";

const SIDEBAR_ITEMS: MenuItem[] = [
  { id: 0, name: "Home", icon: HomeOutlinedIcon, route: "/" },
  {
    id: 1,
    name: "Calculator",
    icon: AttachMoneyOutlinedIcon,
    route: "/remittance",
    component: Calculator,
  },
  {
    id: 2,
    name: "Card",
    icon: CreditCardOutlinedIcon,
    route: "/card",
  },
  {
    id: 3,
    name: "Bill",
    icon: RequestQuoteOutlinedIcon,
    route: "/bill",
  },
  {
    id: 4,
    name: "Renew",
    icon: CurrencyExchangeOutlinedIcon,
    route: "/renew",
  },
  {
    id: 5,
    name: "Analytics",
    icon: AnalyticsOutlinedIcon,
    route: "/analytics",
  },
];

export default function useMenu(pathname?: string) {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = React.useState<MenuItem | undefined>(
    undefined,
  );

  const [isToolExpanded, setIsToolExpanded] = React.useState<boolean>(false);

  const hanldleToolExpand = () => {
    setIsToolExpanded(!isToolExpanded);
  };

  const handleMenuItemClick = useCallback(
    (itemId: number) => {
      if (selectedItem?.id === itemId) {
        return;
      }

      const item = SIDEBAR_ITEMS.find((i) => i.id === itemId);
      router.push(item?.route || "/");
      setSelectedItem(item);
    },
    [selectedItem?.id],
  );

  useEffect(() => {
    const item = SIDEBAR_ITEMS.find((item) => item.route === pathname);

    if (item) {
      setSelectedItem(item);
    }
  }, [pathname]);

  return {
    SIDEBAR_ITEMS,
    selectedItem,
    isToolExpanded,
    handleMenuItemClick,
    hanldleToolExpand,
  };
}

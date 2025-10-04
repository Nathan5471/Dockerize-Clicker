import { createContext, useState, useContext, useEffect } from "react";
import {
  getContainers,
  getTotalContainers,
  getClicks,
  getAmountPerClick,
  getTotalPurchases,
  getContainersPerSecond,
  tickContainersPerSecond,
  getRedeemedQuestIds,
  getAmountPurchasedOfItem,
} from "../utils/containerManager";
import shopData from "../data/shop.json";

interface ShopItem {
  id: number;
  name: string;
  displayName: string;
  description: string;
  baseCost: number;
  scaleFactor: number;
  effect: string;
  effectAmount: number;
  amountPurchased: number;
}

interface ContainerContextType {
  containers: number;
  totalContainers: number;
  clicks: number;
  containersPerClick: number;
  containersPerSecond: number;
  totalPurchases: number;
  shopItems: ShopItem[];
  redeemedQuestIds: number[];
  refreshValues: () => void;
}

const ContainerContext = createContext<ContainerContextType | undefined>(
  undefined
);

export const ContainerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const shopItemsData = shopData.items;
  const [containers, setContainers] = useState<number>(getContainers());
  const [totalContainers, setTotalContainers] = useState<number>(
    getTotalContainers()
  );
  const [clicks, setClicks] = useState<number>(getClicks());
  const [containersPerClick, setContainersPerClick] = useState<number>(
    getAmountPerClick()
  );
  const [containersPerSecond, setContainersPerSecond] = useState<number>(
    getContainersPerSecond()
  );
  const [totalPurchases, setTotalPurchases] = useState<number>(
    getTotalPurchases()
  );
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [redeemedQuestIds, setRedeemedQuestIds] = useState<number[]>(
    getRedeemedQuestIds()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      tickContainersPerSecond();
      refreshValues();
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadShopData = () => {
    let shopData = [] as ShopItem[];
    shopItemsData.forEach((item) => {
      const amountPurchased = getAmountPurchasedOfItem(item);
      shopData = shopData.concat([
        {
          id: item.id,
          name: item.name,
          displayName: item.displayName,
          description: item.description,
          baseCost: item.baseCost,
          scaleFactor: item.scaleFactor,
          effect: item.effect,
          effectAmount: item.effectAmount,
          amountPurchased,
        },
      ]);
    });
    setShopItems(shopData);
  };

  const refreshValues = () => {
    setContainers(getContainers());
    setTotalContainers(getTotalContainers());
    setClicks(getClicks());
    setContainersPerClick(getAmountPerClick());
    setContainersPerSecond(getContainersPerSecond());
    setTotalPurchases(getTotalPurchases());
    loadShopData();
    setRedeemedQuestIds(getRedeemedQuestIds());
  };

  const contextValue = {
    containers,
    totalContainers,
    clicks,
    containersPerClick,
    containersPerSecond,
    totalPurchases,
    shopItems,
    redeemedQuestIds,
    refreshValues,
  };

  return (
    <ContainerContext.Provider value={contextValue}>
      {children}
    </ContainerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContainer = (): ContainerContextType => {
  const context = useContext(ContainerContext);
  if (!context) {
    throw new Error("useContainer must be used within a ContainerProvider");
  }
  return context;
};

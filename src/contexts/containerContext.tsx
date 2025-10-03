import { createContext, useState, useContext, useEffect } from "react";
import {
  getContainers,
  getTotalContainers,
  getClicks,
  getAmountPerClick,
  getTotalPurchases,
  getAmountOfDockerfiles,
  getAmountOfDockerRunCommands,
  getAmountOfDockerComposeFiles,
  getContainersPerSecond,
  tickContainersPerSecond,
  getAmountOfRaspberryPiZero2Ws,
  getAmountOfRaspberryPi4s,
  getAmountOfZimaBoards,
  getAmountOfDockerSwarms,
} from "../utils/containerManager";

interface ContainerContextType {
  containers: number;
  totalContainers: number;
  clicks: number;
  containersPerClick: number;
  containersPerSecond: number;
  totalPurchases: number;
  dockerfiles: number;
  dockerRunCommands: number;
  dockerComposeFiles: number;
  raspberryPiZero2Ws: number;
  raspberryPi4s: number;
  zimaBoards: number;
  dockerSwarms: number;
  refreshValues: () => void;
}

const ContainerContext = createContext<ContainerContextType | undefined>(
  undefined
);

export const ContainerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
  const [dockerfiles, setDockerfiles] = useState<number>(
    getAmountOfDockerfiles()
  );
  const [dockerRunCommands, setDockerRunCommands] = useState<number>(
    getAmountOfDockerRunCommands()
  );
  const [dockerComposeFiles, setDockerComposeFiles] = useState<number>(
    getAmountOfDockerComposeFiles()
  );
  const [raspberryPiZero2Ws, setRaspberryPiZero2Ws] = useState<number>(
    getAmountOfRaspberryPiZero2Ws()
  );
  const [raspberryPi4s, setRaspberryPi4s] = useState<number>(
    getAmountOfRaspberryPi4s()
  );
  const [zimaBoards, setZimaBoards] = useState<number>(getAmountOfZimaBoards());
  const [dockerSwarms, setDockerSwarms] = useState<number>(
    getAmountOfDockerSwarms()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      tickContainersPerSecond();
      refreshValues();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const refreshValues = () => {
    setContainers(getContainers());
    setTotalContainers(getTotalContainers());
    setClicks(getClicks());
    setContainersPerClick(getAmountPerClick());
    setContainersPerSecond(getContainersPerSecond());
    setTotalPurchases(getTotalPurchases());
    setDockerfiles(getAmountOfDockerfiles());
    setDockerRunCommands(getAmountOfDockerRunCommands());
    setDockerComposeFiles(getAmountOfDockerComposeFiles());
    setRaspberryPiZero2Ws(getAmountOfRaspberryPiZero2Ws());
    setRaspberryPi4s(getAmountOfRaspberryPi4s());
    setZimaBoards(getAmountOfZimaBoards());
    setDockerSwarms(getAmountOfDockerSwarms());
  };

  const contextValue = {
    containers,
    totalContainers,
    clicks,
    containersPerClick,
    containersPerSecond,
    totalPurchases,
    dockerfiles,
    dockerRunCommands,
    dockerComposeFiles,
    raspberryPiZero2Ws,
    raspberryPi4s,
    zimaBoards,
    dockerSwarms,
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

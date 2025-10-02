import { createContext, useState, useContext, useEffect } from "react";
import {
  getContainers,
  getClicks,
  getAmountPerClick,
  getAmountOfDockerfiles,
  getAmountOfDockerRunCommands,
  getAmountOfDockerComposeFiles,
  getContainersPerSecond,
  tickContainersPerSecond,
  getAmountOfRaspberryPiZero2Ws,
} from "../utils/containerManager";

interface ContainerContextType {
  containers: number;
  clicks: number;
  containersPerClick: number;
  containersPerSecond: number;
  dockerfiles: number;
  dockerRunCommands: number;
  dockerComposeFiles: number;
  raspberryPiZero2Ws: number;
  refreshValues: () => void;
}

const ContainerContext = createContext<ContainerContextType | undefined>(
  undefined
);

export const ContainerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [containers, setContainers] = useState<number>(getContainers());
  const [clicks, setClicks] = useState<number>(getClicks());
  const [containersPerClick, setContainersPerClick] = useState<number>(
    getAmountPerClick()
  );
  const [containersPerSecond, setContainersPerSecond] = useState<number>(
    getContainersPerSecond()
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

  useEffect(() => {
    const interval = setInterval(() => {
      tickContainersPerSecond();
      refreshValues();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const refreshValues = () => {
    setContainers(getContainers());
    setClicks(getClicks());
    setContainersPerClick(getAmountPerClick());
    setContainersPerSecond(getContainersPerSecond());
    setDockerfiles(getAmountOfDockerfiles());
    setDockerRunCommands(getAmountOfDockerRunCommands());
    setDockerComposeFiles(getAmountOfDockerComposeFiles());
    setRaspberryPiZero2Ws(getAmountOfRaspberryPiZero2Ws());
  };

  const contextValue = {
    containers,
    clicks,
    containersPerClick,
    containersPerSecond,
    dockerfiles,
    dockerRunCommands,
    dockerComposeFiles,
    raspberryPiZero2Ws,
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

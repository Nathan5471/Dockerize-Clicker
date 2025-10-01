import { createContext, useState, useContext } from "react";
import {
  getContainers,
  getAmountOfDockerfiles,
} from "../utils/containerManager";

interface ContainerContextType {
  containers: number;
  dockerfiles: number;
  refreshValues: () => void;
}

const ContainerContext = createContext<ContainerContextType | undefined>(
  undefined
);

export const ContainerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [containers, setContainers] = useState<number>(getContainers());
  const [dockerfiles, setDockerfiles] = useState<number>(
    getAmountOfDockerfiles()
  );

  const refreshValues = () => {
    setContainers(getContainers());
    setDockerfiles(getAmountOfDockerfiles());
  };

  const contextValue = {
    containers,
    dockerfiles,
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

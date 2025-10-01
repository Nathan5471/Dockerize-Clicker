import { createContext, useState, useContext } from "react";
import {
  getContainers,
  getAmountOfDockerfiles,
  getAmountOfDockerRunCommands,
  getAmountOfDockerComposeFiles,
} from "../utils/containerManager";

interface ContainerContextType {
  containers: number;
  dockerfiles: number;
  dockerRunCommands: number;
  dockerComposeFiles: number;
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
  const [dockerRunCommands, setDockerRunCommands] = useState<number>(
    getAmountOfDockerRunCommands()
  );
  const [dockerComposeFiles, setDockerComposeFiles] = useState<number>(
    getAmountOfDockerComposeFiles()
  );

  const refreshValues = () => {
    setContainers(getContainers());
    setDockerfiles(getAmountOfDockerfiles());
    setDockerRunCommands(getAmountOfDockerRunCommands());
    setDockerComposeFiles(getAmountOfDockerComposeFiles());
  };

  const contextValue = {
    containers,
    dockerfiles,
    dockerRunCommands,
    dockerComposeFiles,
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

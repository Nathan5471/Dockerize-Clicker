// This is for managing the currency of Dockerize Clicker, not actual Docker containers

export const resetGame = () => {
  localStorage.clear();
};

export const getContainers = () => {
  const containers = localStorage.getItem("containers");
  return containers ? JSON.parse(containers) : 0;
};

const updateContainers = (amountToChange: number) => {
  const currentContainers = getContainers();
  const newTotalContainers = currentContainers + amountToChange;
  localStorage.setItem("containers", JSON.stringify(newTotalContainers));
  return newTotalContainers;
};

export const getClicks = () => {
  const clicks = localStorage.getItem("clicks");
  return clicks ? JSON.parse(clicks) : 0;
};

export const clickSticker = () => {
  const clicks = getClicks();
  const newClicks = clicks + 1;
  localStorage.setItem("clicks", JSON.stringify(newClicks));
  const amountPerClick = getAmountPerClick();
  return updateContainers(amountPerClick);
};

export const getAmountPerClick = () => {
  const amountPerClick = localStorage.getItem("amountPerClick");
  return amountPerClick ? JSON.parse(amountPerClick) : 1;
};

const increaseAmountPerClick = (amount: number) => {
  const currentAmount = getAmountPerClick();
  const newAmount = currentAmount + amount;
  localStorage.setItem("amountPerClick", JSON.stringify(newAmount));
  return newAmount;
};

export const getAmountOfDockerfiles = () => {
  const dockerFiles = localStorage.getItem("dockerfiles");
  return dockerFiles ? JSON.parse(dockerFiles) : 0;
};

export const purchaseDockerfile = (amount: number) => {
  const baseCost = 25;
  const amountOfDockerFiles = getAmountOfDockerfiles();
  let cost = 0;
  for (let i = 0; i < amount; i++) {
    cost += Math.floor(baseCost * Math.pow(1.65, amountOfDockerFiles + i));
  }
  const currentContainers = getContainers();
  if (currentContainers < cost) {
    return { success: false, message: "Not enough containers" };
  }
  updateContainers(-cost);
  localStorage.setItem(
    "dockerfiles",
    JSON.stringify(amountOfDockerFiles + amount)
  );
  increaseAmountPerClick(amount);
  return { success: true };
};

export const getAmountOfDockerRunCommands = () => {
  const dockerRunCommands = localStorage.getItem("dockerRunCommands");
  return dockerRunCommands ? JSON.parse(dockerRunCommands) : 0;
};

export const purchaseDockerRunCommand = (amount: number) => {
  const baseCost = 100;
  const amountOfDockerRunCommands = getAmountOfDockerRunCommands();
  let cost = 0;
  for (let i = 0; i < amount; i++) {
    cost += Math.floor(
      baseCost * Math.pow(1.65, amountOfDockerRunCommands + i)
    );
  }
  const currentContainers = getContainers();
  if (currentContainers < cost) {
    return { success: false, message: "Not enough containers" };
  }
  updateContainers(-cost);
  localStorage.setItem(
    "dockerRunCommands",
    JSON.stringify(amountOfDockerRunCommands + amount)
  );
  increaseAmountPerClick(amount * 5);
  return { success: true };
};

export const getAmountOfDockerComposeFiles = () => {
  const dockerComposeFiles = localStorage.getItem("dockerComposeFiles");
  return dockerComposeFiles ? JSON.parse(dockerComposeFiles) : 0;
};

export const purchaseDockerComposeFile = (amount: number) => {
  const baseCost = 750;
  const amountOfDockerFiles = getAmountOfDockerComposeFiles();
  let cost = 0;
  for (let i = 0; i < amount; i++) {
    cost += Math.floor(baseCost * Math.pow(1.65, amountOfDockerFiles + i));
  }
  const currentContainers = getContainers();
  if (currentContainers < cost) {
    return { success: false, message: "Not enough containers" };
  }
  updateContainers(-cost);
  localStorage.setItem(
    "dockerComposeFiles",
    JSON.stringify(amountOfDockerFiles + amount)
  );
  increaseAmountPerClick(amount * 30);
  return { success: true };
};

export const getContainersPerSecond = () => {
  const containersPerSecond = localStorage.getItem("containersPerSecond");
  return containersPerSecond ? JSON.parse(containersPerSecond) : 0;
};

const increaseContainersPerSecond = (amount: number) => {
  const currentContainersPerSecond = getContainersPerSecond();
  const newContainersPerSecond = currentContainersPerSecond + amount;
  localStorage.setItem(
    "containersPerSecond",
    JSON.stringify(newContainersPerSecond)
  );
  return newContainersPerSecond;
};

export const tickContainersPerSecond = () => {
  const containersPerSecond = getContainersPerSecond();
  return updateContainers(containersPerSecond);
};

export const getAmountOfRaspberryPiZero2Ws = () => {
  const raspberryPiZero2Ws = localStorage.getItem("raspberryPiZero2Ws");
  return raspberryPiZero2Ws ? JSON.parse(raspberryPiZero2Ws) : 0;
};

export const purchaseRaspberryPiZero2W = (amount: number) => {
  const baseCost = 5000;
  const amountOfRaspberryPiZerosWs = getAmountOfRaspberryPiZero2Ws();
  let cost = 0;
  for (let i = 0; i < amount; i++) {
    cost += Math.floor(
      baseCost * Math.pow(1.65, amountOfRaspberryPiZerosWs + i)
    );
  }
  const currentContainers = getContainers();
  if (currentContainers < cost) {
    return { success: false, message: "Not enough containers" };
  }
  updateContainers(-cost);
  localStorage.setItem(
    "raspberryPiZero2Ws",
    JSON.stringify(amountOfRaspberryPiZerosWs + amount)
  );
  increaseContainersPerSecond(amount * 10);
  return { success: true };
};

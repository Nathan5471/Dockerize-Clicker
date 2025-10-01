// This is for managing the currency of Dockerize Clicker, not actual Docker containers

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

export const clickSticker = () => {
  const clickMultiplier = getAmountPerClick();
  return updateContainers(clickMultiplier);
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
};

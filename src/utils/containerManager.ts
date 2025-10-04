// This is for managing the currency of Dockerize Clicker, not actual Docker containers

export const resetGame = () => {
  localStorage.clear();
};

export const getContainers = () => {
  const containers = localStorage.getItem("containers");
  return containers ? (JSON.parse(containers) as number) : 0;
};

const updateContainers = (amountToChange: number) => {
  const currentContainers = getContainers();
  const newContainers = currentContainers + amountToChange;
  localStorage.setItem("containers", JSON.stringify(newContainers));
  addToTotalContainers(amountToChange);
  return newContainers;
};

export const getTotalContainers = () => {
  // All time
  const totalContainers = localStorage.getItem("totalContainers");
  return totalContainers ? (JSON.parse(totalContainers) as number) : 0;
};

export const addToTotalContainers = (amountToAdd: number) => {
  // Again, all time
  if (amountToAdd < 0) {
    return;
  }
  const currentTotalContainers = getTotalContainers();
  const newTotalContainers = currentTotalContainers + amountToAdd;
  localStorage.setItem("totalContainers", JSON.stringify(newTotalContainers));
};

export const getClicks = () => {
  const clicks = localStorage.getItem("clicks");
  return clicks ? (JSON.parse(clicks) as number) : 0;
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
  return amountPerClick ? (JSON.parse(amountPerClick) as number) : 1;
};

const increaseAmountPerClick = (amount: number) => {
  const currentAmount = getAmountPerClick();
  const newAmount = currentAmount + amount;
  localStorage.setItem("amountPerClick", JSON.stringify(newAmount));
  return newAmount;
};

export const getTotalPurchases = () => {
  const totalPurchases = localStorage.getItem("totalPurchases");
  return totalPurchases ? (JSON.parse(totalPurchases) as number) : 0;
};

export const addToTotalPurchases = (amount: number) => {
  if (amount < 0) {
    return;
  }
  const currentTotalPurchases = getTotalPurchases();
  const newTotalPurchases = currentTotalPurchases + amount;
  localStorage.setItem("totalPurchases", newTotalPurchases.toString());
};

export const getContainersPerSecond = () => {
  const containersPerSecond = localStorage.getItem("containersPerSecond");
  return containersPerSecond ? (JSON.parse(containersPerSecond) as number) : 0;
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

export const getAmountPurchasedOfItem = (item: {
  id: number;
  name: string;
  displayName: string;
  description: string;
  baseCost: number;
  scaleFactor: number;
  effect: string;
  effectAmount: number;
}) => {
  const amountPurchased = localStorage.getItem(item.name);
  return amountPurchased ? (JSON.parse(amountPurchased) as number) : 0;
};

export const purchaseItem = (
  amount: number,
  item: {
    id: number;
    name: string;
    displayName: string;
    description: string;
    baseCost: number;
    scaleFactor: number;
    effect: string;
    effectAmount: number;
  }
) => {
  if (amount < 0) {
    return { success: false, message: "You can't purchase negative upgrades" };
  }
  const baseCost = item.baseCost;
  const scaleFactor = item.scaleFactor;
  const amountPurchased = getAmountPurchasedOfItem(item);
  let cost = 0;
  for (let i = 0; i < amount; i++) {
    cost += Math.floor(baseCost * Math.pow(scaleFactor, amountPurchased + i));
  }
  const currentContainers = getContainers();
  if (currentContainers < cost) {
    return { success: false, message: "Not enough containers" };
  }
  updateContainers(-cost);
  localStorage.setItem(item.name, JSON.stringify(amountPurchased + amount));
  if (item.effect === "perClick") {
    increaseAmountPerClick(item.effectAmount);
  } else if (item.effect === "perSecond") {
    increaseContainersPerSecond(item.effectAmount);
  }
  addToTotalPurchases(amount);
  return { success: true };
};

export const getRedeemedQuestIds = () => {
  const redeemedQuestIds = localStorage.getItem("redeemedQuestIds");
  return redeemedQuestIds ? (JSON.parse(redeemedQuestIds) as number[]) : [];
};

export const redeemQuest = (quest: {
  id: number;
  name: string;
  description: string;
  reward: number;
  target: string;
  targetValue: number;
}) => {
  const redeemedQuestIds = getRedeemedQuestIds();
  if (redeemedQuestIds.includes(quest.id)) {
    return;
  }
  const targetMap = {
    clicks: () => getClicks(),
    purchases: () => getTotalPurchases(),
    containers: () => getContainers(),
    totalContainers: () => getTotalContainers(),
  };
  const target =
    targetMap[
      quest.target as "clicks" | "purchases" | "containers" | "totalContainers"
    ]();
  if (target < quest.targetValue) {
    return;
  }
  updateContainers(quest.reward);
  localStorage.setItem(
    "redeemedQuestIds",
    JSON.stringify(redeemedQuestIds.concat([quest.id]))
  );
};

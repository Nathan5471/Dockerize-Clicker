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
  return updateContainers(1);
};

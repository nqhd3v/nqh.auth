import $http from "@/utils/request";

export const getInitialData = async () => {
  const res = await $http.get<{ weather: any }>("/api/initial");
  return res.data;
};

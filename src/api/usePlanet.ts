import { queryOptions, useQuery } from "@tanstack/react-query";
import { Planet } from "./../types";

type Return = Planet;

const planetQueryOptions = (url: string | undefined) =>
  queryOptions({
    queryKey: ["planets", url],
    queryFn: async () => {
      const res = await fetch(url || "");
      const data = await res.json();
      return data as Return;
    },
    enabled: !!url,
  });

const usePlanets = (url: string | undefined) => {
  return useQuery(planetQueryOptions(url));
};

export { planetQueryOptions, usePlanets };

import { queryOptions, useQuery } from "@tanstack/react-query";
import { Paginated, Planet } from "./../types";

type Return = Paginated<Planet>;

const planetsQueryOptions = (opts: { page?: number; search?: string }) =>
  queryOptions({
    queryKey: ["planets", opts],
    queryFn: async () => {
      const res = await fetch(
        "https://swapi.dev/api/planets/?" +
          new URLSearchParams({
            page: opts.page ? opts.page.toString() : "1",
            search: opts.search ? opts.search.toString() : "",
          }).toString()
      );
      const data = await res.json();
      return data as Return;
    },
  });

const usePlanets = (opts: { page?: number; search?: string }) => {
  return useQuery(planetsQueryOptions(opts));
};

export { planetsQueryOptions, usePlanets };

import { queryOptions, useQuery } from "@tanstack/react-query";
import { Paginated, Species } from "./../types";

type Return = Paginated<Species>;

const speciesQueryOptions = (opts: { page?: number; search?: string }) =>
  queryOptions({
    queryKey: ["species", opts],
    queryFn: async () => {
      const res = await fetch(
        "https://swapi.dev/api/species/?" +
          new URLSearchParams({
            page: opts.page ? opts.page.toString() : "1",
            search: opts.search ? opts.search.toString() : "",
          }).toString()
      );
      const data = await res.json();
      return data as Return;
    },
  });

const useSpecies = (opts: { page?: number; search?: string }) => {
  return useQuery(speciesQueryOptions(opts));
};

export { speciesQueryOptions, useSpecies };

import { queryOptions, useQuery } from "@tanstack/react-query";
import { Paginated, Starship } from "./../types";

type Return = Paginated<Starship>;

const starshipsQueryOptions = (opts: { page?: number; search?: string }) =>
  queryOptions({
    queryKey: ["starships", opts],
    queryFn: async () => {
      const res = await fetch(
        "https://swapi.dev/api/starships/?" +
          new URLSearchParams({
            page: opts.page ? opts.page.toString() : "1",
            search: opts.search ? opts.search.toString() : "",
          }).toString()
      );
      const data = await res.json();
      return data as Return;
    },
  });

const useStarships = (opts: { page?: number; search?: string }) => {
  return useQuery(starshipsQueryOptions(opts));
};

export { starshipsQueryOptions, useStarships };

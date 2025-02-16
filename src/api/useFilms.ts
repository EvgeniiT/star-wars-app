import { queryOptions, useQuery } from "@tanstack/react-query";
import { Film, Paginated } from "./../types";

type Return = Paginated<Film>;

const filmsQueryOptions = (opts: { page?: number; search?: string }) =>
  queryOptions({
    queryKey: ["films", opts],
    queryFn: async () => {
      const res = await fetch(
        "https://swapi.dev/api/films/?" +
          new URLSearchParams({
            page: opts.page ? opts.page.toString() : "1",
            search: opts.search ? opts.search.toString() : "",
          }).toString()
      );
      const data = await res.json();
      return data as Return;
    },
  });

const useFilms = (opts: { page?: number; search?: string }) => {
  return useQuery(filmsQueryOptions(opts));
};

export { filmsQueryOptions, useFilms };

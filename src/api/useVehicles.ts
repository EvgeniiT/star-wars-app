import { queryOptions, useQuery } from "@tanstack/react-query";
import { Paginated, Vehicle } from "./../types";

type Return = Paginated<Vehicle>;

const vehiclesQueryOptions = (opts: { page?: number; search?: string }) =>
  queryOptions({
    queryKey: ["vehicles", opts],
    queryFn: async () => {
      const res = await fetch(
        "https://swapi.dev/api/vehicles/?" +
          new URLSearchParams({
            page: opts.page ? opts.page.toString() : "1",
            search: opts.search ? opts.search.toString() : "",
          }).toString()
      );
      const data = await res.json();
      return data as Return;
    },
  });

const useVehicles = (opts: { page?: number; search?: string }) => {
  return useQuery(vehiclesQueryOptions(opts));
};

export { useVehicles, vehiclesQueryOptions };

import {
  createFileRoute,
  defer,
  DeferredPromise,
} from "@tanstack/react-router";
import { planetQueryOptions } from "../api/usePlanet";
import CharacterPage from "../components/CharacterPage";
import { Character, Film, Species, Starship, Vehicle } from "../types";

type RetunrData = {
  character: Character;
  filmsPromise: DeferredPromise<Film[]>;
  speciesPromise: DeferredPromise<Species[]>;
  starshipsPromise: DeferredPromise<Starship[]>;
  vehiclesPromise: DeferredPromise<Vehicle[]>;
};
type Search = {
  edit?: string;
};
export const Route = createFileRoute("/$id")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    edit: search.edit ? String(search.edit) : undefined,
  }),
  loader: async ({ params: { id }, context: { queryClient } }) => {
    const savedCharacter = window.localStorage.getItem(id);
    let characterData: Character;
    if (savedCharacter) {
      characterData = JSON.parse(savedCharacter);
    } else {
      const characterRes = await fetch(`https://swapi.dev/api/people/${id}/`);
      characterData = (await characterRes.json()) as Character;
    }

    queryClient.prefetchQuery(planetQueryOptions(characterData.homeworld));

    const filmsPromise = Promise.all(
      characterData.films.map((film) => fetch(film).then((res) => res.json()))
    );
    const speciesPromise = Promise.all(
      characterData.species.map((species) =>
        fetch(species).then((res) => res.json())
      )
    );
    const starshipsPromise = Promise.all(
      characterData.starships.map((starship) =>
        fetch(starship).then((res) => res.json())
      )
    );
    const vehiclesPromise = Promise.all(
      characterData.vehicles.map((vehicle) =>
        fetch(vehicle).then((res) => res.json())
      )
    );

    return {
      character: characterData,
      filmsPromise: defer(filmsPromise),
      speciesPromise: defer(speciesPromise),
      starshipsPromise: defer(starshipsPromise),
      vehiclesPromise: defer(vehiclesPromise),
    } as RetunrData;
  },
  shouldReload: false,
  component: CharacterPage,
});

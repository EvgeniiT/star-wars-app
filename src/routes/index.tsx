import { createFileRoute } from "@tanstack/react-router";
import CharactersPage from "../components/CharactersPage";
import { Character, Paginated } from "../types";
type Search = {
  page: number;
  q?: string;
};
export const Route = createFileRoute("/")({
  loaderDeps: ({ search: { page, q } }) => ({ page, q }),
  validateSearch: (search: Record<string, unknown>): Search => ({
    page: search.page ? Number(search.page) : 1,
    q: search.q ? String(search.q) : undefined,
  }),
  loader: async ({ deps: { page, q } }) => {
    const getPath = (page: number, q?: string) =>
      `https://swapi.dev/api/people/?page=${page}${q ? `&search=${q}` : ""}`;
    const res = await fetch(getPath(page, q));
    const data = (await res.json()) as Paginated<Character>;
    const transformed = data.results.map((person) => ({
      id: person.url.split("/").at(-2),
      name: person.name,
      height: person.height,
      mass: person.mass,
      hair_color: person.hair_color,
      skin_color: person.skin_color,
      eye_color: person.eye_color,
      birth_year: person.birth_year,
      gender: person.gender,
    }));
    return { ...data, results: transformed } as Paginated<
      Character & { id: string }
    >;
  },
  component: CharactersPage,
});

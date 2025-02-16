import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Card,
  CardContent,
  CardHeader,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Await,
  useLoaderData,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Suspense } from "react";
import { planetQueryOptions } from "../api/usePlanet";
import EditCharacter from "./EditCharacter";
export default function CharacterPage() {
  const {
    character,
    filmsPromise,
    speciesPromise,
    starshipsPromise,
    vehiclesPromise,
  } = useLoaderData({
    from: "/$id",
  });
  const navigate = useNavigate({ from: "/$id" });
  const { edit } = useSearch({ from: "/$id" });

  const handleToggleEdit = () => {
    if (edit) {
      navigate({ search: { edit: undefined }, from: "/$id", to: "/$id" });
    } else {
      navigate({ search: { edit: "true" }, from: "/$id", to: "/$id" });
    }
  };
  return (
    <>
      <Card>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <CardHeader title={character.name} />
          <IconButton onClick={handleToggleEdit}>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
        </Stack>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText>Height: {character.height}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Mass: {character.mass}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Hair Color: {character.hair_color}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Skin Color: {character.skin_color}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Eye Color: {character.eye_color}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Birth Year: {character.birth_year}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Gender: {character.gender}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                {"Homeworld: "}
                <Suspense fallback={"Loading..."}>
                  <Homeworld />
                </Suspense>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Suspense fallback={"Films: Loading..."}>
                  <Await promise={filmsPromise}>
                    {(films) =>
                      `Films: ${films.map((film) => film.title).join(", ")}`
                    }
                  </Await>
                </Suspense>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>
                <Suspense fallback={"Species: Loading..."}>
                  <Await promise={speciesPromise}>
                    {(species) =>
                      `Species: ${species.map((species) => species.name).join(", ")}`
                    }
                  </Await>
                </Suspense>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Suspense fallback={"Starships: Loading..."}>
                  <Await promise={starshipsPromise}>
                    {(starships) =>
                      `Starships: ${starships.map((starship) => starship.name).join(", ")}`
                    }
                  </Await>
                </Suspense>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Suspense fallback={"Vehicles: Loading..."}>
                  <Await promise={vehiclesPromise}>
                    {(vehicles) =>
                      `Vehicles: ${vehicles.map((vehicle) => vehicle.name).join(", ")}`
                    }
                  </Await>
                </Suspense>
              </ListItemText>
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Drawer open={!!edit} onClose={handleToggleEdit} anchor="right">
        <EditCharacter />
      </Drawer>
    </>
  );
}

const Homeworld = () => {
  const { character } = useLoaderData({
    from: "/$id",
  });
  const { data } = useSuspenseQuery(planetQueryOptions(character.homeworld));
  return <>{data.name}</>;
};

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useRouter,
} from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Character, Option } from "../types";
import Films from "./Films";
import Homeworld from "./Homeworld";
import Species from "./Species";
import Starships from "./Starships";
import Vehicles from "./Vehicles";

export type FormData = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: null | Option;
  films: Option[];
  species: Option[];
  starships: Option[];
  vehicles: Option[];
};

export default function EditCharacter() {
  const { id } = useParams({ from: "/$id" });
  const { character } = useLoaderData({
    from: "/$id",
  });
  const navigate = useNavigate({ from: "/$id" });
  const router = useRouter();
  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    url,
    created,
    edited,
  } = character;

  const [formData, setFormData] = useState<FormData>({
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld: null,
    films: [],
    species: [],
    starships: [],
    vehicles: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const homeworld = useMemo(() => {
    return formData.homeworld;
  }, [formData.homeworld]);
  const films = useMemo(() => {
    return formData.films;
  }, [formData.films]);
  const species = useMemo(() => {
    return formData.species;
  }, [formData.species]);
  const starships = useMemo(() => {
    return formData.starships;
  }, [formData.starships]);
  const vehicles = useMemo(() => {
    return formData.vehicles;
  }, [formData.vehicles]);

  const handleSubmit = () => {
    const character: Character = {
      ...formData,
      homeworld: formData.homeworld?.id || "",
      films: formData.films.map((film) => film.id),
      species: formData.species.map((species) => species.id),
      starships: formData.starships.map((starship) => starship.id),
      vehicles: formData.vehicles.map((vehicle) => vehicle.id),
      url,
      created,
      edited,
    };
    window.localStorage.setItem(id, JSON.stringify(character));
    router.invalidate();
    navigate({ search: { edit: undefined } });
  };

  return (
    <Stack spacing={2} px={2} pt={2} minWidth={"50vh"}>
      <Typography variant="h4">Edit Character</Typography>
      <TextField
        label="Name"
        name="name"
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        label="Height"
        name="height"
        variant="outlined"
        value={formData.height}
        onChange={handleChange}
      />
      <TextField
        label="Mass"
        name="mass"
        variant="outlined"
        value={formData.mass}
        onChange={handleChange}
      />
      <TextField
        label="Hair Color"
        name="hair_color"
        variant="outlined"
        value={formData.hair_color}
        onChange={handleChange}
      />
      <TextField
        label="Skin Color"
        name="skin_color"
        variant="outlined"
        value={formData.skin_color}
        onChange={handleChange}
      />
      <TextField
        label="Eye Color"
        name="eye_color"
        variant="outlined"
        value={formData.eye_color}
        onChange={handleChange}
      />
      <TextField
        label="Birth Year"
        name="birth_year"
        variant="outlined"
        value={formData.birth_year}
        onChange={handleChange}
      />
      <TextField
        label="Gender"
        name="gender"
        variant="outlined"
        value={formData.gender}
        onChange={handleChange}
      />
      <Homeworld value={homeworld} setFormData={setFormData} />
      <Films value={films} setFormData={setFormData} />
      <Species value={species} setFormData={setFormData} />
      <Starships value={starships} setFormData={setFormData} />
      <Vehicles value={vehicles} setFormData={setFormData} />
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          bgcolor: "background.paper",
          zIndex: 1,
          width: "100%",
          py: 2,
        }}
      >
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Submit
        </Button>
      </Box>
    </Stack>
  );
}

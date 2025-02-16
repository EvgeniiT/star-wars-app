import { Autocomplete, TextField } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLoaderData } from "@tanstack/react-router";
import { memo, useCallback, useEffect, useState } from "react";
import { planetQueryOptions } from "../api/usePlanet";
import { usePlanets } from "../api/usePlanets";
import { Option } from "../types";
import { FormData } from "./EditCharacter";

type Props = {
  value: Option | null;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};
function Homeworld({ value, setFormData }: Props) {
  const { character } = useLoaderData({
    from: "/$id",
  });
  const { data: defaultValue } = useSuspenseQuery(
    planetQueryOptions(character.homeworld)
  );

  const setValue = useCallback(
    (newValue: Option | null) => {
      setFormData((prev) => ({
        ...prev,
        homeworld: newValue,
      }));
    },
    [setFormData]
  );

  useEffect(() => {
    setValue({ id: defaultValue.url, label: defaultValue.name });
  }, [defaultValue, setValue]);

  const [homeworldSearch, setHomeworldSearch] = useState("");
  const { data: planets, isPending } = usePlanets({
    page: 1,
    search: homeworldSearch,
  });
  const planetsOptions =
    planets?.results.map((planet) => ({
      id: planet.url,
      label: planet.name,
    })) || [];

  return (
    <Autocomplete
      options={planetsOptions || []}
      onChange={(
        e: React.SyntheticEvent<Element, Event>,
        newValue: Option | null
      ) => setValue(newValue)}
      value={value}
      onInputChange={(_, v) => setHomeworldSearch(v)}
      inputValue={homeworldSearch}
      renderInput={(params) => <TextField {...params} label="Homeworld" />}
      loading={isPending}
    />
  );
}

export default memo(Homeworld);

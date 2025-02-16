import { Autocomplete, TextField } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";
import { memo, useCallback, useEffect, useState } from "react";
import { useFilms } from "../api/useFilms";
import { Option } from "../types";
import { FormData } from "./EditCharacter";

type Props = {
  value: Option[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};
function Films({ value, setFormData }: Props) {
  const { filmsPromise } = useLoaderData({
    from: "/$id",
  });

  const [search, setSearch] = useState("");

  const setValue = useCallback(
    (newValue: Option[]) => {
      setFormData((prev) => ({
        ...prev,
        films: newValue,
      }));
    },
    [setFormData]
  );
  const { data: films, isPending } = useFilms({
    page: 1,
    search,
  });
  const filmsOptions =
    films?.results.map((film) => ({
      id: film.url,
      label: film.title,
    })) || [];

  useEffect(() => {
    const setField = async () => {
      const films = await filmsPromise;
      const filmsOptions = films.map((film) => ({
        id: film.url,
        label: film.title,
      }));
      setValue(filmsOptions);
    };
    setField();
  }, [filmsPromise, setValue]);

  return (
    <Autocomplete
      multiple
      options={filmsOptions || []}
      onChange={(e: React.SyntheticEvent<Element, Event>, newValue: Option[]) =>
        setValue(newValue)
      }
      value={value}
      onInputChange={(_, v) => setSearch(v)}
      inputValue={search}
      renderInput={(params) => <TextField {...params} label="Films" />}
      getOptionLabel={(option) => option.label}
      loading={isPending}
    />
  );
}

export default memo(Films);

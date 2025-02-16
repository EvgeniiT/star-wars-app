import { Autocomplete, TextField } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";
import { memo, useCallback, useEffect, useState } from "react";
import { useStarships } from "../api/useStarships";
import { Option } from "../types";
import { FormData } from "./EditCharacter";

type Props = {
  value: Option[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};
function Starships({ value, setFormData }: Props) {
  const { starshipsPromise } = useLoaderData({
    from: "/$id",
  });

  const [search, setSearch] = useState("");

  const setValue = useCallback(
    (newValue: Option[]) => {
      setFormData((prev) => ({
        ...prev,
        starships: newValue,
      }));
    },
    [setFormData]
  );
  const { data, isPending } = useStarships({
    page: 1,
    search,
  });
  const options =
    data?.results.map((d) => ({
      id: d.url,
      label: d.name,
    })) || [];

  useEffect(() => {
    const setField = async () => {
      const starships = await starshipsPromise;
      const options = starships.map((starship) => ({
        id: starship.url,
        label: starship.name,
      }));
      setValue(options);
    };
    setField();
  }, [starshipsPromise, setValue]);

  return (
    <Autocomplete
      multiple
      options={options || []}
      onChange={(e: React.SyntheticEvent<Element, Event>, newValue: Option[]) =>
        setValue(newValue)
      }
      value={value}
      onInputChange={(_, v) => setSearch(v)}
      inputValue={search}
      renderInput={(params) => <TextField {...params} label="Starships" />}
      getOptionLabel={(option) => option.label}
      loading={isPending}
    />
  );
}

export default memo(Starships);

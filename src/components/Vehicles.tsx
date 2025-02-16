import { Autocomplete, TextField } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";
import { memo, useCallback, useEffect, useState } from "react";
import { useVehicles } from "../api/useVehicles";
import { Option } from "../types";
import { FormData } from "./EditCharacter";

type Props = {
  value: Option[];
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};
function Vehicles({ value, setFormData }: Props) {
  const { vehiclesPromise } = useLoaderData({
    from: "/$id",
  });

  const [search, setSearch] = useState("");

  const setValue = useCallback(
    (newValue: Option[]) => {
      setFormData((prev) => ({
        ...prev,
        vehicles: newValue,
      }));
    },
    [setFormData]
  );
  const { data, isPending } = useVehicles({
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
      const vehicles = await vehiclesPromise;
      const options = vehicles.map((starship) => ({
        id: starship.url,
        label: starship.name,
      }));
      setValue(options);
    };
    setField();
  }, [vehiclesPromise, setValue]);

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
      renderInput={(params) => <TextField {...params} label="Vehicles" />}
      getOptionLabel={(option) => option.label}
      loading={isPending}
    />
  );
}

export default memo(Vehicles);

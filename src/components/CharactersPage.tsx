import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLoaderData, useNavigate, useSearch } from "@tanstack/react-router";
import { ChangeEvent, useState } from "react";

export default function CharactersPage() {
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/" });
  const { page, q } = useSearch({ from: "/" });
  const [searchQuery, setSearchQuery] = useState(q);
  const [pageNumber, setPageNumber] = useState(page);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    navigate({ search: { q: newQuery, page: 1 }, from: "/", to: "/" });
  };
  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    navigate({ search: { page, q: searchQuery }, from: "/", to: "/" });
    setPageNumber(page);
  };

  return (
    <>
      <Stack
        spacing={2}
        direction={"row"}
        p={2}
        sx={{
          position: "sticky",
          top: 88,
          bgcolor: "background.paper",
          zIndex: 1,
        }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <TextField
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{ flex: 1 }}
        />
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Pagination
            count={Math.ceil(data.count / 10)}
            onChange={handlePageChange}
            page={pageNumber}
          />
        </Box>
      </Stack>
      <Stack spacing={2} p={2}>
        {data.results?.map((character) => (
          <Card key={character.id}>
            <CardActionArea
              onClick={() => navigate({ to: `/${character.id}` })}
            >
              <CardHeader title={character.name} />
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Typography>Height: {character.height}</Typography>
                  <Typography>Mass: {character.mass}</Typography>
                  <Typography>Hair Color: {character.hair_color}</Typography>
                  <Typography>Skin Color: {character.skin_color}</Typography>
                  <Typography>Eye Color: {character.eye_color}</Typography>
                  <Typography>Birth Year: {character.birth_year}</Typography>
                  <Typography>Gender: {character.gender}</Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </>
  );
}

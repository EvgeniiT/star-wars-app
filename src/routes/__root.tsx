import { Box, Paper, Typography } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <Paper elevation={0}>
        <Box maxWidth={"1200px"} margin={"auto"} position={"relative"}>
          <Box
            sx={{
              position: "sticky",
              top: 0,
              bgcolor: "background.paper",
              zIndex: 1,
              p: 2,
            }}
          >
            <Typography variant="h3" ml={2}>
              Star Wars Characters
            </Typography>
          </Box>
          <Box px={2}>
            <Outlet />
          </Box>
        </Box>
      </Paper>
      <TanStackRouterDevtools />
    </>
  ),
});

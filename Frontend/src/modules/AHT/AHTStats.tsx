import { Box, Typography } from "@mui/material";
import { AHTStatItem, AHTStatsProps } from "../../interface";

export default function AHTStats({ data, isLoading }: AHTStatsProps) {
  return (
    <Box sx={{ height: "auto", padding: 1, marginBottom: 1 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  padding: 3,
                  textAlign: "center",
                }}
              ></Box>
            ))
          : data?.map((row: AHTStatItem, index: number) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  padding: 3,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#1976d2", fontWeight: "bold" }}
                >
                  {row?.value}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {row?.label}
                </Typography>
              </Box>
            ))}
      </Box>
    </Box>
  );
}

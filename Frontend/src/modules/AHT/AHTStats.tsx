import { Box, Typography } from "@mui/material";

export default function AHTStats({ data, isLoading }: any) {
  return (
    <Box sx={{ height: "auto", padding: 1, marginBottom: 1 }}>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // Fixed 4 columns
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading
        ? 
          Array.from({ length: 8 }).map((_, index) => (
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
            </Box>
          ))
        : 
          data?.map((row: any, index: any) => (
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
                              <Typography variant="subtitle1" fontWeight="bold">{row?.label}</Typography>
              {row?.value}
            </Box>
          ))}
    </Box>
  </Box>
  
  
  );
}

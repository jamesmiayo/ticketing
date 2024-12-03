import { DialogContent, DialogTitle, Rating, Typography } from "@mui/material";

export default function UserTicketSatisfactory({ data }: any) {
  const satisfactoryFields = [
    {
      name: "satisfactory_1",
      label: "Overall Satisfaction",
      value: data?.tickets?.ticket_satisfactory?.satisfactory_1 || 0, // Default to 0 if undefined
    },
    {
      name: "satisfactory_2",
      label: "Customer Support",
      value: data?.tickets?.ticket_satisfactory?.satisfactory_2 || 0,
    },
    {
      name: "satisfactory_3",
      label: "Ease of Use",
      value: data?.tickets?.ticket_satisfactory?.satisfactory_3 || 0,
    },
    {
      name: "satisfactory_4",
      label: "Features",
      value: data?.tickets?.ticket_satisfactory?.satisfactory_4 || 0,
    },
    {
      name: "satisfactory_5",
      label: "Value for Money",
      value: data?.tickets?.ticket_satisfactory?.satisfactory_5 || 0,
    },
  ];
  return (
    <>
      <DialogTitle> {data?.tickets?.title}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ padding: 5 }}>
          {satisfactoryFields.map((rating, index) => (
            <div key={index} style={{ marginBottom: 25 }}>
              <Typography
                component="legend"
                sx={{ fontSize: "1.25rem", fontWeight: 500 }}
              >
                {rating.label}
              </Typography>
              <Rating
                name={rating.name}
                value={rating.value}
                readOnly
                size="large"
              />
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: 600, lineHeight: 1.5 }}
      >
        Percentage:{" "}
        <span style={{ color: "#4caf50" }}>
          {data?.tickets?.ticket_satisfactory?.average_satisfactory}%
        </span>
        <br />
        <Typography
          variant="subtitle2"
          component="span"
          sx={{ fontWeight: 400, color: "#757575" }}
        >
          Submitted By:{" "}
          {data?.tickets?.ticket_satisfactory?.user?.name || "N/A"}
        </Typography>
      </DialogTitle>
    </>
  );
}

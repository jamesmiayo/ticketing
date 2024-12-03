import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { ticketApi } from "../../api/services/ticket";
import { useExecuteToast } from "../../context/ToastContext";
import {
  Button,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
  Box,
  Paper,
  Fade,
  Grid,
  Container,
} from "@mui/material";
import { createTicketSatisfactory } from "../../schema/Ticket/createTicketSatisfactory";
import { Star, StarBorder } from "@mui/icons-material";
import cry from "../../assets/svg/cry.svg";
import sad from "../../assets/svg/sad.svg";
import okay from "../../assets/svg/okay.svg";
import good from "../../assets/svg/good.svg";
import amazing from "../../assets/svg/amazing.svg";
import { useEffect, useState } from "react";

export default function TicketStatus({ data, setOpen, refetch }: any) {
  const toast = useExecuteToast();

  const [activeSatisfaction, setActiveSatisfaction] = useState<number | null>(
    null
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<any>({
    resolver: yupResolver(createTicketSatisfactory),
  });

  useEffect(() => {
    setValue("overall_satisfaction", activeSatisfaction);
  }, [activeSatisfaction, setValue]);

  const onSubmit = async (formData: any) => {
    if (activeSatisfaction === null) {
      toast.executeToast(
        "Please select an overall satisfaction rating",
        "top-center",
        true,
        {
          type: "error",
        }
      );
      return;
    }
    setOpen(false);
    try {
      const response = await ticketApi.createSatisfactory(data.id, formData);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      refetch();
      reset();
    } catch (error: any) {
      toast.executeToast(error?.response?.data?.message, "top-center", true, {
        type: "error",
      });
    }
  };

  const ratingTitles = [
    { name: "satisfactory_1", label: "Overall Satisfaction" },
    { name: "satisfactory_2", label: "Customer Support" },
    { name: "satisfactory_3", label: "Ease of Use" },
    { name: "satisfactory_4", label: "Features" },
    { name: "satisfactory_5", label: "Value for Money" },
  ];

  const userSatisfaction = [
    {
      value: "Terrible",
      svg: cry,
    },
    {
      value: "Bad",
      svg: sad,
    },
    {
      value: "Okay",
      svg: okay,
    },
    {
      value: "Good",
      svg: good,
    },
    {
      value: "Amazing",
      svg: amazing,
    },
  ];

  return (
    <>
      <DialogTitle sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h5" component="span" fontWeight="bold">
          Before closing Ticket
          <Box component="span" sx={{ color: "error.main", ml: 1 }}>
            ({data?.ticket_id})
          </Box>
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Please complete the Satisfactory Form
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container sx={{ marginBottom: "20px" }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" component="span" fontWeight="bold">
                  Give Feedback
                </Typography>
              </Box>
              <Container>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 2,
                  }}
                >
                  {userSatisfaction.map((items, index) => (
                    <Box
                      sx={{
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      key={index}
                      onClick={() => setActiveSatisfaction(index)}
                    >
                      <Box
                        sx={{
                          padding: "1px",
                          border: "1px solid #8988",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          boxShadow:
                            activeSatisfaction === index
                              ? "0 0 20px 5px rgba(0, 255, 0, 0.8)"
                              : "none",
                          "&:hover": {
                            transform: "scale(1.2)",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                          },
                        }}
                      >
                        <img
                          src={items.svg}
                          alt="cry Icon"
                          style={{ width: "60px", height: "60px" }}
                        />
                      </Box>
                      <Typography>{items.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Container>
            </Container>
            <Grid container spacing={2}>
              {ratingTitles.map((rating, index) => (
                <Fade
                  in={true}
                  key={index}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        component="legend"
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 500,
                          flexBasis: "40%",
                          pr: 2,
                        }}
                      >
                        {rating.label}
                      </Typography>
                      <Box sx={{ flexBasis: "60%" }}>
                        <Controller
                          name={rating.name}
                          control={control}
                          render={({ field }) => (
                            <Rating
                              {...field}
                              value={field.value}
                              onChange={(_, newValue) =>
                                field.onChange(newValue)
                              }
                              size="large"
                              icon={<Star fontSize="inherit" color="primary" />}
                              emptyIcon={<StarBorder fontSize="inherit" />}
                              sx={{
                                fontSize: "1.5rem",
                                "& .MuiRating-iconFilled": {
                                  color: "primary.main",
                                },
                                "& .MuiRating-iconHover": {
                                  color: "primary.light",
                                },
                              }}
                            />
                          )}
                        />
                        {errors[rating.name] && (
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{ mt: 0.5, display: "block" }}
                          >
                            {
                              (
                                errors.rating as Record<
                                  string,
                                  { message: string }
                                >
                              )[rating.name]?.message
                            }
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Fade>
              ))}
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{
                mt: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                py: 1.5,
              }}
            >
              Submit Feedback
            </Button>
          </form>
        </Paper>
      </DialogContent>
    </>
  );
}

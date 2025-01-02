import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FAQ } from "../../api/services/FAQ";

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [faqDetails, setFaqDetails] = useState([]);

  const filteredQuestions = faqDetails.filter(
    (faq: any) => faq.description === selectedCategory
  );

  const getDataList = async () => {
    try {
      setLoading(true);

      const response = await FAQ.getFAQ();

      const dataOption = response.map((row: any) => ({
        value: row.FAQ_ID,
        label: row.description,
      }));

      console.log(dataOption);

      setSelectedCategory(dataOption[0]?.label);

      const faqData = response.flatMap((row: any) =>
        row.faq_details.map((detail: any) => ({
          id: detail.id,
          FAQ_ID: row.FAQ_ID,
          description: row.description,
          title: detail.title,
          body: detail.body,
        }))
      );
      setFaqDetails(faqData);
      setDataList(dataOption);
    } catch (error) {
      console.error("Error fetching FAQ HDR list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  if (loading) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        width={"100%"}
      >
        <CircularProgress size={54} color="inherit" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        p: 5,
      }}
    >
      <Typography variant="h4" fontWeight={"bold"} gutterBottom>
        Frequently asked questions
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        sx={{ maxWidth: "600px", mb: 4 }}
      >
        These are the most commonly asked questions about Ticketing. Can't find
        what you're looking for?{" "}
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Chat to our friendly team!
        </span>
      </Typography>

      <Box display="flex" justifyContent="center" gap={1} mb={4}>
        {dataList.map((category: any) => (
          <Chip
            key={category.value}
            label={category.label}
            onClick={() => setSelectedCategory(category.label)}
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              bgcolor:
                selectedCategory === category.description ? "black" : "white",
              color:
                selectedCategory === category.description ? "white" : "black",
              cursor: "pointer",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "grey.800",
                color: "white",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
              },
              "&:active": {
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
                transform: "translateY(0px)",
              },
            }}
          />
        ))}
      </Box>

      <Box width="100%" maxWidth="700px">
        {filteredQuestions.map((faq: any) => (
          <Accordion
            key={faq.id}
            sx={{
              mb: 2,
              boxShadow: "none",
              bgcolor: "transparent",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "grey.700" }} />}
              sx={{
                "&.Mui-expanded": {
                  minHeight: "48px",
                },
                padding: "12px 16px",
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  color: "text.primary",
                  fontSize: "1rem",
                }}
              >
                {faq.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.04)",
                borderRadius: "0 0 8px 8px",
                padding: "12px 16px",
              }}
            >
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                }}
              >
                {faq.body}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        {filteredQuestions.length === 0 && (
          <Typography textAlign="center" color="text.secondary">
            No questions available in this category.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

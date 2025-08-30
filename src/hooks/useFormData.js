import { useState, useEffect } from "react";
import { fetchChoicesForForm } from "../services/formDataService";

export const useFormData = () => {
  const [formLabels, setFormLabels] = useState([
  { label: "Price", id: "price", widget: "integer" },
    { label: "Discount", id: "discount", widget: "integer" },
    { label: "Notes", id: "notes", widget: "text" },

    { label: "City", id: "city", widget: "text" },
    { label: "Language", id: "language", widget: "choice" },
    { label: "Material", id: "material", widget: "choice" },
    { label: "Category", id: "category", widget: "choice" },
    { label: "Quantity", id: "quantity", widget: "integer" },
    { label: "Rating", id: "rating", widget: "integer" },
    { label: "Comments", id: "comments", widget: "text" },
    { label: "Country", id: "country", widget: "text" },
    { label: "Weight", id: "weight", widget: "integer" },
    { label: "Stock", id: "stock", widget: "integer" },
    { label: "Description", id: "description", widget: "text" },
    { label: "Age", id: "age", widget: "integer" },
    { label: "Feedback", id: "feedback", widget: "text" },
    { label: "Experience", id: "experience", widget: "integer" },

    { label: "Length", id: "length", widget: "integer" },
    { label: "Width", id: "width", widget: "integer" }, 
    { label: "NotesExtra", id: "notesExtra", widget: "text" },
    { label: "Temperature", id: "temperature", widget: "integer" },
    { label: "Humidity", id: "humidity", widget: "integer" },
    { label: "Remarks", id: "remarks", widget: "text" },
    { label: "Voltage", id: "voltage", widget: "integer" },
        { label: "Color", id: "color", widget: "choice" }
  ]);

  const [choices, setChoices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const allChoices = await fetchChoicesForForm(formLabels);
        setChoices(allChoices);
        setLoading(false);
      } catch (err) {
        console.error(err.message || "Error fetching choices");
      }
    };

    fetchChoices();
  }, [formLabels]);

  return { formLabels, choices, loading };
};
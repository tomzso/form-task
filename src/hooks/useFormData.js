import { useState, useEffect } from "react";
import { getLabels, getChoices } from "../services/api/formApi";

export const useFormData = () => {
  const [formLabels, setFormLabels] = useState([]);
  const [choices, setChoices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formLabelData = await getLabels();
        setFormLabels(formLabelData.data);

        formLabelData.data.forEach(async (field) => {
          if (field.widget === "choice") {
            const choiceData = await getChoices(field.id);
            setChoices((prev) => ({ ...prev, [field.id]: choiceData.data }));
          }
        });
        setLoading(false);
      } catch (err) {
        console.error(err.message || "Error fetching form");
      } 
    };

    fetchForm();
  }, []);

  return { formLabels, choices, loading };
};

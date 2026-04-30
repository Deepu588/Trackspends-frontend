import { useState, useEffect } from "react";
import api from "../Api";
import { TOTAL_AMOUNT_SPENT_PER_CATEGORY } from "../api-routes";
const useCategoryExpenses = () => {
  const [categories, setCategories] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryExpenses = async () => {
      try {
        setLoading(true);
        //const token = localStorage.getItem("token");
        const response = await api.get(TOTAL_AMOUNT_SPENT_PER_CATEGORY);

        if (response.data.success) {
          const data = response.data.data;
          setCategories(data.map((item) => item.category));
          setAmounts(data.map((item) => item.amount));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryExpenses();
  }, []);

  return { categories, amounts, loading, error };
};

export default useCategoryExpenses;
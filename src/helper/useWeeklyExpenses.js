import { useState, useEffect } from "react";
//import axios from "axios";
import api from "../Api";
import { GET_CURRENT_WEEK_EXPENSES_PER_DAY } from "../api-routes";

const useWeeklyExpenses = () => {
  const [days, setDays] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyExpenses = async () => {
      try {
        setLoading(true);
        //const token = localStorage.getItem("token");
        const response = await api.get(GET_CURRENT_WEEK_EXPENSES_PER_DAY);

        if (response.data.success) {
          const data = response.data.data;
          setDays(
            data.map((item) =>
              new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            )
          );
          setAmounts(data.map((item) => item.totalAmountPerDay));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyExpenses();
  }, []);

  return { days, amounts, loading, error };
};

export default useWeeklyExpenses;
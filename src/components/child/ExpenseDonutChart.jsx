import React from "react";
import Chart from "react-apexcharts";

const ExpenseDonutChart = ({ data }) => {
  const savings = data?.calculatedSavingsInMonth || 0;
  const expenses = data?.sumOfAllExpensesInGivenMonth || 0;
  const salary = data?.salaryInMonth || 0;

  const series = [expenses, savings];

  const options = {
    chart: {
      type: "donut"
    },

    labels: ["Expenses", "Savings"],

    colors: ["#ef4444", "#7b2ff7"], // red + violet

    legend: {
      position: "bottom"
    },

    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + "%";
      }
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "₹ " + val;
        }
      }
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Salary",
              formatter: () => "₹ " + salary
            }
          }
        }
      }
    }
  };

  return (
    <div>
      <Chart options={options} series={series} type="donut" width="380" />
    </div>
  );
};

export default ExpenseDonutChart;
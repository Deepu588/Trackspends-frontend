import React from "react";
import ReactApexChart from "react-apexcharts";
import useCategoryExpenses from "../helper/useCategoryExpenses";
import { formatCurrency } from "../helper/formatCurrency";

const CategoryExpensesChart = () => {
  const { categories, amounts, loading, error } = useCategoryExpenses();

  const total = amounts.reduce((sum, val) => sum + val, 0);

  const options = {
    chart: {
      type: "donut",
      fontFamily: "inherit",
    },
    labels: categories,
    colors: ["#22d3ee", "#f59e0b", "#a78bfa", "#34d399", "#f87171", "#60a5fa"],
    legend: {
      position: "bottom",
      fontSize: "13px",
      markers: { radius: 4 },
      itemMargin: { horizontal: 10, vertical: 6 },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(1)}%`,
      style: { fontSize: "11px", fontWeight: 600 },
      dropShadow: { enabled: false },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Spent",
              fontSize: "13px",
              fontWeight: 600,
              color: "#6c757d",
              formatter: () => formatCurrency(total),
            },
            value: {
              fontSize: "20px",
              fontWeight: 700,
              color: "#111827",
              formatter: (val) => formatCurrency(Number(val)),
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => formatCurrency(val),
      },
    },
    stroke: { width: 2 },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { height: 300 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <div className="col-xxl-6 col-md-12">
      <div className="card h-100 radius-8 shadow-2 border border-white">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between pb-16 flex-wrap gap-2">
          <h6 className="fw-semibold mb-0">Expenses by Category</h6>
          <span className="text-secondary-light text-sm fw-medium">All Time</span>
        </div>
        <div className="card-body p-24">
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 300 }}
            >
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <>
              <ReactApexChart
                options={options}
                series={amounts}
                type="donut"
                height={320}
              />
              <ul className="mt-16 list-unstyled d-flex flex-column gap-10">
                {categories.map((cat, i) => (
                  <li
                    key={cat}
                    className="d-flex align-items-center justify-content-between text-sm"
                  >
                    <span className="d-flex align-items-center gap-8">
                      <span
                        className="w-12-px h-12-px rounded-circle d-inline-block"
                        style={{
                          backgroundColor:
                            options.colors[i % options.colors.length],
                        }}
                      />
                      <span className="text-secondary-light">{cat}</span>
                    </span>
                    <span className="fw-semibold">{formatCurrency(amounts[i])}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryExpensesChart;
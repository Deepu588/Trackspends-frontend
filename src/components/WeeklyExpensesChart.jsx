import React from "react";
import ReactApexChart from "react-apexcharts";
import useWeeklyExpenses from "../helper/useWeeklyExpenses";
import { formatCurrency } from "../helper/formatCurrency";

const WeeklyExpensesChart = () => {
  const { days, amounts, loading, error } = useWeeklyExpenses();

  const maxAmount = Math.max(...amounts, 0);
  const totalWeek = amounts.reduce((s, v) => s + v, 0);
  const avgDay = amounts.length ? Math.round(totalWeek / amounts.length) : 0;
  const peakDay = days[amounts.indexOf(maxAmount)];

  const options = {
    chart: {
      type: "bar",
      fontFamily: "inherit",
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 600,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => formatCurrency(val),
      offsetY: -20,
      style: { fontSize: "11px", fontWeight: 600, colors: ["#374151"] },
    },
    xaxis: {
      categories: days,
      labels: {
        style: { fontSize: "12px", colors: "#6c757d", fontWeight: 500 },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      max: maxAmount + 50,
      labels: {
        formatter: (val) => formatCurrency(val),
        style: { fontSize: "12px", colors: "#6c757d" },
      },
    },
    grid: {
      borderColor: "#f0f0f0",
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#a5f3fc"],
        stops: [0, 100],
      },
    },
    colors: ["#22d3ee"],
    tooltip: {
      y: { formatter: (val) => formatCurrency(val) },
    },
    states: {
      hover: { filter: { type: "darken", value: 0.85 } },
    },
  };

  const series = [{ name: "Daily Spending", data: amounts }];

  return (
    <div className="col-xxl-6 col-md-12 mt-8 mb-8">
      <div className="card h-100 radius-8 shadow-2 border border-white">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between pb-16 flex-wrap gap-2">
          <h6 className="fw-semibold mb-0">Weekly Spending Overview</h6>
          <span className="text-secondary-light text-sm fw-medium">This Week</span>
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
              {/* Summary pills */}
              <div className="d-flex flex-wrap gap-12 mb-20">
                <span className="bg-cyan-50 text-cyan-600 px-10 py-4 rounded-pill text-sm fw-medium">
                  Week Total: <strong>{formatCurrency(totalWeek)}</strong>
                </span>
                <span className="bg-success-focus text-success-main px-10 py-4 rounded-pill text-sm fw-medium">
                  Daily Avg: <strong>{formatCurrency(avgDay)}</strong>
                </span>
                <span className="bg-danger-focus text-danger-main px-10 py-4 rounded-pill text-sm fw-medium">
                  Peak: <strong>{peakDay} ({formatCurrency(maxAmount)})</strong>
                </span>
              </div>

              <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={280}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyExpensesChart;
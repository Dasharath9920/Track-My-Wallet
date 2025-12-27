import Chart from "react-apexcharts";
import { type ApexOptions } from "apexcharts";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { USERID } from "../../constants";
import { getAllTransactionsGroupByDay } from "../../core/transaction-web";
import { useDispatch, useSelector } from "react-redux";
import { StoreActions, type InitialState } from "../../datatypes";

const OverviewChart = () => {
  const overviewChartData = useSelector((state: InitialState) => state.overviewChart);
  const transactions = useSelector((state: InitialState) => state.transactions);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const userId = localStorage.getItem(USERID);
      if (userId) {
        try {
          const data = await getAllTransactionsGroupByDay(userId, 30);
          dispatch({
            type: StoreActions.UPDATE_OVERVIEW_CHART,
            data
          });
        } catch (err) {
          console.error('failed to fetch statistics: ', err);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [transactions]);

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: true },
      foreColor: "#535353ff",
    },

    stroke: {
      curve: "smooth",
      width: 3,
    },

    colors: ["#6366F1"],

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.7,
        opacityFrom: 0.9,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },

    grid: {
      borderColor: "#ff001eff",
      strokeDashArray: 3,
    },

    dataLabels: { enabled: false },

    tooltip: {
      theme: "dark",
      style: { fontSize: "14px" },
      y: {
        formatter: (value: any) => `₹${value}`,
      },
    },

    xaxis: {
      categories: overviewChartData.map(d => d.day),
      title: { text: "Day of Month" },
    },

    yaxis: {
      title: { text: "Amount Spent" },
      labels: { formatter: (v: any) => `₹${v}` },
    }
  };

  const series = [
    {
      name: "Amount Spent",
      data: overviewChartData.map(d => d.amount),
    },
  ];

  return (
    <Card heading="Spending Overview" loading={loading}>
      <div className='content-container'>
        <div style={{ width: "100%", height: 200 }}>
          <Chart options={options} series={series} type="area" height="100%" />
        </div>
      </div>
    </Card>

  );
}

export default OverviewChart;
import Chart from "react-apexcharts";
import { type ApexOptions } from "apexcharts";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { USERID } from "../../constants";
import { getAllTransactionsGroupByDay } from "../../core/transaction-web";

const OverviewChart = () => {

  const [data, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const userId = localStorage.getItem(USERID);
      if (userId) {
        const res = await getAllTransactionsGroupByDay(userId, 30);
        setChartData(res);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: true },
      foreColor: "#adaf9cff",
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
      borderColor: "#1F2937",
      strokeDashArray: 4,
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
      categories: data.map(d => d.day),
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
      data: data.map(d => d.amount),
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
import Chart from "react-apexcharts";
import { type ApexOptions } from "apexcharts";
import Card from "../Card/Card";

const OverviewChart = () => {

  const data = [
    { day: "1", amount: 120 },
    { day: "2", amount: 90 },
    { day: "3", amount: 240 },
    { day: "4", amount: 140 },
    { day: "5", amount: 300 },
    { day: "6", amount: 180 },
    { day: "7", amount: 210 },
    { day: "8", amount: 175 },
    { day: "9", amount: 95 },
    { day: "10", amount: 220 },
    { day: "11", amount: 150 },
    { day: "12", amount: 260 },
    { day: "13", amount: 130 },
    { day: "14", amount: 280 },
    { day: "15", amount: 190 },
    { day: "16", amount: 230 },
    { day: "17", amount: 110 },
    { day: "18", amount: 245 },
    { day: "19", amount: 160 },
    { day: "20", amount: 300 },
    { day: "21", amount: 200 },
    { day: "22", amount: 140 },
    { day: "23", amount: 275 },
    { day: "24", amount: 155 },
    { day: "25", amount: 310 },
    { day: "26", amount: 180 },
    { day: "27", amount: 260 },
    { day: "28", amount: 170 },
    { day: "29", amount: 290 },
    { day: "30", amount: 200 },
    { day: "31", amount: 320 }
  ];


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
    <Card heading="Spending Overview" loading={false}>
      <div className='content-container'>
        <div style={{ width: "100%", height: 200 }}>
          <Chart options={options} series={series} type="area" height="100%" />
        </div>
      </div>
    </Card>

  );
}

export default OverviewChart;
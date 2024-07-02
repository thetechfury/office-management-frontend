'use client'
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { HiArrowTrendingUp } from "react-icons/hi2";

const MonthlyExpenseChart = () => {
  const thisWeekData = {
    labels: ["May 1", "May 2", "May 3", "May 4", "May 5", "May 6", "May 7", "May 8", "May 9", "May 10"],
    datasets: [
      {
        data: [200, 300, 290, 350, 150, 350, 300, 100, 125, 220],
        backgroundColor: "#377dff",
        hoverBackgroundColor: "#377dff",
        borderColor: "#377dff",
        borderRadius: 2,
        barThickness: 10
      },
      {
        data: [150, 230, 382, 204, 169, 290, 300, 100, 300, 225],
        backgroundColor: "#e7eaf3",
        borderColor: "#e7eaf3",
        borderRadius: 2,
        barThickness: 10
      }
    ]
  };

  const lastWeekData = {
    labels: ["Apr 24", "Apr 25", "Apr 26", "Apr 27", "Apr 28", "Apr 29", "Apr 30"],
    datasets: [
      {
        data: [180, 280, 250, 320, 140, 330, 290],
        backgroundColor: "#377dff",
        borderColor: "#377dff",
        borderRadius: 2,
        barThickness: 10
      },
      {
        data: [130, 220, 360, 190, 160, 270, 290],
        backgroundColor: "#e7eaf3",
        borderColor: "#e7eaf3",
        borderRadius: 2,
        barThickness: 10
      }
    ]
  };

  const [chartData, setChartData] = useState(thisWeekData);
  const [activeTab, setActiveTab] = useState('thisWeek');

  const handleToggle = (week) => {
    if (week === 'thisWeek') {
      setChartData(thisWeekData);
    } else {
      setChartData(lastWeekData);
    }
    setActiveTab(week);
  };

  const chartOptions = {
    scales: {
      y: {
        grid: {
          color: "#e7eaf3",
          drawBorder: false,
          zeroLineColor: "#e7eaf3"
        },
        ticks: {
          beginAtZero: true,
          stepSize: 100,
          fontSize: 12,
          color: "#97a4af",
          fontFamily: "Open Sans, sans-serif",
          padding: 10,
          callback: function(value) {
            return `$${value}`;
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          fontSize: 12,
          color: "#97a4af",
          fontFamily: "Open Sans, sans-serif",
          padding: 5
        },
        categoryPercentage: 0.5,
        maxBarThickness: 10
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `$${tooltipItem.raw}`;
          }
        },
        intersect: false,
        mode: 'index',
        hasIndicator: true,
        prefix: '$'
      },
      hover: {
        mode: 'nearest',
        intersect: true
      }
    }
  };

  return (
    <div className="col-span-5 lg:col-span-3 mb-3 lg:mb-5">
      <div className="card h-full border border-inherit rounded-xl">
        <div className="card-header card-header-first-child flex justify-between items-center border-b px-[1.325rem] py-3">
          <h5 className="card-header-title">Monthly expenses</h5>
          <ul className="flex space-x-4 relative bg-[#f8fafd] items-center p-2 rounded-md" id="expensesTab" role="tablist">
            <li className={`nav-item cursor-pointer ${activeTab === 'thisWeek' ? 'bg-white shadow-lg p-2' : ''}`}>
              <a className="nav-link " onClick={() => handleToggle('thisWeek')} data-toggle="tab">This week</a>
            </li>
            <li className={`nav-item cursor-pointer ${activeTab === 'lastWeek' ? 'bg-white shadow-lg p-2' : ''}`}>
              <a className="nav-link " onClick={() => handleToggle('lastWeek')} data-toggle="tab">Last week</a>
            </li>
          </ul>
        </div>
        <div className="card-body p-[1.325rem]">
          <div className="grid grid-cols-2 mb-4">
            <div className="col-span-1">
              <div className="flex items-center">
                <span className="text-4xl mb-0">35%</span>
                <span className="text-[#00c9a7] ml-2 flex items-center gap-2">
                  <HiArrowTrendingUp /> 25.3%
                </span>
              </div>
            </div>
            <div className="col-span-1 flex justify-end">
              <div className="flex space-x-4 text-sm">
                <div>
                  <span className="inline-block w-3 h-3 bg-[#377dff] rounded-full"></span> New
                </div>
                <div>
                  <span className="inline-block w-3 h-3 bg-gray-300 rounded-full"></span> Overdue
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-[-10]">
            <Bar
              data={chartData}
              options={chartOptions}
              height={350} // Set the height of the chart
              width={900} // Set the width of the chart
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpenseChart;

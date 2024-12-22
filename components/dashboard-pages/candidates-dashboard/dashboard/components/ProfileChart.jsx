import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },

    tooltips: {
      position: "nearest",
      mode: "index",
      intersect: false,
      yPadding: 10,
      xPadding: 10,
      caretSize: 4,
      backgroundColor: "rgba(72, 241, 12, 1)",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 4,
    },
  },
};

const ProfileChart = () => {

  const { t } = useTranslation('dashboard/candidate/dashboard')
  const { statJobAlert } = useSelector(state => state.candidateDashboard)

  // Get the current date and time
  const currentDate = new Date(Date.now());
  // Subtract one year
  currentDate.setFullYear(currentDate.getFullYear() - 1);
  // Convert the date one year ago to epoch time (Unix timestamp)
  const epochTimeOneYearAgo = Math.floor(currentDate.getTime() / 1000);

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  function getLast12Months() {
    const result = [];
    let currentDate = new Date();

    for (let i = 0; i < 12; i++) {
        // Get month and year
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        // Format: Month Year (e.g., January 2022)
        result.unshift({name: `${monthNames[month]} ${year}`, data: 0});
        // Move to the previous month
        currentDate.setMonth(month - 1);
    }

    return result;
  }

  let last12Months = getLast12Months();
  
  statJobAlert.forEach(({ createdAt }) => {
    if(new Date(createdAt).getTime() > epochTimeOneYearAgo) {
      const month = new Date(createdAt).getMonth();
      const year = new Date(createdAt).getFullYear();
      return last12Months.map(item => item.name == `${monthNames[month]} ${year}` 
        ? {...item, data: item.data += 1 }
        : item
      )
    }
    return
  });

  const data = {
    labels: last12Months.map((item) => item.name),
    datasets: [
      {
        label: "Applicant Listing",
        borderColor: "#1967d2",
        backgroundColor: "#1967d2",
        data: last12Months.map(item => item.data),
        fill: false,
      },
    ],
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>{t('profile_chart_h4')}</h4>
      </div>
      {/* End widget top bar */}

      <div className="widget-content">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default ProfileChart;

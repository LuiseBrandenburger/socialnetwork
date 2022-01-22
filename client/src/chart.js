import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function MyChart() {
    // const [chartData, setChartData] = useState({});

    // useEffect(() => {
    //     setChartData({
    //         datasets: [
    //             {
    //                 data: [20, 10],
    //             },
    //         ],
    //         labels: ["a", "b"],
    //     });
    // }, []);

    return (
        <div className="chart">
            <h1>Hello i Am in Chart</h1>

            <Bar
                data={
                    // chartData
                    {
                        labels: ["a", "b"],
                        datasets: [
                            {
                                label: "my first Chart Try",
                                data: [20, 10],
                                backgroundColor: ["grey", "darkgrey"]
                            },
                        ],
                    }
                }
                // width={100}
                // height={50}
                options={{}}
            />
        </div>
    );
}

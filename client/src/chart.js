import { Bar } from "react-chartjs-2";
// import React, {Component} from "react";
import { useEffect, useState } from "react";

export default function Chart() {
    const [chartData, setChartData] = useState();

    useEffect(() => {
        setChartData({
            datasets: [
                {
                    data: [20, 10],
                },
            ],
            labels: ["a", "b"],
        });
    }, []);

    return (
        <div className="chart">
            <h1>Hello i Am in Chart</h1>

            <Bar
                data={chartData}
                // width={100}
                // height={50}
                options={{}}
            />
        </div>
    );
}

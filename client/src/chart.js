import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 90,
    },
    {
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue(params.id, "firstName") || ""} ${
                params.getValue(params.id, "lastName") || ""
            }`,
    },
];

const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];


export default function MyChart() {


    // https://www.chartjs.org/docs/latest/charts/bar.html

    // const [chartData, setChartData] = useState({
    //     labels: ["a", "b", "c", "d"],
    //     datasets: [
    //         {
    //             label: "my first Chart Try",
    //             data: [20, 100, 350, 500],
    //             backgroundColor: ["grey"],
    //             barPercentage: 0.5,
    //             barThickness: 10,
    //             maxBarThickness: 8,
    //             minBarLength: 2,
    //         },
    //     ],
    // });

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

            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>

            {/* <Bar
                data={
                    chartData
                    // {
                    //     labels: ["a", "b"],
                    //     datasets: [
                    //         {
                    //             label: "my first Chart Try",
                    //             data: [20, 10],
                    //             backgroundColor: ["grey", "darkgrey"],
                    //         },
                    //     ],
                    // }
                }
                // width={100}
                // height={50}
                options={
                    {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }
                }
            /> */}
        </div>
    );
}

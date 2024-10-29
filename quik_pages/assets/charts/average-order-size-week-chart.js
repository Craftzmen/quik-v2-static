"use strict";

// Class definition
var AverageOrderSizeWeekChart = function () {
    var initAverageOrderSizeWeekChart = function () {
        var elements = document.getElementsByClassName("average_order_size_week_chart");

        if (elements.length === 0) {
            return;
        }

        var isMobile = window.innerWidth < 768; // Adjust the breakpoint as necessary
        var borderRadiusValue = isMobile ? 5 : 10; // 5 for mobile, 10 for desktop

        // Generate labels for the past 7 days
        function getLast7Days() {
            const labels = [];
            const today = new Date();
            for (let i = 6; i >= 0; i--) {
                const day = new Date(today);
                day.setDate(today.getDate() - i);
                labels.push(day.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
            }
            return labels;
        }

        // Generate random data for the past 7 days
        function generateRandomData(numDays) {
            return Array.from({ length: numDays }, () => Math.floor(Math.random() * 50) + 10);
        }

        var labels = getLast7Days(); // Use dynamic labels for the last 7 days
        var dataset1Data = generateRandomData(7); // First set of random data for 7 days
        var dataset2Data = generateRandomData(7); // Second set of random data for 7 days

        Array.from(elements).forEach(function(element) {
            // Destroy any existing chart instance linked to this element
            if (element.chartInstance) {
                element.chartInstance.destroy();
            }

            var config = {
                type: 'bar',
                data: {
                    labels: labels, // Use 7-day labels
                    datasets: [{
                        label: 'Dataset 1',
                        data: dataset1Data, // Dynamic data for Dataset 1
                        backgroundColor: '#8AEFD1',
                        borderColor: '#EFF2F5',
                        borderSkipped: false,
                        borderDash: [5, 5],
                    }, {
                        label: 'Dataset 2',
                        data: dataset2Data, // Dynamic data for Dataset 2
                        backgroundColor: '#639787',
                        borderColor: '#EFF2F5',
                        borderRadius: { topLeft: borderRadiusValue, topRight: borderRadiusValue },
                        borderSkipped: false,
                        borderDash: [5, 5],
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, // Maintain the aspect ratio to prevent height issues
                    scales: {
                        x: {
                            stacked: true,
                            barPercentage: 0.5,
                            categoryPercentage: 0.5,
                            grid: {
                                display: false,
                                drawBorder: false,
                            },
                            ticks: {
                                padding: 10,
                            }
                        },
                        y: {
                            stacked: true,
                            grid: {
                                borderColor: '#EFF2F5',
                                borderDash: [5, 5],
                                drawBorder: false,
                            },
                            ticks: {
                                padding: 20,
                                callback: function(value, index, values) {
                                    if (index === values.length - 1) {
                                        this.options.grid.drawOnChartArea = false;
                                    }
                                    return value;
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            };

            var ctx = element.getContext('2d');
            element.chartInstance = new Chart(ctx, config); // Store the chart instance for cleanup
        });
    }

    // Public methods
    return {
        init: function () {
            initAverageOrderSizeWeekChart();
        }
    }
}();

KTUtil.onDOMContentLoaded(function() {
    AverageOrderSizeWeekChart.init();
});

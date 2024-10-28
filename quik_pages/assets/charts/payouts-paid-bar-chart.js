"use strict";

// Class definition
var PayoutsPaidBarChart = function () {    
    var initChart = function () {
        // Get all elements with the class 'live_orders_bar_chart'
        var elements = document.getElementsByClassName("payouts_paid_bar_chart");

        if (elements.length === 0) {
            return;
        }

        // Determine border radius based on window width
        var isMobile = window.innerWidth < 768; // Adjust the breakpoint as necessary
        var borderRadiusValue = isMobile ? 5 : 10; // 5 for mobile, 10 for desktop

        // Loop through all elements and initialize a chart for each one
        Array.from(elements).forEach(function(element) {
            var config = {
                type: 'bar', // Set to 'bar' for a bar chart
                data: {
                    labels: ['July 1', 'July 2', 'July 3', 'July 4', 'July 5', 'July 6', 'July 7', 'July 8', 'July 9', 'July 10', 'July 11', "July 12"], // Labels for each column
                    datasets: [{
                        label: 'Dataset 1',
                        data: [30, 30, 20, 30, 20, 30, 40, 30, 10, 20, 30, 30], // First set of data (bottom stack)
                        backgroundColor: '#639787',
                        borderColor: '#EFF2F5', // Border color
                        borderSkipped: false, // Ensure top border radius is applied
                        borderDash: [5, 5], // Dashed border
                    }, {
                        label: 'Dataset 2',
                        data: [20, 30, 40, 20, 10, 20, 10, 10, 50, 10, 20, 30], // Second set of data (top stack)
                        backgroundColor: '#8AEFD1',
                        borderColor: '#EFF2F5', // Border color
                        borderRadius: { topLeft: borderRadiusValue, topRight: borderRadiusValue }, // Dynamic border radius
                        borderSkipped: false, // Ensure top border radius is applied
                        borderDash: [5, 5], // Dashed border
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            stacked: true, // Stack the bars on the x-axis
                            barPercentage: 0.5, // Increase space between bars
                            categoryPercentage: 0.5, // Adjust spacing between columns
                            grid: {
                                display: false, // Hide vertical grid lines (borders)
                                drawBorder: false, // Remove x-axis line
                            },
                            ticks: {
                                padding: 10, // Add space after the last horizontal value
                            }
                        },
                        y: {
                            stacked: true, // Stack the bars on the y-axis
                            grid: {
                                borderColor: '#EFF2F5', // Grid color
                                borderDash: [5, 5], // Make grid lines dashed
                                drawBorder: false, // Hide vertical borders
                            },
                            ticks: {
                                padding: 20, // Add space after the last vertical value
                                callback: function(value, index, values) {
                                    // Disable the last horizontal line
                                    if (index === values.length - 1) {
                                        this.options.grid.drawOnChartArea = false; // Disable drawing on chart area for last tick
                                    }
                                    return value; // Return the tick value
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false // Hide the legend (Dataset 1 and Dataset 2)
                        }
                    }               
                }
            };

            var ctx = element.getContext('2d');
            new Chart(ctx, config);
        });
    }

    // Public methods
    return {
        init: function () {
            initChart();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    PayoutsPaidBarChart.init();
});

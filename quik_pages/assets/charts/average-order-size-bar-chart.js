"use strict";

// Class definition
var AverageOrdersSizeBarChart = function () {
    var initAverageOrdersSizeBarChart = function () {
        var elements = document.getElementsByClassName("average_orders_size_bar_chart");

        if (elements.length === 0) {
            return;
        }

        var isMobile = window.innerWidth < 768; // Adjust the breakpoint as necessary
        var borderRadiusValue = isMobile ? 5 : 10; // 5 for mobile, 10 for desktop

        // Generate labels for a 31-day month
        var labels = Array.from({ length: 31 }, (_, i) => `July ${i + 1}`);

        // Generate random data for 31 days
        function generateRandomData(numDays) {
            return Array.from({ length: numDays }, () => Math.floor(Math.random() * 50) + 10);
        }

        var dataset1Data = generateRandomData(31); // First set of random data
        var dataset2Data = generateRandomData(31); // Second set of random data

        Array.from(elements).forEach(function(element) {
            // Destroy any existing chart instance linked to this element
            if (element.chartInstance) {
                element.chartInstance.destroy();
            }

            var config = {
                type: 'bar',
                data: {
                    labels: labels, // Use 31-day labels
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
                    maintainAspectRatio: true, // Maintain aspect ratio to help control height
                    devicePixelRatio: window.devicePixelRatio || 1,
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
                                padding: 0,
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
            initAverageOrdersSizeBarChart();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    AverageOrdersSizeBarChart.init();
});

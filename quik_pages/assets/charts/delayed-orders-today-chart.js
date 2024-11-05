"use strict";

// Class definition
var DelayedOrdersTodayChart = function () {
    var initDelayedOrdersTodayChart = function () {
        var elements = document.getElementsByClassName("delayed_orders_today_chart");

        if (elements.length === 0) {
            return;
        }

        var isMobile = window.innerWidth < 768; // Adjust the breakpoint as necessary
        var borderRadiusValue = isMobile ? 5 : 10; // 5 for mobile, 10 for desktop

        // Get today's date in the desired format
        const todayLabel = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

        // Generate a single random data point for today
        function generateTodayData() {
            return Math.floor(Math.random() * 50) + 10;
        }

        var todayData1 = generateTodayData(); // Random data for Dataset 1
        var todayData2 = generateTodayData(); // Random data for Dataset 2

        Array.from(elements).forEach(function(element) {
            // Destroy any existing chart instance linked to this element
            if (element.chartInstance) {
                element.chartInstance.destroy();
            }

            var config = {
                type: 'bar',
                data: {
                    labels: [todayLabel], // Only today's label
                    datasets: [{
                        label: 'Dataset 1',
                        data: [todayData1], // Data for Dataset 1
                        backgroundColor: '#FFB5B5',
                        borderColor: '#EFF2F5',
                        borderSkipped: false,
                        borderDash: [5, 5],
                    }, {
                        label: 'Dataset 2',
                        data: [todayData2], // Data for Dataset 2
                        backgroundColor: '#D48989',
                        borderColor: '#EFF2F5',
                        borderRadius: { topLeft: borderRadiusValue, topRight: borderRadiusValue },
                        borderSkipped: false,
                        borderDash: [5, 5],
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, // Maintain aspect ratio to prevent height issues
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
                               display: false,
                            },
                            ticks: {
                                padding: 0,
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
            initDelayedOrdersTodayChart();
        }
    }
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    DelayedOrdersTodayChart.init();
});

<script>
import { Doughnut, mixins } from "vue-chartjs";

export default {
    name: "DonutChart",
    extends: Doughnut,
    mixins: [mixins.reactiveProp],
    data() {
        return {
            //Chart.js options that control the appearance of the chart
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true
                }
            }
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
};
</script>
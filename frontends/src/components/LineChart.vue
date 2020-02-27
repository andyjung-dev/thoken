<script>
  //Importing Line class from the vue-chartjs wrapper
  import { Line } from 'vue-chartjs'


    function test(){

        return [400, 20, 30, 50, 90, 10, 20, 40, 50, 70, 50, 100];

    }
    function test2(){

        return  [400, 20, 30, 50, 90, 10, 20, 40, 50, 70, 5, 10].reverse();
    }
  //Exporting this so it can be used in other components
  export default {
    extends: Line,
    create: function () {
        axios.post()
        .then(res => {
            this.coin = res.data;
        })
    },
    data () {
      return {
        datacollection: {
          //Data to be represented on x-axis
          labels: [...Array(12).keys()],//['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: test()
            },
            {
              label: 'Data Two',
              backgroundColor: '#087979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249E0F',
              //Data to be represented on y-axis
              data: test2()
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.datacollection, this.options)
    }
  }
</script>

var bar = document.getElementById('barchart');
var female = bar.dataset.female;
var male = bar.dataset.male;
var barChart = new Chart(bar, {
   type: 'bar',
   data: {
        labels: ['Female', 'Male'],
        datasets: [{
            label: "",
            data: [female, male],
            backgroundColor: ['#0fbcf9', '#ffa801'],
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false,
        }
    }
});

var doughnut = document.getElementById('doughnut');
var messRead = doughnut.dataset.messread;
var messNotRead = doughnut.dataset.messnotread;
var chartDoughnut = new Chart(doughnut, {
   type: 'doughnut',
   data: {
        labels: ['Messages lus', 'Messages non lus'],
        datasets: [{
            data: [messRead, messNotRead],
            backgroundColor: ['#0fbcf9', '#ef5777'],
        }]
    },
});

var pie = document.getElementById('chartpie');
var ordersShipped = pie.dataset.ordersshipped;
var ordersNotShipped = pie.dataset.ordersnotshipped;
var chartPie = new Chart(pie, {
    type: 'pie',
    data: {
         labels: ['Commandes expédiées', 'Commandes non expédiées'],
         datasets: [{
             data: [ordersShipped, ordersNotShipped],
             backgroundColor: ['#ef5777', '#ffa801'],
         }]
     },
 });

var line = document.getElementById('linechart');
var orderData = JSON.parse(line.dataset.order);
var month = [];
var ca = [];
for(var i=0;i<orderData.length; i++) {
    var date = new Date((orderData[i]._id.year), (orderData[i]._id.month -1), 1);
    var monthLetter = date.toLocaleString('default', {month: 'long'});
    month.push(monthLetter);
    ca.push(orderData[i].ca);
}
var lineChart = new Chart(line, {
    type: 'line',
    data: {
         labels: month,
         datasets: [{
             data: ca,
             backgroundColor: ['#0fbcf9'],
         }]
     },
    options: {
        legend: {
            display: false,
        }
    }
 });
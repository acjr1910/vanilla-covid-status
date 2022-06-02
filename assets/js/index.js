// Http
const Html = {
  get: async (url) => {
    const res = await fetch(url);
    return res.json();
  }
}

const getCovidStatusSummary = async () => {
  const covidStatusSummaryUrl = 'https://api.covid19api.com/summary';
  const covidStatus = await Html.get(covidStatusSummaryUrl);
  return covidStatus;
};

// Render
const renderKpis = (data) => {
  // TODO: format numbers 000.000.000
  const renderConfirmed = () => {
    const target = document.getElementById('confirmed');
    target.innerHTML = data.NewConfirmed;
  }

  const renderTotalDeaths = () => {
    const target = document.getElementById('death');
    target.innerHTML = data.TotalDeaths;
  }

  const renderTotalRecoverd = () => {
    const target = document.getElementById('recovered');
    target.innerHTML = data.TotalRecovered;
  }

  const renderDate = () => {
    // TODO: format date
    const target = document.getElementById('date');
    target.innerHTML += ' ' + data.Date;
  }

  renderConfirmed();
  renderTotalDeaths();
  renderTotalRecoverd();
  renderDate();
};

const renderPieChart = (data) => {
  const ctx = document.getElementById('pie-chart');
  const chartConfig = {
    labels: ['Confirmados', 'Recuperados', 'Mortes'],
    datasets: [{
      label: 'Covid Global',
      data: [data.NewConfirmed, data.NewRecovered, data.NewDeaths],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }
  new Chart(ctx, {
    type: 'pie',
    data: chartConfig
  });
};

const renderBarChart = (data) => {
  const sortByProp = (prop) => (arr) => arr.sort((a, b) => b[prop] - a[prop]);
  const takeTen = (arr) => arr.slice(0, 10);
  const TotalDeaths = (c) => c.TotalDeaths;
  const CountryName = (c) => c.Country;

  const top10Countries = _.compose(takeTen, sortByProp('TotalDeaths'))(data);
  const chartData = top10Countries.map(TotalDeaths);
  const chartLabels = top10Countries.map(CountryName);

  const chartConfig = {
    labels: chartLabels,
    datasets: [{
      label: 'Top 10 Covid Global',
      data: chartData,
      backgroundColor: [
        'rgba(153, 102, 255)'
      ],
      hoverOffset: 4
    }]
  }

  const ctx = document.getElementById('bar');
  new Chart(ctx, {
    type: 'bar',
    data: chartConfig,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};

// Main
(async () => {
  const covidStatus = await getCovidStatusSummary();
  console.log(covidStatus)
  renderKpis(covidStatus.Global);
  renderPieChart(covidStatus.Global);
  renderBarChart(covidStatus.Countries);
})();

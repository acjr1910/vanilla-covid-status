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

const renderPieChart = () => { };

// Main
(async () => {
  const covidStatus = await getCovidStatusSummary();
  renderKpis(covidStatus.Global);
  renderPieChart();
  renderBarChart();
})();

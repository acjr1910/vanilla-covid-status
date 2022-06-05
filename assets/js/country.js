// Http
const Html = {
  get: async (url) => {
    const res = await fetch(url);
    return res.json();
  }
}

const getCovidStatusByCountry = async (country = 'brazil', dateFrom, dateTo) => {
  const url = `https://api.covid19api.com/country/${country}?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`;
  const covidStatus = await Html.get(url);
  return covidStatus;
};

const getCountries = async () => {
  const url = 'https://api.covid19api.com/countries';
  const countries = await Html.get(url);
  return countries
};

const setCountryOptions = async () => {
  const countries = await getCountries();
  const intoOptions = (opt) => `<option value="${opt.Country}" ${opt.Country === 'Brazil' && 'selected'}>${opt.Country}</option>`;
  const sortByName = (collection) => _.sortBy(collection, (o) => o.Country);
  const options = sortByName(countries).map(intoOptions).join('');
  const target = document.getElementById('cmbCountry');
  target.innerHTML = options;
  return true;
}

const sumByProp = (prop, arr) => arr.reduce((acc, curr) => acc + curr[prop], 0);

const renderKpis = (data) => {
  const totalDeaths = sumByProp('Deaths', data);
  const totalConfirmed = sumByProp('Confirmed', data);
  const totalRecovered = sumByProp('Recovered', data);

  const totalDeathsTarget = document.getElementById('kpideaths');
  const totalConfirmedTarget = document.getElementById('kpiconfirmed');
  const totalRecoveredTarget = document.getElementById('kpirecovered');

  totalDeathsTarget.innerHTML = totalDeaths;
  totalConfirmedTarget.innerHTML = totalConfirmed;
  totalRecoveredTarget.innerHTML = totalRecovered;
};

const renderLineChart = (data) => {};

const renderCovidData = (data) => {
  renderKpis(data);
  renderLineChart(data);
};

// Main
(async () => {
  await setCountryOptions();
  const covidStatus = await getCovidStatusByCountry();
  renderCovidData(covidStatus);
})();
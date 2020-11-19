const countryElTemp = document.getElementById("countryElTemplate");
const countriesElList = document.querySelector(".countries_panel");

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://restcountries.eu/rest/v2/all?fields=name;flag;region");
xhr.responseType = 'json';
xhr.onload = ()=>{
    const listOfCountries = xhr.response;
    for(const country of listOfCountries){
       const countryEl = document.importNode(countryElTemp.content,true);
       countryEl.querySelector('h2').textContent = country.name;
       countryEl.querySelector('img').src = country.flag;
       countryEl.querySelector('img').alt = `${country.name}'s flag`;
       countryEl.querySelector('div').classList.add('countryEl');
       countriesElList.append(countryEl);
    }
}
xhr.send();





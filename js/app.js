const countryElTemp = document.getElementById("countryElTemplate");
const countriesElList = document.querySelector(".countries_panel");
const countriesArr = [];
const searchBtn = document.querySelector(".search-btn");
const filterBtn = document.querySelector('.filter_btn');
const regionsList = document.querySelector('.filter_regions');
const regions = document.querySelectorAll('.region_name');
const popup = document.getElementById("data-popup");
const popupBg = document.getElementById("popup-bg");


function showData(data){
    console.log(data);
    popup.classList.toggle('popup--inactive');
    const popupTitle = popup.querySelector(".popup__title");
    const popupData = popup.querySelector(".popup__data");
    const popupFlag = popup.querySelector(".popup__flag");
    popupTitle.innerText = `${data.name}`;
    popupFlag.innerHTML = `<img src='${data.flag}' alt=''>`;
    popupData.querySelector('#native-name').innerText = `Native name: ${data.nativeName}`;
    popupData.querySelector('#capital').innerText = `Capital city: ${data.capital}`;
    popupData.querySelector('#timezone').innerText = `Main time zone: ${data.timezones[0]}`;
    popupData.querySelector('#subregion').innerText = `Subregion : ${data.subregion}`;
    popupData.querySelector('#language').innerText = `Main language : ${data.languages[0].name}`;
    popupData.querySelector('#currency').innerText = `Currency : ${data.currencies[0].name} ${data.currencies[0].symbol}`;
    popupData.querySelector('#area').innerText = `Area : ${data.area}`;
    popupData.querySelector('#population').innerText = `Population : ${data.population}`;

}

function fetchData(country){
    //funkcja wyświetlająca na ekranie dane klikniętego kraju wysyłając zapytanie z jego nazwą do API
  
    fetch(`https://restcountries.eu/rest/v2/name/${country.name}`)
        .then(response => response.json())
        .then(response=>{{
            showData(response[0]);
        }})
}

function createEl(country){
    //funkcja tworząca element HTML o danym kraju dodająca go do DOM
    const countryEl = countryElTemp.content.firstElementChild.cloneNode(true);
    countryEl.querySelector('h2').textContent = country.name;
    countryEl.querySelector('img').src = country.flag;
    countryEl.querySelector('img').alt = `${country.name}'s flag`;
    countryEl.classList.add('countryEl');
    countryEl.addEventListener('click', ()=>{
        fetchData(country);
    },true);
    countriesElList.append(countryEl);
}

function search() {
    //funkcja wyszukujca kraj po nazwie
    const searchInputValue = document.getElementById("search").value;
    const filteredCountries = countriesArr.filter((obj)=>{
        return obj.name.toLowerCase().includes(searchInputValue.toLowerCase());
    });
    countriesElList.innerHTML="";
    for (const country of filteredCountries) {
        createEl(country);
    }
}

function filter(regionName){
    //funkcja filtrująca kraje po regionie
    const filteredCountries = countriesArr.filter((obj)=>{
        return obj.region.toLowerCase().includes(regionName.toLowerCase());
    });
    countriesElList.innerHTML="";
    for (const country of filteredCountries) {
        createEl(country);
    }
}

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://restcountries.eu/rest/v2/all?fields=name;flag;region");
xhr.responseType = 'json';
xhr.onload = ()=>{
    const listOfCountries = xhr.response;
    for(const country of listOfCountries){
        countriesArr.push(country)
        createEl(country);
        }
}
xhr.send();

searchBtn.addEventListener('click', ()=>search());
regions.forEach(region => {
    region.addEventListener('click', (e)=>{
        // console.log(e.target.id);
        const filter_region = e.target.id;
        filter(filter_region)
    })
});
filterBtn.addEventListener('click', ()=>{
    regionsList.classList.toggle('inactive');
})

popupBg.addEventListener('click',()=>{
    popup.classList.toggle('popup--inactive');
})


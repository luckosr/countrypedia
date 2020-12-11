const countryElTemp = document.getElementById("countryElTemplate");
const countriesElList = document.querySelector(".countries_panel");
const countriesArr = [];
const searchBtn = document.querySelector(".search-btn");
const filterBtn = document.querySelector('.filter_btn');
const regionsList = document.querySelector('.filter_regions');
const regions = document.querySelectorAll('.region_name');


function showData(data){
    console.log(data);
}

function fetchData(country){
    //funkcja wyświetlająca na ekranie dane klikniętego kraju wysyłając zapytanie z jego nazwą do API
    console.log(country);
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
        console.log("clicked");
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




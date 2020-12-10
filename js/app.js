const countryElTemp = document.getElementById("countryElTemplate");
const countriesElList = document.querySelector(".countries_panel");
const countriesArr = [];
const searchBtn = document.querySelector(".search-btn");
const filterBtn = document.querySelector('.filter_btn');
const regionsList = document.querySelector('.filter_regions');
const regions = document.querySelectorAll('.region_name');


function showData(country){
    //funkcja wyświetlająca na ekranie dane klikniętego kraju wysyłając zapytanie z jego nazwą do API
    console.log(country);
}

function createEl(country){
    const countryEl = document.importNode(countryElTemp.content,true);
    countryEl.querySelector('h2').textContent = country.name;
    countryEl.querySelector('img').src = country.flag;
    countryEl.querySelector('img').alt = `${country.name}'s flag`;
    countryEl.querySelector('div').classList.add('countryEl');
    countriesElList.append(countryEl);
    countryEl.addEventListener('click', ()=>{
        showData(country);
        console.log("clicked");
    },true);
}

function search() {
    const searchInputValue = document.getElementById("search").value;
    const filteredCountries = countriesArr.filter((obj)=>{
        return obj.name.toLowerCase().includes(searchInputValue.toLowerCase());
    });
    countriesElList.innerHTML="";
    for (const country of filteredCountries) {
        createEl(country);
    }
}

function filter(region){
    //funkcja filtrująca wyniki według regionu
    console.log(region);
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




import './css/styles.css';
import { debounce } from "debounce";
import { Notify } from "notiflix"
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')
let totalCountryList = ''

searchBox.addEventListener('input', () => {
    const value = searchBox.value.trim()
    if (value !== '') { 
        debounce(showFoundCountries(value), DEBOUNCE_DELAY)
    }
})

function showFoundCountries(name) {
    fetchCountries(name).then(response => {
        if (response.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name.")
            clearTemplate()
            return
        }
    
        if (response.length == 1) { 
            countryInfoCretor(response[0])
        }

        else {
            countryListCreatr(response)
        }   
    })
}

function clearTemplate() {
    countryInfo.innerHTML = ''
    countryList.innerHTML = ''
    totalCountryList = ''
}

function countryInfoCretor(country) {
    clearTemplate()

    const name = country.name.official
    const capital = country.capital[0]
    const population = country.population
    const flag = country.flags.svg
    const languages = Object.values(country.languages)
    const element = `<ul style="font-size:22px; list-style-type:none; padding: 0px 0px; margin: 0px 0px">
            <li style="font-size:35px;  margin-bottom: 25px"><img 
            style="width: 50px;"
            src="${flag}"
            alt="flag">
            <b>${name}</b></li>
            <li><b>Capital:</b> ${capital}</li>
            <li><b>Population:</b> ${population}</li>
            <li><b>Languages:</b> ${languages}</li>
        </ul>`
    
    countryInfo.insertAdjacentHTML('beforeend', element)
}

function countryListCreatr(countrys) {
    clearTemplate()
 
    const totalCountryList = countrys.map(country => `<li style="display: flex;align-items: center;margin-bottom: 10px;">
        <img 
            style="width: 50px;"
            src="${country.flags.svg}"
            alt="flag">
            ${country.name.official}
        </li>`).join('')

    countryList.style.fontSize = '22px'
    countryList.style.listStyle = 'none'
    countryList.style.padding = '0px 0px'
    countryList.style.margin = '0px 0px'
    countryList.insertAdjacentHTML('beforeend', totalCountryList) 
}
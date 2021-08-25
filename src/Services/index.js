import axios from "axios";


const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) =>{
    console.log(country);
    let fetchUrl = url;
    if(country)
         fetchUrl = `${url}/countries/${country}`;
    try{
        //Structuring of data
        const { data : { confirmed, recovered, deaths, lastUpdate }} = await axios.get(fetchUrl);
        const response ={ 
            confirmed : confirmed,
            recovered : recovered,
            deaths : deaths,
            lastUpdate : lastUpdate,
        };
        return response;
    }
    catch(error){
        console.log(error);
    }
};


export const fetchDatewiseData = async () => {
    try{
        const { data } = await axios.get(`${url}/daily`);
        const dailyData = data.map((data) => ({
            confirmed : data.confirmed.total,
            deaths : data.deaths.total,
            date : data.reportDate
        }));
        return dailyData.slice(1,100);
    }
    catch(error){
        console.log(error);
    }
}  

export const countries = async () => {
    try{
        const { data : { countries }} = await axios.get(`${url}/countries`);
        return countries.map((country) => ({ 
            name: country.name
            ,code : country.iso2
        }));
    }
    catch(error){
        console.log(error);
    }
} 
import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { countries } from '../../Services'

import styles from './CountryPicker.module.css'

const CountryPicker = ({handleCountryChange}) => {
    const[country, setCountry] = useState([]);

    useEffect(() => {
        const getAllCountries = async () => {
           const countryList =  await countries();
           setCountry(countryList);
        }
        getAllCountries();
    },[setCountry])

    //console.log(country);
    return(
        <FormControl className={styles.formcontrol}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {country.map((data,i) => 
                <option key={i} value={data.code} >{data.name}</option>
                )}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
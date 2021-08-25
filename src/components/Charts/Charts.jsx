import React, { useState, useEffect } from 'react';
import { countries, fetchDatewiseData } from '../../Services'
import { Line, Bar } from 'react-chartjs-2';

import styles from './Charts.module.css'


const Charts = ({data : {confirmed, recovered, deaths}, country}) => {
    const[dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const getDailyData = async () => { 
        setDailyData(await fetchDatewiseData());
    }
    getDailyData();
    },[]);

    console.log(confirmed,country);
    const barChart =(
        confirmed !== undefined && country.length ?
        (
            <Bar
                data ={{
                    labels : ['Infected', 'Recovered', 'Deaths'],
                    datasets : [{
                        label : 'Peoople',
                        backgroundColor : ['rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)'],
                        data:[confirmed.value, recovered.value, deaths.value],     //destructring
                    }],
                }}
                options={{
                    legend : { display : false},
                    title : {display :true , text : `Current Situation in ${country}`},
                }}   
            />
        ) : null
    );

    const lineChart = (
        dailyData.length
        ? (
            <Line
                data={{
                    labels : dailyData.map((data) => data.date),
                    datasets: [{
                        data : dailyData.map((data) => data.confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data : dailyData.map((data) => data.deaths),
                        label: 'Death',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true,
                    }],
                }} 
            />
        ): null 
    );

    return(
       <div className= {styles.container}>
            { country === undefined || !country.length ? lineChart : barChart}
       </div>
    )
}

export default Charts;
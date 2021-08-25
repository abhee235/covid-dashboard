import react from 'react';

import Charts from './components/Charts/Charts';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Cards from './components/Cards/Cards';
import styles from './App.module.css'

import { fetchData } from './Services'

class App extends react.Component{
//could also be used wtih constructor
  state = {
      data : {},
      country:{},
  }
  async componentDidMount(){
      const returnedData = await fetchData();
      this.setState({data : returnedData});
  }

  handleCountryChange = async (cn) => {
    console.log(cn);
    const returnedData = await fetchData(cn);
    this.setState({data : returnedData,country : cn});
  }

  render(){
    return(
      <div className={styles.container}>
       <Cards data= {this.state.data}/>
       <CountryPicker handleCountryChange = {this.handleCountryChange} />
       <Charts data={this.state.data} country={this.state.country}/>
      </div>
    )
  }
}
export default App;

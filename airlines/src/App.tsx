import TextFields from '@material-ui/core/TextField';
import * as React from "react";
// import Loader from 'react-loader-spinner'
import ResultComponent from './components/ResultComponent';
import ByAirlineComponent from './components/ByAirlineComponent';
import Button from '@material-ui/core/Button';

import './App.css';

interface ISearchState{
  searchTerm : any,
  error : any,

  found: any,
  imageLink: any;
  airlineName : any,
  airlineCode : any,
  country: any,
  isInternational: any,
  routes: any,
  totalAircraft: any,
  avgFleetAge: any,
  noOldFleet: any,
  accidents: any,
  fatalAccidents: any
}

export default class App extends React.Component<{}, ISearchState> {


  constructor(props: any){
    super(props)
    this.state = {
      error: "0",
      searchTerm: "",
      found: "0",
      imageLink: "",
      airlineName: "",
      airlineCode: "",
      country: "",
      isInternational: "",
      routes: "",
      totalAircraft: "",
      avgFleetAge: "",
      noOldFleet: "",
      accidents: "",
      fatalAccidents: ""
    }
    this.onSearch = this.onSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // public componentDidUpdate()
  // {
  //   this.searchImage(this.state.airlineName + " logo");
  // }

  public render() {
    return (
      <div className="container-fluid">
        <div className="centreText">
          <h2>Is this airline safe?</h2>
          <p>You can check any airline's risk profile by entering their ICAO operator code below</p>
          
          <div className="searchBoxArea">
            <form onSubmit={this.onSearch}>
              <table id="tableForm"> 
                <tr>
                    <td>ICAO Operator Code :  </td>
                    <td ><TextFields autoComplete = "off" type="text" onChange = {this.handleChange} name="airline" placeholder=" i.e. ANZ" fullWidth={true}/></td>
                    <td ><Button type="submit">Search</Button></td>
                </tr>
              </table> 
            </form>
          </div>
          {this.state.error === "1" ? <p> Invalid code, please check your airline code and try again. Some codes on Wikipedia are outdated, please choose a code of a well known airline </p> : <p>ICAO Operator code is a 3-letter code designated for an airline</p>}
        </div>
        <div className="mainResult">
            {this.state.found === "1" ? <ResultComponent 
                airlineName={this.state.airlineName}
                airlineCode={this.state.airlineCode}
                imageLink={this.state.imageLink}
                country={this.state.country}
                isInternational={this.state.isInternational}
                routes = {this.state.routes}
                totalAircraft={this.state.totalAircraft}
                avgFleetAge={this.state.avgFleetAge}
                noOldFleet={this.state.noOldFleet}
                accidents={this.state.accidents}
                fatalAccidents={this.state.fatalAccidents} /> 
                : 
                <ByAirlineComponent/>
                }
          </div>
    </div>
    );
  }

  public componentDidUpdate(prevProps:any, prevState:any)
  {
    if(this.state.airlineCode !== prevState.airlineCode)
    {
      console.log("airline code has changed!");
      this.searchImage(this.state.airlineName + " logo");
    }
  }

  private handleChange(event: any)
  {
    this.setState({searchTerm: event.target.value});
  }

  private searchImage(airlineLogo : any)
  {
    console.log("Azure is being called!, ran out of free tier allowance, pls dont call this too many time");
    const subscriptionKey = '538d3b9e0dab4cf7a96beb357c9c58a2';
    fetch('https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=' + encodeURIComponent(airlineLogo),{
      method: 'GET',
      headers : {
        'Ocp-Apim-Subscription-Key' : subscriptionKey,
      }
    })
    .then((response : any) => {
      if(response.ok){
        // grab the url of the logo from the first result
        response.json().then((data:any) => this.setState({imageLink: data.value[0].contentUrl}))
      }
    })
  }

  private onSearch(event: any){
    event.preventDefault();
    const link = 'https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/airlines/risk/profile-stats?api_key=2ff9bc80-b5a4-11e8-9ace-59e395f3e15c&states=&operators='+this.state.searchTerm+'&type=json';
    fetch(link, {
      method: 'GET'
    })
    .then((response : any) => {
      if(response.ok){
        response.json().then((data:any) => {
          if(data.length !== 0){
            this.setState({
              error: "0",
              found: "1",
              airlineName: data[0].operatorName,
              airlineCode: data[0].operatorCode,
              avgFleetAge: data[0].av_fleet_age, 
              country: data[0].countryName,
              isInternational: data[0].is_international === true ? "YES" : "NO",
              routes: data[0].routes,
              totalAircraft: data[0].aircraft,
              noOldFleet: data[0].aircraft_over_25y,
              accidents: data[0].accidents_5y,
              fatalAccidents: data[0].fatalaccidents_5y 
            })
          }
          else{
              this.setState({
                error: "1",
                found: "0"
              })
          }
        })
      }
    })
  }
}

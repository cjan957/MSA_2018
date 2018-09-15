import TextFields from '@material-ui/core/TextField';
import * as React from "react";
import ResultComponent from './components/ResultComponent';
import './App.css';

interface ISearchState{
  searchTerm : any,

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

  public render() {
    return (
      <div className="container-fluid">
        <div className="centreText">
          {/* React components must have a wrapper node/element */}
          <p>Is this airline safe?</p>
          <form onSubmit={this.onSearch}>
              <TextFields autoComplete = "off" type="text" onChange = {this.handleChange} name="airline" placeholder="airline name"/>
              <input type="submit" value="Search" />
          </form>
        </div>
        <div className="mainResult">
         {this.state.found === "1" ? <ResultComponent 
            airlineName={this.state.airlineName}
            airlineCode={this.state.airlineCode}
            country={this.state.country}
            isInternational={this.state.isInternational}
            routes = {this.state.routes}
            totalAircraft={this.state.totalAircraft}
            avgFleetAge={this.state.avgFleetAge}
            noOldFleet={this.state.noOldFleet}
            accidents={this.state.accidents}
            fatalAccidents={this.state.fatalAccidents} /> 
            : 
            <ResultComponent airlineName={"Please search"}
            />
            
            }
        </div>
    </div>
    );
  }

  private handleChange(event: any)
  {
    this.setState({searchTerm: event.target.value});
  }

  private searchImage(airlineLogo : any)
  {
    const subscriptionKey = '4eff9954bc6145b484f9e3e43e75bf01';
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
        response.json().then((data:any) => this.setState({
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
          }))
        this.searchImage(this.state.airlineName + " logo");
        this.setState({found: "1"});
      }
      else{
        this.setState({airlineName: response.statusText})
      }
      return response;
    })
  }
  
  
  // private searchImage(airline: any){
  //   const subscriptionKey = '4eff9954bc6145b484f9e3e43e75bf01';
  //   fetch('https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=' + encodeURIComponent(airline),{
  //     method: 'GET',
  //     headers : {
  //       'Ocp-Apim-Subscription-Key' : subscriptionKey,
  //     }
  //   })
  //   .then((response : any) => {
  //     if(response.ok){
  //       response.json().then((data:any) => this.setState({imageLink: data.value[0].contentUrl}))
  //     }
  //   })
  // }


}


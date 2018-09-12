import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextFields from '@material-ui/core/TextField';

import Purple from '@material-ui/core/colors/purple';

import AirplaneIcon from '@material-ui/icons/AirplanemodeActiveSharp';
import AccidentIcon from '@material-ui/icons/AssignmentLate';
import RouteIcon from '@material-ui/icons/CompareArrows';
import FlagIcon from '@material-ui/icons/Flag';
import HourGlassIcon from '@material-ui/icons/HourglassEmpty';
import LanguageIcon from '@material-ui/icons/Language';
import TimeLapseIcon from '@material-ui/icons/Timelapse';
import FatalAccidentIcon from '@material-ui/icons/Warning';

import * as React from 'react';
import './App.css';

interface IState{
  airline : any,
  country: any,
  fleetAge: any,
  found : any,
  searchTerm: any
}

const theme = createMuiTheme({
  palette:{
    primary : {main: Purple[500]},
    secondary: {main: '#11cb5f'},
  },
});

export default class App extends React.Component<{}, IState> {

  constructor(props: any){
    super(props)
    this.state = {
      airline: "test",
      country: "test",
      fleetAge: 0,
      found: false,
      searchTerm: "teset",
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  public render() {
    return (
      <div className="container-fluid">
      <div className="centreText">
        {/* React components must have a wrapper node/element */}
        <p>Is this airline safe?</p>
        <form onSubmit={this.onSearch}>
            <TextFields autoComplete = "off" type="text" onChange = {this.handleChange} name="airline" placeholder="airline name" fullWidth={true} />
            <input type="submit" value="Search" />
        </form>
      </div>

      <div className="result">
        <Card className="test">
          <CardHeader 
            title="ABC Airline"
            subheader="ABC"
          />
          <CardMedia  
            title="ABC Air"
          />
          <MuiThemeProvider theme={theme}>
          <CardContent>
            <List>
              <ListItem>
                <Avatar>
                  <FlagIcon/>
                </Avatar>
                <ListItemText  primary="Country" secondary= "Thailand"/>
              </ListItem>
                <Divider/>
              <ListItem>
                <Avatar>
                  <LanguageIcon/>
                </Avatar>
                <ListItemText primary="Is an International airline" secondary="Yes"/>
              </ListItem>
                <Divider/>
              <ListItem>
                <Avatar>
                  <RouteIcon/>
                </Avatar>
                <ListItemText primary="Routes" secondary="432"/>
              </ListItem>
              <Divider/>
              <ListItem>
                <Avatar>
                  <AirplaneIcon/>
                </Avatar>
                <ListItemText primary="Total Aircraft" secondary="102"/>
              </ListItem>
              <Divider/>
              <ListItem>
                <Avatar>
                  <HourGlassIcon/>
                </Avatar>
                <ListItemText primary="Average Fleet Age" secondary="8.4"/>
              </ListItem>
              <Divider/>
              <ListItem>
                <Avatar>
                  <TimeLapseIcon/>
                </Avatar>
                <ListItemText primary="Number of Aircraft over 25 years old" secondary="1"/>
              </ListItem>
              <Divider/>
              <ListItem>
                <Avatar>
                  <AccidentIcon/>
                </Avatar>
                <ListItemText primary="Accidents in the last 5 years" secondary="2"/>
              </ListItem>
              <Divider/>
              <ListItem>
                <Avatar>
                  <FatalAccidentIcon/>
                </Avatar>
                <ListItemText primary="Fatal Accidents in the last 5 years" secondary="0"/>
              </ListItem>
            </List>
            </CardContent>
          </MuiThemeProvider> 
        </Card>
        <p>{this.state.airline}</p>
        <p>{this.state.country}</p>
        <p>{this.state.fleetAge}</p>
      
      </div>

    </div>
    );
  }

  private handleChange(event: any)
  {
    this.setState({searchTerm: event.target.value});
  }

  private onSearch(event: any){
    event.preventDefault();
    const link = 'https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/airlines/risk/profile-stats?api_key=2ff9bc80-b5a4-11e8-9ace-59e395f3e15c&states=&operators='+this.state.searchTerm+'&type=json';
    fetch(link, {
      method: 'GET'
    })
    .then((response : any) => {
      if(response.ok){
        response.json().then((data:any) => this.setState({airline: data[0].operatorName, fleetAge: data[0].av_fleet_age, country: data[0].countryName}))
      }
      else{
        this.setState({airline: response.statusText})
      }
      return response;
    })
  }
}
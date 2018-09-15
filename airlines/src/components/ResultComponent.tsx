import * as React from "react";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AirplaneIcon from '@material-ui/icons/AirplanemodeActiveSharp';
import AccidentIcon from '@material-ui/icons/AssignmentLate';
import RouteIcon from '@material-ui/icons/CompareArrows';
import FlagIcon from '@material-ui/icons/Flag';
import HourGlassIcon from '@material-ui/icons/HourglassEmpty';
import LanguageIcon from '@material-ui/icons/Language';
import TimeLapseIcon from '@material-ui/icons/Timelapse';
import FatalAccidentIcon from '@material-ui/icons/Warning';
import '../css/styles.css';



export default class ResultComponent extends React.Component<any> {
    public render() {
        return (
            <div className="result">
                <Card className="AirlineInfo">
                    <CardHeader title={this.props.airlineName} subheader={this.props.airlineCode}/>
                    <CardMedia 
                        style={{height: 0, paddingTop: '10%'}}
                        component= "img"
                        src={this.props.imageLink}
                        title="Airline Logo"
                    />
                    <CardContent>
                        <List>
                            <ListItem>
                            <Avatar>
                                <FlagIcon/>
                            </Avatar>
                            <ListItemText primary="Country" secondary= {this.props.country}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <LanguageIcon/>
                            </Avatar>
                            <ListItemText primary="Is an International airline" secondary={this.props.isInternational}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <RouteIcon/>
                            </Avatar>
                            <ListItemText primary="Routes" secondary={this.props.routes}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <AirplaneIcon/>
                            </Avatar>
                            <ListItemText primary="Total Aircraft" secondary={this.props.totalAircraft}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <HourGlassIcon/>
                            </Avatar>
                            <ListItemText primary="Average Fleet Age" secondary={this.props.avgFleetAge}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <TimeLapseIcon/>
                            </Avatar>
                            <ListItemText primary="Number of Aircraft over 25 years old" secondary={this.props.noOldFleet}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <AccidentIcon/>
                            </Avatar>
                            <ListItemText primary="Accidents in the last 5 years" secondary={this.props.accidents}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <FatalAccidentIcon/>
                            </Avatar>
                            <ListItemText primary="Fatal Accidents in the last 5 years" secondary={this.props.fatalAccidents}/>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
                <p className="disclaimer">Disclaimer: The information provided here is as accurate as what's available from International Civil Aviation Organization (ICAO)'s data service </p>
            </div>
        );
    }
}


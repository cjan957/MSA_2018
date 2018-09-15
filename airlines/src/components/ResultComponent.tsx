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
import withStyles from '@material-ui/core/styles/withStyles';

import AirplaneIcon from '@material-ui/icons/AirplanemodeActiveSharp';
import AccidentIcon from '@material-ui/icons/AssignmentLate';
import RouteIcon from '@material-ui/icons/CompareArrows';
import FlagIcon from '@material-ui/icons/Flag';
import HourGlassIcon from '@material-ui/icons/HourglassEmpty';
import LanguageIcon from '@material-ui/icons/Language';
import TimeLapseIcon from '@material-ui/icons/Timelapse';
import FatalAccidentIcon from '@material-ui/icons/Warning';

import '../css/styles.css';

const CardHeaderStyle = withStyles({
    title: {
        fontSize: "30px"
    },
    subheader:{
        fontSize: "18px"
    }
})(CardHeader);

const ListItemHeadings = withStyles({
    primary:{
        fontSize: "18px"
    },
    secondary:{
        fontSize: "14px",
        color: 'gray'
    }
})(ListItemText)

const ListItemRedText = withStyles({
    primary:{
        color: 'red',
        fontSize: "17px"
    },
    secondary: {
        fontSize: "15px"
    }
})(ListItemText);

export default class ResultComponent extends React.Component<any> {
    public render() {
        return (
            <div className="result">
                <Card className="AirlineInfo">
                    <CardHeaderStyle title={this.props.airlineName} subheader={this.props.airlineCode}/>
                    <CardMedia title="Airline Logo"/>
                    <img src={this.props.imageLink}/>
                    <CardContent>
                        <List>
                            <ListItem>
                            <Avatar>
                                <FlagIcon/>
                            </Avatar>
                            <ListItemHeadings primary="Country" secondary={this.props.country}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <LanguageIcon/>
                            </Avatar>
                            <ListItemHeadings primary="Is an International airline" secondary={this.props.isInternational}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <RouteIcon/>
                            </Avatar>
                            <ListItemHeadings primary="Routes" secondary={this.props.routes}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <AirplaneIcon/>
                            </Avatar>
                            <ListItemHeadings primary="Total Aircraft" secondary={this.props.totalAircraft}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <HourGlassIcon/>
                            </Avatar>
                            <ListItemHeadings primary="Average Fleet Age" secondary={this.props.avgFleetAge}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <TimeLapseIcon/>
                            </Avatar>
                            <ListItemHeadings primary="Number of Aircraft over 25 years old" secondary={this.props.noOldFleet}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <AccidentIcon/>
                            </Avatar>
                            <ListItemRedText primary="Accidents in the last 5 years" secondary={this.props.accidents}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                            <Avatar>
                                <FatalAccidentIcon/>
                            </Avatar>
                            <ListItemRedText primary="Fatal Accidents in the last 5 years" secondary={this.props.fatalAccidents}/>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
                <p className="disclaimer">Disclaimer: The information provided here is as accurate as what's available from the <a href ="https://www.icao.int/safety/iStars/Pages/API-Data-Service.aspx">International Civil Aviation Organization (ICAO)'s data service </a></p>
            </div>
        );
    }
}


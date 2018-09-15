import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';


export const Header: React.StatelessComponent<{}> = () => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Airlines</Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <IndexLinkContainer to="/ByAirlineComponent">
                    <NavItem>Airline</NavItem>
                </IndexLinkContainer>
                <IndexLinkContainer to="/ByCountryComponent">
                    <NavItem>Country</NavItem>
                </IndexLinkContainer>
            </Nav>
        </Navbar>
    );
}
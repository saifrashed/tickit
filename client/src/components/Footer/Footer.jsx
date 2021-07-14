/*eslint-disable*/
import React from "react";
import {Container} from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
    render() {
        return (
            <footer
                className={"footer" + (this.props.default ? " footer-default" : "")}
            >
                <Container fluid={this.props.fluid ? true : false}>
                    <nav>
                        <ul>
                            <li>
                                <a href="https://www.vorm.tech" target="_blank">Vorm Technologies</a>
                            </li>
                            <li>
                                <a href="https://www.vorm.tech/over-vorm" target="_blank">Over ons</a>
                            </li>
                            <li>
                                <a href="https://www.vorm.tech/applicaties/tickit" target="_blank">Applicatie pagina</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="copyright">
                        &copy; {1900 + new Date().getYear()}, {" "}
                        <a
                            href="https://www.vorm.tech"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Vorm Technologies
                        </a>
                                                            .
                    </div>
                </Container>
            </footer>
        );
    }
}

Footer.propTypes = {
    default: PropTypes.bool,
    fluid:   PropTypes.bool
};

export default Footer;

import React, { Component } from 'react'
import {connect} from 'react-redux';

class Header extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        // if(this.props.patientLst)
        //     this.setState({patient:findPatient(this.props.patientLst, 1)});
    }
    componentWillReceiveProps(nextProps){
        //this.setState({patient:findPatient(nextProps.patientLst, 1)});
    }
    render() {
        var title = "Diabetic Management System";
        if(this.props.patient.name){
            title = "Diabetic Management System - (" + this.props.patient.name+")";
        }
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">{title}</span>
                </div>
                <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
                <a href="#fixed-tab-1" className="mdl-layout__tab is-active">Daily Reading</a>
                <a href="#fixed-tab-2" className="mdl-layout__tab">Tab 2</a>
                <a href="#fixed-tab-3" className="mdl-layout__tab">Tab 3</a>
                </div>
            </header>
        )
    }
}


const mapStateToProps = state =>({
    patient:state.patients.selectedPatient,
});

export default connect(mapStateToProps,null)(Header);


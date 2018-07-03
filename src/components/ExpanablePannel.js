import ExpansionPanel from 'material-expansion-panel';
import '../../node_modules/material-expansion-panel/dist/material-expansion-panel.min.css';
import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


class ExpanablePannel extends Component {
    constructor(props){
        super(props);
        this.state = {
            parameters:{}
        };
    }
    componentDidUpdate(){
		window.componentHandler.upgradeDom();
    }
    componentWillReceiveProps(nextProps){

        if(nextProps.parameters){
            this.setState({parameters: nextProps.parameters})
        }
    }

    render() {
        var aIcons = [{
            icon: "delete",
            callback: null,
            additionalParams: null
        }];
        var aButtons = [{
            buttonText: "Save",
            callback: null,
            additionalParams: null
        },
        {
            buttonText: "Cancel",
            callback: null,
            additionalParams: null,
            toggleExpand: true
        }];
        const divStyle = {
            padding: "20px"
          };
        const fieldStyle = {
            width: "100px",
            margin: "10px"
          };

        const params = this.state.parameters.parameter ? this.state.parameters.parameter.map(p=>(
            <div key={this.state.parameters.id+'_'+p.title} style={fieldStyle} className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id={p.title} defaultValue={p.value}/>
                <label className="mdl-textfield__label" htmlFor={p.title}>{p.title}</label>
                <span className="mdl-textfield__error">Input is not a number!</span>
            </div>
        )) : <div>No patient selected</div>;

        return (
            <div style={divStyle}>
            <ExpansionPanel titleIcon="date_range" title="Modify Behaviours" expandedTitle="Behaviours" />
            <ExpansionPanel titleIcon="settings" title="Modify Hyper-parameters" expandedTitle="Hyper-parameters" actionButtons={aButtons} actionIcons={aIcons}>
                {params}
            </ExpansionPanel>
            <ExpansionPanel titleIcon="info" title="Modify User Information" expandedTitle="User Information" />
            </div>
        
          )
    }
}

ExpanablePannel.propTypes = {
  parameters: PropTypes.object
}

const mapStateToProps = state =>({
  parameters:state.patients.selectedPatientParameters
});

export default connect(mapStateToProps,null)(ExpanablePannel);


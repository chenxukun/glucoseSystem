import React, { Component } from 'react'
import {connect} from 'react-redux';
import {retrievePatients, retrievePatientReadings,retrievePatientParameters,
        retrievePatientInsulins, retrievePatientMeals} from '../actions/postAction';
import PropTypes from 'prop-types';

class Patients extends Component {
    constructor(props){
        super(props);

        this.state = {
            renderPatLst: this.props.patientLst,
            patientLst : this.props.patientLst
        }

        this.onSelect = this.onSelect.bind(this);
        this.filterList = this.filterList.bind(this);
        this.onSortByName = this.onSortByName.bind(this);
        this.onSortByPriority = this.onSortByPriority.bind(this);
    }
    componentWillMount(){
        this.props.retrievePatients();
    }

    componentWillReceiveProps(newProps){
        this.setState({renderPatLst: newProps.patientLst,patientLst: newProps.patientLst});
    }

    filterList(e){
        var updatedList = this.state.patientLst;
        updatedList = updatedList.filter(function(item){
            try {
                var regex = new RegExp(e.target.value);
            } catch(e) {
                // console.log(e)
                return;
            }
          return item.name.toLowerCase().search(
            e.target.value.trim().toLowerCase()) !== -1;
        });
        this.setState({renderPatLst:updatedList});
      }

    onSortByName(e){
        console.log("call sort name")
        var renderList = [].concat(this.state.renderPatLst)
            .sort((a,b)=>a.name>b.name);
        var updatedList = [].concat(this.state.patientLst)
            .sort((a,b)=>a.name>b.name);
        this.setState({renderPatLst:renderList,patientLst:updatedList});
    }

    onSortByPriority(e){
        var renderList = [].concat(this.state.renderPatLst)
            .sort((a,b)=>a.priority>b.priority);
        var updatedList = [].concat(this.state.patientLst)
            .sort((a,b)=>a.priority>b.priority);
        this.setState({renderPatLst:renderList,patientLst:updatedList});
    }

    onSelect(e){
        console.log(e.target)
        e.preventDefault();
        const pat = {
            id: e.target.id
        }
        this.props.retrievePatientReadings(pat)
        this.props.retrievePatientParameters(pat)
        this.props.retrievePatientInsulins(pat)
        this.props.retrievePatientMeals(pat)
      }

    render() {
        const fieldStyle = {
            padding: "0px",
            marginRight:"12px"
        };
        const searchIconStyle = {
            top: "0px"
        };
        const menuStyle={
            position: "absolute",
            top:"15px",
            right:"12px",
            alignSelf: "flex-end"
        };
        const listItemStyle={
            paddingLeft: "25px",
            paddingBottom: "12px",
            paddingTop: "12px",
            cursor:"pointer"
        }
        const topPriorityStyle={
            color:"#e57373"
        }
        const secondPriorityStyle={
            color:"#FFD54F"
        }
        const normalPriorityStyle={
            color:"#81C784"
        }

        const pats = this.state.renderPatLst.map(pat=>(
            // <a className="mdl-navigation__link" href="#" onClick={this.onSelect} key={pat.id} id={pat.id}>
            //     {pat.name}  {pat.gender}
            // </a>
            <div className="mdl-list__item" key={pat.id} style={listItemStyle} id={pat.id} onClick={this.onSelect}>
                <span className="mdl-list__item-primary-content"  id={pat.id}>
                    {/* <i class="material-icons mdl-list__item-avatar">person</i> */}
                    <span id={pat.id}>{pat.name}  {pat.gender}</span>
                </span>
                <span className="mdl-list__item-secondary-content" id={pat.id}>
                    <i className="material-icons" id={pat.id} style={pat.priority == 1 ?topPriorityStyle:pat.priority==2?secondPriorityStyle:normalPriorityStyle}>star</i>
                </span>
            </div>
        ));


        return (
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Patients</span>
                <button id="demo-menu-lower-right" style={menuStyle}
                        className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect">
                    <i className="material-icons">more_vert</i>
                </button>

                <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                    htmlFor="demo-menu-lower-right">
                    <li className="mdl-menu__item mdl-menu__item--full-bleed-divider" onClick={this.onSortByName}>Sort by Name</li>
                    <li className="mdl-menu__item" onClick={this.onSortByPriority}>Sort by Priority</li>
                </ul>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                            mdl-textfield--floating-label mdl-textfield--align-right"style={fieldStyle}>
                    <label className="mdl-button mdl-js-button mdl-button--icon" style={searchIconStyle}
                        htmlFor="waterfall-exp">
                    <i className="material-icons">search</i>
                    </label>
                    <div className="mdl-textfield__expandable-holder">
                    <input className="mdl-textfield__input" type="text" name="sample" onChange={this.filterList}
                            id="waterfall-exp"/>
                    </div>
                </div>
                <nav className="mdl-navigation mdl-list">
                    {pats}
                </nav>
                
            </div>
        )
    }
}

Patients.propTypes = {
    retrievePatients: PropTypes.func.isRequired,
    retrievePatientReadings: PropTypes.func.isRequired,
    retrievePatientMeals: PropTypes.func.isRequired,
    retrievePatientInsulins: PropTypes.func.isRequired,
    patientLst: PropTypes.array.isRequired,
}

const mapStateToProps = state =>({
    patientLst:state.patients.patientLst, 
    renderPatLst: state.patients.patientLst  
});

export default connect(mapStateToProps,{retrievePatients:retrievePatients, retrievePatientReadings,
    retrievePatientMeals,retrievePatientInsulins, retrievePatientParameters})(Patients);


import {connect} from 'react-redux';
import React, { Component } from 'react'
import {retrievePatientReadings} from '../actions/postAction';
import PropTypes from 'prop-types';
import '../../node_modules/react-vis/dist/style.css';

import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  FlexibleWidthXYPlot,
  LineSeries,
  DiscreteColorLegend,
} from 'react-vis';
import Highlight from './Helpers/Highlight';

const MSEC_DAILY = 86400000;

function parseReadings(reading){
  return reading.map(r=>{return {'x':new Date(r.time).getTime(),'y':r.value}});
}


class Chart extends Component {
  constructor(props){
    super(props);
    this.state = {
      lastDrawLocation: null,
      series: [
        {
          title: '1',
          disabled: false,
          data: []
        }
      ]
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.readings.reading){
        this.setState(
          {
            ...this.state, 
            series:[
              {
                title:'reading',
                disabled: false,
                data: parseReadings(nextProps.readings.reading),
              }
            ]
        })
    }else{
      this.setState(
        {
          ...this.state, 
          series:[
            {
              title: 'reading',
              disabled: false,
              data: [
                {x: new Date('2018/05/10 06:00').getTime() + MSEC_DAILY/2, y: 3},
                {x: new Date('2018/05/10 06:00').getTime() + MSEC_DAILY, y: 5},
                {x: new Date('2018/05/10 06:00').getTime() + MSEC_DAILY * 1.5, y: 15},
                {x: new Date('2018/05/10 06:00').getTime() + MSEC_DAILY * 2, y: 12}
              ]
            }
          ]
      })
    }
  }
    

  render() {
    const {series, lastDrawLocation} = this.state;
    const divStyle = {
      padding: "25px"
    };
    return (
      <div style={divStyle}>
        <div className="chart no-select">
          <FlexibleWidthXYPlot
            animation
            xType="time"
            xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
            height={300}>

            <HorizontalGridLines />
            <YAxis />
            <XAxis />

            {series.map(entry => (
              <LineSeries 
                key={entry.title}
                data={entry.data}
              />
              
            ))}
            
            <Highlight onBrushEnd={(area) => {
              this.setState({
                lastDrawLocation: area
              });
            }} />
          </FlexibleWidthXYPlot>
        </div>

        <button className="showcase-button" onClick={() => {
          this.setState({lastDrawLocation: null});
        }}>
          Reset Zoom
        </button>
      </div>
    );
  }
}

Chart.propTypes = {
  retrievePatientReadings: PropTypes.func.isRequired,
  readings: PropTypes.object,
  patientLst: PropTypes.array,
}

const mapStateToProps = state =>({
  readings:state.patients.selectedPatientReadings,
  patientLst:state.patients.patientLst,
});

export default connect(mapStateToProps,{retrievePatientReadings})(Chart);
import {connect} from 'react-redux';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';


const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';
const timeFormat = 'HH:mm';

function parseReadingXs(reading){
    return reading.map(r=>{return window.moment(r.time).format(datetimeFormat)});
}

function parseReadingYs(reading){
    return reading.map(r=>{return r.value});
}

function parseAnnotation(meals, insulins){
    const mealAn = meals.map(r=>{return {x: window.moment(r.time).format(datetimeFormat), y:0, xref:'x', yref:'y', ayref:'y',hovertext:r.value+' Meal at '+window.moment(r.time).format(timeFormat),
        text:r.value+' Meal at <br>'+window.moment(r.time).format(timeFormat), showarrow:true,arrowhead:1,arrowcolor:"#9575CD",ax:0,ay:window.Math.min(window.Math.max(10,r.value),50),font:{size: 12,color: "#9575CD"}}});

    const insulinAn = insulins.map(r=>{return {x: window.moment(r.time).format(datetimeFormat), y:0, xref:'x', yref:'y', ayref:'y',hovertext:r.value+' Insulin at '+window.moment(r.time).format(timeFormat),
        text:r.value+' insulin at <br>'+window.moment(r.time).format(timeFormat), showarrow:true,arrowhead:1,arrowcolor:"#64B5F6",ax:0,ay:window.Math.min(window.Math.max(10,r.value),50),font:{size: 12,color: "#64B5F6"}}});
    return mealAn.concat(insulinAn);
}


class GlucosePlot extends Component {
  constructor(props){
    super(props);
    this.state = {
      xs: [],
      ys:[],
      annotations:[]
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.readings.reading && nextProps.meals.reading && nextProps.insulins.reading){
        this.setState(
          {
            ...this.state, 
            title:'reading',
            disabled: false,
            xs: parseReadingXs(nextProps.readings.reading),
            ys: parseReadingYs(nextProps.readings.reading),
            annotations: parseAnnotation(nextProps.meals.reading, nextProps.insulins.reading)
        })
    }
  }

  render() {
    const divStyle = {
      padding: "0px"
    };
    const data = [
        {
            x:this.state.xs,
            y:this.state.ys.map(v=>{return v-10}),
            mode: 'lines',
            showlegend: false,
            line:{
              color:'orange'
            },
            hoverinfo:'y'
        },{
            x:this.state.xs,
            y:this.state.ys.map(v=>{return v+10}),
            mode: 'lines',
            fill: 'tonexty',
            showlegend: false,
            line:{
              color:'orange'
            },
            hoverinfo:'y'
        },{
            x:this.state.xs,
            y:this.state.ys,
            mode:'lines+markers',
            name:'glucose reading',
            hoverinfo:'x+y'
        }
    ]
    return (
      <div style={divStyle}>
        <Plot
            data={data}
            style={{"height" : "95%", "width" : "100%"}}
            useResizeHandler={true}
            layout={{autosize:true, annotations: this.state.annotations, hovermode:'closest'}}
        />
      </div>
    );
  }
}

GlucosePlot.propTypes = {
    readings: PropTypes.object,
    meals:PropTypes.object,
    insulins:PropTypes.object
}

const mapStateToProps = state =>({
  readings:state.patients.selectedPatientReadings,
  meals:state.patients.selectedPatientMeals,
  insulins:state.patients.selectedPatientInsulins
});

export default connect(mapStateToProps,null)(GlucosePlot);
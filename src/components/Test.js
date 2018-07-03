
import React from 'react';
import Plot from 'react-plotly.js';

export default class Example extends React.Component {
  render() {
    var trace1 = {
      x: ['2013-10-04 22:20:00', '2013-10-04 22:25:00', '2013-10-04 22:35:00','2013-10-04 22:40:00', '2013-10-04 22:45:00', '2013-10-04 22:50:00', '2013-10-04 22:55:00'],
      y: [10, 15, 17, 14,20,16,19],
      mode: 'markers',
      name: 'insulin',
      marker:{
        size:'20',
        color: 'grey'
      },
      text:["test "+10, "test "+15, "test "+17, "test "+14,"test "+20,"test "+16,"test "+19],
      hoverinfo:'text'
    };
    var over = {
      x: ['2013-10-04 22:20:00', '2013-10-04 22:25:00', '2013-10-04 22:30:00', '2013-10-04 22:35:00','2013-10-04 22:40:00', '2013-10-04 22:45:00', '2013-10-04 22:50:00', '2013-10-04 22:55:00'],
      y: [10, 15, 13, 17, 14,20,16,19],
      mode: 'markers',
      name: 'food',
      marker:{
        size:'10',
        color: 'red'
      }
    };

    var line = {
      x: ['2013-10-04 22:20:00', '2013-10-04 22:25:00', '2013-10-04 22:30:00', '2013-10-04 22:35:00','2013-10-04 22:40:00', '2013-10-04 22:45:00', '2013-10-04 22:50:00', '2013-10-04 22:55:00'],
      y: [10, 15, 13, 17, 14,20,16,19],
      mode: 'lines+markers',
      name: 'glucose reading',
      text:["test "+10, "test "+15, "test "+17, "test "+14,"test "+20,"test "+16,"test "+19],
      hoverinfo:'text'
    };

    var shade1 = {
      x: ['2013-10-04 22:20:00', '2013-10-04 22:25:00', '2013-10-04 22:30:00', '2013-10-04 22:35:00','2013-10-04 22:40:00', '2013-10-04 22:45:00', '2013-10-04 22:50:00', '2013-10-04 22:55:00'],
      y: [12, 17, 15, 19, 16,22,18,21],
      mode: 'lines',
      name: 'test data line',
      showlegend: false,
      line:{
        color:'orange'
      }
    };
    var shade2 = {
      x: ['2013-10-04 22:20:00', '2013-10-04 22:25:00', '2013-10-04 22:30:00', '2013-10-04 22:35:00','2013-10-04 22:40:00', '2013-10-04 22:45:00', '2013-10-04 22:50:00', '2013-10-04 22:55:00'],
      y: [8, 13, 11, 14, 12,18,14,17],
      mode: 'lines',
      name: 'test data line',
      fill: 'tonexty',
      showlegend: false,
      line:{
        color:'orange'
      }

    };
    var annotations= [
      {
        x: '2013-10-04 22:26:00',
        y: 0,
        xref: 'x',
        yref: 'y',
        text: 'Meal',
        showarrow: true,
        arrowhead: 7,
        ax: 0,
        ay: -20,
        font: {
          size: 16,
          color: "#aaaaaa"
        },
      },
      {
        x: '2013-10-04 22:31:00',
        y: 0,
        xref: 'x',
        yref: 'y',
        text: 'Insulin',
        showarrow: true,
        arrowhead: 7,
        ax: 0,
        ay: -60,
      },
      {
        x: '2013-10-04 22:33:00',
        y: 0,
        xref: 'x',
        yref: 'y',
        text: 'Meal',
        showarrow: true,
        arrowhead: 7,
        ax: 0,
        ay: -20,
      }
    ];
    var data = [ shade1,shade2,line ];
    return (
      <Plot
        data={data}
        layout={{annotations: annotations, hovermode:'closest', width: 800, height: 400, title: 'A Fancy Plot'}}
      />
    );
  }
}
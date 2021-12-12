function freqGauge(wfreq) {
    var level = wfreq;
    var data = [
      {
        type: "indicator",
        mode: "gauge+number+delta",
        value: level,
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs Per Week", font: { size: 24 } },
        delta: { reference: 7, increasing: { color: "RebeccaPurple" } },
        gauge: {
          axis: { 
            range: [null, 9], 
           
            
           },
          bar: { color: "orange" },
          bgcolor: "blue",
          borderwidth: 2,
          bordercolor: "red",
          steps: [
            { range: [0, .99], color: "cyan" },
            { range: [.99, 1], color: "white" },
            { range: [1, 1.99], color: "cyan" },
            { range: [1.99, 2], color: "white" },
            { range: [2, 2.99], color: "cyan" },
            { range: [2.99, 3], color: "white" },
            { range: [3, 3.99], color: "cyan" },
            { range: [3.99, 4], color: "gray" },
            { range: [4, 4.99], color: "royalblue" },
            { range: [4.99, 5], color: "gray" },
            { range: [5, 5.99], color: "royalblue" },
            { range: [5.99, 6], color: "gray" },
            { range: [6, 6.99], color: "royalblue" },
            { range: [6.99, 7], color: "gray" },
            { range: [7, 7.99], color: "red" },
            { range: [7.99, 8], color: "gray" },
            { range: [8, 8.99], color: "red" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 7
          }
        }
      }
    ];
    
    var layout = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      font: { color: "darkblue", family: "Arial" }
    };
    
    Plotly.newPlot('gauge', data, layout);
    
    
};

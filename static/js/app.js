function init() {
    var dropdown = d3.select("#selDataset");
    //Read samples.json
    d3.json("samples.json").then((samplesData) => {
        samplesData.names.forEach((sample) => {
            dropdown.append("option").text(sample).property("value", sample);
        });
        var sampleID = dropdown.property("value");
        console.log(sampleID);
        console.log(samplesData);
        createBarChart(sampleID);
        createBubbleChart(sampleID);
        displayMetadata(sampleID);
    });    
}

function optionChanged(sampleID) {
    // get data based on the sampleID
    console.log(sampleID);
    createBarChart(sampleID);
    createBubbleChart(sampleID);
    displayMetadata(sampleID);
}

function createBarChart(selectedID) {
    console.log(selectedID.toString());

    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var selectedData = samples.filter(object => object.id == selectedID)[0];
        // initialize webpage with data from first sampleID
        console.log(selectedData);

        // get sample_values first 10
        var revValues = selectedData.sample_values.slice(0,10).reverse();
        var otuIDs = selectedData.otu_ids.slice(0,10).reverse();
        var strRevIDs = otuIDs.map(row => "OTU " + row.toString());
        var revLabels = selectedData.otu_labels.slice(0,10).reverse();

        // horizontal bar chart
        var data0 = [{
            x: revValues,
            y: strRevIDs,
            text: revLabels,
            name: selectedID,
            type: "bar",
            orientation: "h"
        }];

        var layout0 = {
            title: "Top 10 Bacteria Cultures Found",
            barmode: "group",
            hovermode: "closest"
        };

        Plotly.newPlot("bar", data0, layout0);

    });
};

function createBubbleChart(selectedID) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var selectedData = samples.filter(object => object.id == selectedID)[0];

        var otuIDstr = selectedData.otu_ids.map(String);
        console.log(otuIDstr);

        var data1 = [{
            x: selectedData.otu_ids,
            y: selectedData.sample_values,
            text: selectedData.otu_labels,
            mode: "markers",
            marker: {
                color: otuIDstr,
                size: selectedData.sample_values,
                colorscale: 'Portland',
                type: 'heatmap'

            }
        }];
    
        var layout1 = {
            title: "Bacteria Cultures Per Sample",
            xaxis: { title: "OTU ID"},
            hovermode: "closest",  // by default value
            showlegend: false
        };
    
        Plotly.newPlot("bubble", data1, layout1);

    });
};

function displayMetadata(selectedID) {
    d3.json("samples.json").then((data) => {
        
        // display metadata
        // get reference to panel body
        var dataPanel = d3.select("#sample-metadata");
        // clear panel data
        dataPanel.html("");

        var metadata = data.metadata.filter(object => object.id == selectedID)[0];

        console.log(metadata);

        Object.entries(metadata).forEach(([key, value]) => {
            
            var panelBody = dataPanel.append("h6").text(`${key}: ${value}`);
        });
        freqGauge(metadata.wfreq);
        

    });
};

init();
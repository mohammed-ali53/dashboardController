import { useEffect, useRef, useState } from 'react';

import {
	IgrLegendModule,
	IgrDataChartCoreModule,
	IgrDataChartScatterModule,
	IgrDataChartScatterCoreModule,
	IgrDataChartInteractivityModule,
	IgrCategoryChart,
} from 'igniteui-react-charts';
import axios from 'axios';
import {
	IgrLegend,
	IgrDataChart,
	IgrNumericXAxis,
	IgrNumericYAxis,
	IgrScatterSeries,
	IgrCategoryChartModule,
} from 'igniteui-react-charts';
import { forEach } from 'lodash';

const mods = [IgrLegendModule, IgrCategoryChartModule];
mods.forEach((m) => m.register());

export default function Graph() {
	const [data, setData] = useState([]);
	let legend;
	const legendRef = useRef();
	const chartRef = useRef();
	const fetchData = () => {
        var apidata = {
            granularity : 'millisecond',
            attributes : ["rsrq","sinr"],
			// median : [0.25 , 0.75],
            filters:[
                {
                    key:"timestamp",
                    Op:"lt",
                    value:'2022-02-23 05:40:51.932'
                },
                {
                    key:"timestamp",
                    Op:"gt",
                    value:'2022-02-22 06:26:51.932'
                }
            ],
            limit : 100,
        }

        axios
            .post('/apm-plugin/dashboard/aggregate',apidata)
            .then(res => {
                console.log(res.data.Data)
				res.data.Data.forEach((e) => {
					delete e.setSize;
					delete e.avg_sinr;
					delete e.timezone;
					e.timestamp = new Date(e.timestamp).toLocaleString();
					console.log(new Date(e.timestamp).toLocaleString())
					
				})

                setData(res.data.Data.reverse())
    	        console.log("inside fetchdata useEffect",data)
            })
            .catch(err => {
                console.log(err)
            })
                    
    }

	return (
		<div className='container sample'>
			<button onClick={()=>{fetchData()}}>Fetch</button>
			<div className='legend-title'>Renewable Electricity Generated</div>
			<div className='legend'>
				<IgrLegend orientation='Horizontal' ref={legendRef}></IgrLegend>
			</div>
			<div className='container fill'>
				<IgrCategoryChart
					chartType='Line'
					yAxisLabelLeftMargin='0'
					yAxisTitleLeftMargin='10'
					yAxisTitleRightMargin='5'
					yAxisTitle='RSRQ'
					xAxisTitle='time'
					xAxisTitleMargin='10'
					dataSource={data}
					thickness="1"
					outlines="#d18194"
					brushes="#d18194"
					markerBrushes="#d18194"
					markerOutlines="white"
					legend={legendRef.current}
					isHorizontalZoomEnabled='true'
					isVerticalZoomEnabled='false'
					ref={chartRef}
					markerThickness="1"
					// trendLineBrushes="#d18194"
				></IgrCategoryChart>
			</div>
		</div>
	);
}
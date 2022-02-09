import React, { useState } from 'react';
import Chart from "react-apexcharts";
import './graphs.css';
import { Card,Row,Col, Button } from 'antd';
import 'antd/dist/antd.css';
import DeviceInfo from '../../Components/DeviceInfoHeader/DeviceInfo';
import BarChart from '../../Components/Charts/BarChart';
import LineChart from '../../Components/Charts/LineChart';
// import Plot from 'react-plotly.js';
const Graphs = (props) => {
	const exampleData = [34, 44, 32, 78, 184, 221, 171, 26, 62, 5];
	const cleanData = exampleData.map((item, i) => ({ x: i, y: item }));
	const [dataDisplayed, setDataDisplayed] = useState('applicationData');
	const [deviceDataDisplayed, setDeviceDataDisplayed] = useState('RTT');
	const [appVersion, setAppVersion] = useState(24);
	const devInfo={
		brandName:'Samsung',
		modelName:'Galaxy S Duos',
		osVersion:'10'
	}
	const graphNames = {
		'CQI': "Channel Quality Index (CQI)",
		'SINR': "Signal to Inference Noise Ratio (SINR)",
		'RSRQ': "Reference Signal Received Quality (RSRQ)",
		'RSRP': "Reference Signal Received Power (RSRP)",
		'RTT': "Round Trip Time (RTT)",
		'Throughput': "Throughput",
	};
	const CQISeries=[
		{
			name: "CQI",
			data: [52, 40, 45, 50, 49, 30, 36, 12, 52, 40, 45, 50, 49, 30, 30, 18, 52, 40, 45, 50, 49, 30, 31, 27, 50, 49, 30, 45, 59, 52, 40, 45, 4]
		}
	];
	const SINRSeries=[
		{
			name: "SINR",
			data: [52, 40, 45, 80, 49, 30, 36, 19, 52, 53, 45, 20, 49, 31, 40, 18, 52, 40, 45, 90, 19, 40, 11, 27, 30, 25, 30, 45, 59, 52, 44]
		}
	];
	const appDataSeries=[
		{
			name: "appdata",
			data: [40, 45, 80, 46, 19, 52, 53, 45, 80, 49, 30, 36, 19, 52, 49, 31 ,49, 31, 40, 52, 40,45, 25, 30, 45, 59, 52, 44]
		}
	];
	const RSRQSeries=[
		{
			name: "RSRQ",
			data: [52, 40, 45, 50, 49, 19, 36, 12, 5, 33, 45, 50, 40, 29, 19, 18, 52, 40, 45, 50, 49, 19, 31, 27, 50, 49, 30, 41, 5, 5, 40, 35]
		}
	];
	const RSRPSeries=[
		{
			name: "RSRP",
			data: [52, 40, 45, 50, 49, 30, 36, 12, 52, 40, 40, 50, 49, 30, 45, 50, 49, 30, 20, 18, 52, 40, 45, 50, 49, 30, 31, 24]
		}
	];
	const SINRLevels = {
		y1: 10,y2: 15,y3: 24,y4: 39,y5: 50
	};
	const CQILevels = {
		y1: 10,y2: 15,y3: 24,y4: 39,y5: 50
	};
	const RSRPLevels = {
		y1: 10,y2: 15,y3: 24,y4: 39,y5: 50
	};
	const RSRQLevels = {
		y1: 10,y2: 15,y3: 24,y4: 39,y5: 50
	};
	const [deviceInfo,setDeviceInfo] = useState(devInfo)
	const [series,setSeries] = useState(appDataSeries)
	const [legendLevels, setLegendLevels] = useState({y1:0,y2:0,y3:0,y4:0,y5:0})
	const optionsLine = {
	chart: {
		id: "line",
		toolbar: {
		show: true,
		offsetX: 0,
		offsetY: 0,
		tools: {
				download: false,
				selection: false,
				zoom: false,
				zoomin: true,
				zoomout: true,
				pan: true,
			},
			autoSelected: 'pan'
		},
		background: '#eee7e7'
	},
	annotations: {
		position: 'front' ,
		yaxis: [{
		y: legendLevels.y1,
		y2: legendLevels.y2,
		fillColor: '#ff8585',
		opacity: 0.2,
		// label: {
		//   borderColor: '#333',
		//   style: {
		// 	fontSize: '10px',
		// 	color: '#333',
		// 	background: '#ff8585',
		//   },
		//   text: 'Poor',
		// }
	  },
	  {
		y: legendLevels.y2,
		y2: legendLevels.y3,
		fillColor: '#faff74',
		opacity: 0.2,
		// label: {
		//   borderColor: '#d2d2d2',
		//   style: {
		// 	fontSize: '10px',
		// 	color: '#333',
		// 	background: '#faff74',
		//   },
		//   text: 'Average',
		// }
	  },
	  {
		y: legendLevels.y3,
		y2: legendLevels.y4,
		fillColor: '#a1d5ff',
		opacity: 0.2,
		// label: {
		//   borderColor: '#333',
		//   style: {
		// 	fontSize: '10px',
		// 	color: '#333',
		// 	background: '#a1d5ff',
		//   },
		//   text: 'Good',
		// }
	  },
	  {
		y: legendLevels.y4,
		y2: legendLevels.y5,
		fillColor: '#91ffb8',
		opacity: 0.2,
	  }]
	},
	title: {
	text: dataDisplayed === 'applicationData'?graphNames[deviceDataDisplayed]:graphNames[dataDisplayed],
	align: 'left'
	},
	dataLabels:{
		enabled:false
	},
	stroke: {
		show: true,
		curve:'straight',
		width: 5,
		dashArray: 0,      
	},
	markers: {
        size: 4,
        strokeColor: "#fff",
        strokeWidth: 1,
        strokeOpacity: 2,
        fillOpacity: 5,
        hover: {
          size: 6
        }
      },
	xaxis: {
		categories: [1972, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,1972, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,1972, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,1972, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
	}
	};
	const optionsArea = {
		chart: {
			id: "area",
			toolbar: {
			show: true,
			offsetX: 0,
			offsetY: 0,
			tools: {
					download: false,
					selection: false,
					zoom: false,
					zoomin: true,
					zoomout: true,
					pan: true,
				},
				autoSelected: 'pan'
			},
			background: '#eee7e7'
		},
		annotations: {},
		title: {
		text: graphNames[deviceDataDisplayed],
		align: 'left'
		},
		dataLabels:{
			enabled:false
		},
		stroke: {
			show: true,
			curve:'straight',
			width: 5,
			dashArray: 0,      
		},
		markers: {
			size: 0,
			strokeColor: "#fff",
			strokeWidth: 1,
			strokeOpacity: 2,
			fillOpacity: 5,
			hover: {
			  size: 5
			}
		  },
		xaxis: {
			categories: [1972, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,1972, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,1972, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,1972, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
		}
		};
	// functions

	const seeGraphType = (value) =>{
		setDataDisplayed(value)
		console.log("viewing ", value)
		switch(value)
		{
			case 'CQI': setSeries(CQISeries);
						setLegendLevels(CQILevels);
						break;
			case 'RSRQ': setSeries(RSRQSeries);
						setLegendLevels(RSRQLevels);		
						break;
			case 'RSRP': setSeries(RSRPSeries);
						setLegendLevels(RSRPLevels);		
						break;
			case 'SINR': setSeries(SINRSeries);
						setLegendLevels(RSRPLevels);
						break;
			case 'applicationData': setSeries(appDataSeries);
						setLegendLevels({y1:0,y2:0,y3:0,y4:0,y5:0})
						break;
		}
		
	}
	const seeSubGraphType = (value) =>{
		setDeviceDataDisplayed(value)
		setSeries(appDataSeries)
		console.log("viewing ", value)
		console.log("dhbwjw",graphNames[value])
	}

	return (
		<div className='container'>
			<Card className='card body'>
				<div className='content'>
					<DeviceInfo brand={deviceInfo.brandName} model={deviceInfo.modelName} os={deviceInfo.osVersion}/>
					<Card className='card'>
						<BarChart />
						<LineChart width={500} height={500}/>
						<h1>
							by plotly
						</h1>
						{/* <Plot
							data={[
							{
								x: [1, 2, 3],
								y: [2, 6, 3],
								type: 'scatter',
								mode: 'lines+markers',
								marker: {color: 'red'},
							}]}
							layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
						/> */}
						<div className='content'>
							<Row >
								<Col xs={{ span: 24}} lg={{ span: 24}}>
									<Row >
										<Button shape="round" size='medium' className={dataDisplayed==="applicationData" ? "chip-btn sel" : "chip-btn"} onClick={()=>{seeGraphType('applicationData')}}> Application Data</Button>
										<Button shape="round" size='medium' className={dataDisplayed==="RSRQ" ? "chip-btn sel" : "chip-btn"} onClick={()=>{seeGraphType('RSRQ')}}> RSRQ</Button>
										<Button shape="round" size='medium' className={dataDisplayed==="SINR" ? "chip-btn sel" : "chip-btn"} onClick={()=>{seeGraphType('SINR')}}> SINR</Button>
										<Button shape="round" size='medium' className={dataDisplayed==="CQI" ? "chip-btn sel" : "chip-btn"} onClick={()=>{seeGraphType('CQI')}}> CQI</Button>
									</Row>
								</Col>
							</Row>
							<div className='divider'></div>
						</div>
						{
							dataDisplayed === 'applicationData'
							?
							<div >
								<Row className='content'>
									<Col xs={{ span: 12}} lg={{ span: 4}}>
										<span className='label'>Application Version</span>
									</Col>
									<Col xs={{ span: 12}} lg={{ span: 20}}>
										<span>{appVersion}</span>
									</Col>
								</Row>
								<Row >
									<Col xs={{ span: 24}} lg={{ span: 18}}>
										<Row >
											<Button shape="round" size='small' onClick={()=>{seeSubGraphType('RTT')}} className={deviceDataDisplayed==="RTT" ? "chip-btn-sub  sel-sub" : "chip-btn-sub"}> Device RTT </Button>
											<Button shape="round" size='small' onClick={()=>{seeSubGraphType('Throughput')}} className={deviceDataDisplayed==="Throughput" ? "chip-btn-sub sel-sub" : "chip-btn-sub"}> Throughput </Button>
										</Row>
									</Col>
								</Row>
							</div>
							:
							''
						}
						<div className='content'>
						{dataDisplayed==="applicationData"?
							<div>
								<Chart
								options={optionsArea}
								series={series}
								height={500}
								type='area'
							/>
							</div>
							:
							<div>
								<Chart
									options={optionsLine}
									series={series}
									height={500}
									type='line'
								/>
								<div class="styleTrendLines">
									<div class="excellent">
										<div class="circle greenCircle" />
										<span>Excellent</span>
									</div>
									<div class="avg">
										<div class="circle blueCircle" />
										<span>Good</span>
									</div>
									<div class="avg">
										<div class="circle yellowCircle" />
										<span>Average</span>
									</div>
									<div class="avg">
										<div class="circle redCircle" />
										<span>Poor</span>
									</div>
								</div>
							</div>
						}
						</div>
					</Card>
				</div>
			</Card>
		</div>
	)
};

export default Graphs;

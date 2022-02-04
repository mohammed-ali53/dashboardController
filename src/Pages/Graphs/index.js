import React, { useState } from 'react';
import Chart from "react-apexcharts";
import './graphs.css';
import { Card,Row,Col, Button } from 'antd';
import 'antd/dist/antd.css';
import DeviceInfo from '../../Components/DeviceInfoHeader/DeviceInfo';

const Graphs = (props) => {
	const [dataDisplayed, setDataDisplayed] = useState('applicationData');
	const [deviceDataDisplayed, setDeviceDataDisplayed] = useState('RTT');
	const [appVersion, setAppVersion] = useState(24);
	const devInfo={
		brandName:'Samsung',
		modelName:'Galaxy S Duos',
		osVersion:'10'
	}
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
			data: [52, 40, 45, 80, 49, 30, 36,30, 36, 19, 52, 53, 45,49, 31, 40, 49, 31, 40, 52, 53, 45 , 49, 52, 53, 45 , 31, 40, 18, 20, 49, 31, 45 , 49, 52, 53, 40, 18, 52, 40, 45, 52, 40, 45, 49, 31, 40,49, 31, 40,52, 40,45, 49, 31, 40,49, 31, 40,52, 40, 45,52, 40, 45, 90, 19, 40, 11, 27, 30, 25, 30, 45, 59, 52, 44]
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
	const [series,setSeries] = useState(CQISeries)
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
		yaxis: [{
		y: legendLevels.y1,
		y2: legendLevels.y2,
		fillColor: '#ff8585',
		opacity: 0.2,
		label: {
		  borderColor: '#333',
		  style: {
			fontSize: '10px',
			color: '#333',
			background: '#ff8585',
		  },
		  text: 'Poor',
		}
	  },
	  {
		y: legendLevels.y2,
		y2: legendLevels.y3,
		fillColor: '#faff74',
		opacity: 0.2,
		label: {
		  borderColor: '#d2d2d2',
		  style: {
			fontSize: '10px',
			color: '#333',
			background: '#faff74',
		  },
		  text: 'Average',
		}
	  },
	  {
		y: legendLevels.y3,
		y2: legendLevels.y4,
		fillColor: '#a1d5ff',
		opacity: 0.2,
		label: {
		  borderColor: '#333',
		  style: {
			fontSize: '10px',
			color: '#333',
			background: '#a1d5ff',
		  },
		  text: 'Good',
		}
	  },
	  {
		y: legendLevels.y4,
		y2: legendLevels.y5,
		fillColor: '#91ffb8',
		opacity: 0.2,
		label: {
		  borderColor: '#333',
		  style: {
			fontSize: '10px',
			color: '#333',
			background: '#91ffb8',
		  },
		  text: 'Excellent',
		}
	  }]
	},
	title: {
	text: dataDisplayed === 'applicationData'?deviceDataDisplayed:dataDisplayed,
	align: 'center'
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
		title: {
		text: deviceDataDisplayed,
		align: 'center'
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
						break;
		}
		
	}
	const seeSubGraphType = (value) =>{
		setDeviceDataDisplayed(value)
		console.log("viewing ", value)
	}

	return (
		<div className='container'>
			<Card className='card body'>
				<div className='content'>
					<DeviceInfo brand={deviceInfo.brandName} model={deviceInfo.modelName} os={deviceInfo.osVersion}/>
					<Card className='card'>
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
							<Chart
								options={dataDisplayed==="applicationData"?optionsArea:optionsLine}
								series={series}
								height={500}
								type={dataDisplayed==="applicationData"?'area':'line'}
							/>
						</div>
					</Card>
				</div>
			</Card>
		</div>
	)
};

export default Graphs;

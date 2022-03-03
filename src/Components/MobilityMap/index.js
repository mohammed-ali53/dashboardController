import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
	MapContainer,
	TileLayer,
	Circle,
	useMap,
	useMapEvents,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useDebouncedCallback } from 'use-debounce';
import { data } from './data';
import 'react-leaflet-fullscreen/dist/styles.css';
import { FullscreenControl } from 'react-leaflet-fullscreen';

const MobilityMap = () => {
	const [mobilityData, setMobilityData] = useState([]);
	const [show, setShow] = useState(false);
	const position = [32.960755, -96.716101];

	// useEffect(() => {
	// 	var arr = [];
	// 	for (var i = 0; i < 4000; i++) {
	// 		arr.push([
	// 			+generateRandomCordinates(24, 40, 5),
	// 			+-generateRandomCordinates(75, 104, 4),
	// 		]);
	// 	}
	// 	console.log(arr);
	// }, []);

	const handleFetchData = (boundaries) => {
		var apidata = {
			attributes: [
				// 'id',
				'timestamp',
				// 'timezone',
				'longitude',
				'latitude',
				'location',
				// 'device',
				// 'brand',
				// 'model',
				// 'plmnID',
				// 'networkType',
				// 'pci',
				// 'tac',
				// 'bandInfo',
				// 'bandwidth',
				// 'rsrp',
				// 'rsrq',
				// 'rssi',
				// 'cqi',
				// 'sinr',
				// 'throughput',
				// 'rtt',
				// 'deviceTaskTotal',
				// 'deviceApplicationTask',
				// 'deviceCPUUtilizationTotal',
				// 'deviceCPUUtlizationApplication',
				// 'timingAdvance',
				// 'applicationId',
				// 'userId',
				// 'pluginId',
			],
			filters: [
				{
					key: 'longitude',
					Op: 'lt',
					value: boundaries._northEast.lng,
				},
				{
					key: 'latitude',
					Op: 'lt',
					value: boundaries._northEast.lat,
				},
				{
					key: 'longitude',
					Op: 'gt',
					value: boundaries._southWest.lng,
				},
				{
					key: 'latitude',
					Op: 'gt',
					value: boundaries._southWest.lat,
				},
				{
					key: 'timestamp',
					Op: 'gt',
					value: '2022-03-01T02:30:00.000Z',
				},
				{
					key: 'timestamp',
					Op: 'lt',
					value: '2022-03-01T06:30:00.000Z',
				},
			],
			limit: 2500,
			orderBy: ['timestamp', 'DESC'],
		};

		axios
			.post('/apm-plugin/dashboard', apidata)
			.then((res) => {
				if (res.data.Status === 'success') {
					setMobilityData(res.data.Data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	function generateRandomCordinates(min, max, precision) {
		return (Math.random() * (max - min) + min).toPrecision(precision);
	}

	useEffect(() => {
		setTimeout(() => {
			setShow(true);
			console.log('executed');
		}, 3000);
	}, []);

	return (
		<>
			<MapContainer
				style={{ height: '224px' }}
				center={[position[0], position[1]]}
				zoom={4}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<BoundaryBound
					handleFetchData={handleFetchData}
					mobilityData={mobilityData}
				/>
				<FullscreenControl />
				{/* <MarkerClusterGroup>
					{show &&
						data?.map((item) => (
							<Circle
								center={item}
								color='blue'
								fillColor='blue'
								radius={0.1}
							/>
						))}
				</MarkerClusterGroup> */}
			</MapContainer>
		</>
	);
};

const BoundaryBound = ({ handleFetchData, mobilityData }) => {
	const map = useMap();
	const debounced = useDebouncedCallback((updatedBoundary) => {
		handleFetchData(updatedBoundary);
	}, 1500);

	useMapEvents({
		zoom: () => {
			debounced(map.getBounds());
		},
		drag: () => {
			debounced(map.getBounds());
		},
	});

	useEffect(() => {
		handleFetchData(map.getBounds());
	}, []);

	map.fire('dataloading');

	return (
		<MarkerClusterGroup disableClusteringAtZoom={12} chunkedLoading={true}>
			{mobilityData?.map((item) => (
				<Circle
					center={[item?.latitude, item?.longitude]}
					color='blue'
					fillColor='blue'
					radius={0.1}
				/>
			))}
		</MarkerClusterGroup>
	);
};

export default MobilityMap;

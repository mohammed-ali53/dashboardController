import React, { useState } from 'react';
import './dashboard.scss';
import ApplicationIcon from '../../Assets/Icons/applicationIcon.svg';
import G1 from '../../Assets/Icons/g1.svg';
import M5 from '../../Assets/Icons/m5.svg';
import Node from '../../Assets/Icons/node.svg';
import Table1 from '../../Assets/Icons/table1.svg';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import GeoMap from '../../Components/GeoMap';
import MobilityMap from '../../Components/MobilityMap';
import ScatterPlot from '../../Components/Charts/ScatterPlot';

const Dashboard1 = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className='pageDashBoard'>
				<div className={`SidebarArea ${open ? 'visibleBar' : ''}`}>
					<Sidebar open={open} setOpen={setOpen} />
				</div>
				<div className='main_wrapper'>
					<Header title='Welcome Back, Emran' />
					<div className='wrapperArea area_1'>
						<div className='container_1'>
							<div className='row'>
								<div className='col-lg-4 col-md-4'>
									<div className='yellowBox'>
										<h2>
											<img className='mr-15' src={ApplicationIcon} alt='' />{' '}
											Application Instances
										</h2>
										<p className='fbig'>595</p>
									</div>
								</div>
								<div className='col-lg-8 col-md-8'>
									<div className='areaBox'>
										<p>
											Application Device Details Connected to Cellular Sites
										</p>
										<GeoMap />

										<div
											className='flex-container'
											style={{ zIndex: '99999999' }}
										>
											<div className='ulPosition'>
												<ul className='mapUl'>
													<li>
														Verizon <span className='Verizon'></span>
													</li>
													<li>
														AT&T <span className='AT-T'></span>
													</li>
													<li>
														Mint <span className='Mint'></span>
													</li>
													<li>
														T-Mobile <span className='T-Mobile'></span>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='wrapperArea area_2'>
						<div className='container_1'>
							<div className='row'>
								<div className='col-lg-4 col-md-12 xs-mb_30'>
									<div className='whiteBox'>
										<h3>Cellular Coverage Quality per Network Type</h3>
										<img alt='' src={G1} />
									</div>
								</div>
								<div className='col-lg-8 col-md-12'>
									<div className='row'>
										<div className='col-md-6'>
											<div className='whiteBox'>
												<h3>
													Received Cellular Coverage Power by Application Device
												</h3>
												<ScatterPlot kpiList={['rsrp', 'sinr']}></ScatterPlot>
											</div>
										</div>
										<div className='col-md-6'>
											<div className='whiteBox'>
												<h3>Application instance mobility view</h3>
												<div className='row'>
													<div className='col-md-6'>
														<div className='mapInner'>
															<MobilityMap />
															<span className='mapInnerSpan verizonMap'>
																Verizon
															</span>
														</div>
													</div>
													<div className='col-md-6'>
														<div className='mapInner'>
															<MobilityMap />
															<span className='mapInnerSpan at-tMap'>AT&T</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='wrapperArea area_3'>
						<div className='container_1'>
							<div className='row'>
								<div className='col-lg-4 col-md-12 xs-mb_30'>
									<div className='whiteBox'>
										<h3>Application instance mobility Throughput</h3>
										<img alt='' src={M5} />
									</div>
								</div>
								<div className='col-lg-8 col-md-12'>
									<div className='row clearfix'>
										<div className='col-md-5'>
											<div className='blueBox'>
												<div className='flex-box columnFlex'>
													<div className='flex-item'>
														<img alt='' src={Node} />
														<h2 className='titleImage'> Networks </h2>
													</div>

													<div className='flex-item'>
														<p className='fbig'>04</p>
													</div>
												</div>
											</div>
										</div>
										<div className='col-md-7'>
											<div className='whiteBox'>
												<h3>Experienced Throughput per Network Coverage</h3>
												<div className='row'>
													<div className='col-md-7'>
														{/* <img alt='' src={Map} /> */}
													</div>
													<div className='col-md-5'>
														<img alt='' src={Table1} />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard1;

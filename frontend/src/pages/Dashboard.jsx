import Sidebar from "../components/Sidebar";

const Dashbaord = () => {


    return (
        <>
            <Sidebar />
            <div className="content">
                <div className="container">
                    <div className="row p-3">
                        <div className="col-lg-6 mb-3">
                            <div className="dashboard-card h-100 p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="fw-bold m-0">PRODUCTS</h6>
                                        <p className="m-0">No. of products</p>
                                        <h1>900</h1>
                                    </div>
                                    <i className="bx bx-category p-3 border fs-3 dash-icon-bg text-white rounded-3"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className="dashboard-card h-100 p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="fw-bold m-0">SALES</h6>
                                        <p className="m-0">No. of sales</p>
                                        <h1>900</h1>
                                    </div>
                                    <i className="bx bx-money p-3 border fs-3 dash-icon-bg text-white rounded-3"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className="dashboard-card h-100 p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="fw-bold m-0">DAILY INCOME</h6>
                                        <p className="m-0">Daily Net Income</p>
                                        <h1>&#8369; 12900.00</h1>
                                    </div>
                                    <i className="bx bx-money-withdraw p-3 border dash-icon-bg fs-3 text-white rounded-3"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className="dashboard-card h-100 p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="fw-bold m-0">OVERALL INCOME</h6>
                                        <p className="m-0">Net Income</p>
                                        <h1>&#8369; 12900.00</h1>
                                    </div>
                                    <i className="bx bx-trending-up p-3 border fs-3 dash-icon-bg text-white rounded-3"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashbaord;
const Error = ({ msg }) => {
    return (
        <div className="error-card border-danger p-3">
            <div className="d-flex align-items-center">
                <i className='bx bx-error-circle fs-2 mx-1 text-whtie'></i>
                <h6 className='m-0 fw-bold'>Error message</h6>
            </div>
            <p className='m-0 mx-3'>{msg}</p>
        </div>
    );
}

export default Error;
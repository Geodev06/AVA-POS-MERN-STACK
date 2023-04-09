
import { useState } from "react";
import Error from "../components/Error";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";


const Product = () => {


    const [productmodal, setproductModal] = useState(false)
    const [categorymodal, setcategoryModal] = useState(false)

    const { user } = useAuthContext()

    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(false)

    const [categoryName, setCategoryName] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')

    const handleCategorySubmit = async (e) => {
        e.preventDefault()

        setError(null)
        setisLoading(true)
        try {

            const response = await axios.post('/api/category/store', {
                name: categoryName, description: categoryDescription
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            if (response) {
                setCategoryName('')
                setCategoryDescription('')
                setcategoryModal(false)

            }
            setisLoading(false)
        } catch (e) {
            setisLoading(false)

            setError(e.response.data.err)
        }

    }


    return (
        <>

            <div className="content">
                <div className="container">
                    <div className="row p-3">
                        <div className="col-lg-12 d-flex">
                            <button className="btn btn-dark rounded-5 mx-1" onClick={(e) => setproductModal(true)}><i className="bx bx-layer-plus"></i>Add Product</button>
                            <button className="btn btn-dark rounded-5" onClick={(e) => setcategoryModal(true)}><i className="bx bx-category"></i>Add Category</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                categorymodal ? <div className="custom-modal" style={categorymodal ? { display: 'block' } : { display: 'none' }}>


                    <div className="custom-modal-content p-5 bg-light">
                        <div className="d-flex flex-column p-2">
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold">Add new Category</h5>
                            </div>
                        </div>

                        {
                            error && <Error msg={error} />
                        }

                        <form onSubmit={handleCategorySubmit} >
                            <div className="row">

                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="">Category name</label>
                                    <input type="text"
                                        value={categoryName}
                                        className="form-control" placeholder="Category name" onChange={(e) => setCategoryName(e.target.value)} />
                                </div>

                                <div className="col-lg-12">
                                    <textarea name="" id="" cols="58" rows="4" className="form-control"
                                        value={categoryDescription}
                                        placeholder="Category description."
                                        onChange={(e) => setCategoryDescription(e.target.value)}>

                                    </textarea>
                                </div>
                            </div>
                            <div className="mt-4 d-flex justify-content-end">
                                <button className="btn btn-primary mx-1 mb-1"
                                    disabled={isLoading}
                                    onClick={handleCategorySubmit}
                                > <i className="bx bx-save"></i> Save</button>
                                <button className="btn btn-default border mb-1" onClick={(e) => setcategoryModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>

                </div> : ''
            }
            {
                productmodal ? <div className="custom-modal" style={productmodal ? { display: 'block' } : { display: 'none' }}>


                    <div className="custom-modal-content p-5 bg-light">
                        <div className="d-flex flex-column p-2">
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold">Add new Product</h5>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-lg-6 mb-2">
                                <label htmlFor="">Product name</label>
                                <input type="text" className="form-control" placeholder="Product name" />
                            </div>

                            <div className="col-lg-6 mb-2">
                                <label htmlFor="">Product category</label>
                                <select name="category" id="" className="form-select">
                                    <option value="">Choose one</option>
                                </select>
                            </div>

                            <div className="col-lg-12">
                                <textarea name="" id="" cols="58" rows="4" className="form-control">
                                    Product description.
                                </textarea>
                            </div>

                            <div className="col-lg-4 mb-2">
                                <label htmlFor="">Product price</label>
                                <input type="text" className="form-control" placeholder="Product price" />
                            </div>

                            <div className="col-lg-8 mb-2">
                                <label htmlFor="">Product image</label>
                                <input type="file" accept="image/jpeg,image/jpg,image/png" className="form-control" placeholder="Product image" />
                            </div>

                        </div>
                        <div className="mt-4 d-flex justify-content-end">
                            <button className="btn btn-primary mx-1 mb-1" > <i className="bx bx-save"></i> Save</button>
                            <button className="btn btn-default border mb-1" onClick={(e) => setproductModal(false)}>Cancel</button>
                        </div>
                    </div>

                </div> : ''
            }
        </>
    );
}

export default Product

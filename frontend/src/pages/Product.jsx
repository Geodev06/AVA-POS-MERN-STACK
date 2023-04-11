
import { useEffect, useState } from "react";
import MessageAlert from "../components/MessageAlert";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useCategoryContext } from "../hooks/useCategoryContext";


const Product = () => {


    const { user } = useAuthContext()

    const { category, dispatch: category_dispatch } = useCategoryContext()


    // trigger modal
    const [productmodal, setproductModal] = useState(false)
    const [categorymodal, setcategoryModal] = useState(false)
    const [successMessage, setsuccessMessage] = useState(null)


    const [errorCat, setErrorCat] = useState(null)
    const [errorProduct, seterrorProduct] = useState(null)
    const [isLoading, setisLoading] = useState(false)

    const [categoryName, setCategoryName] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')

    const handleCategorySubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            return
        }
        setErrorCat(null)
        setisLoading(true)
        setsuccessMessage(null)
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
                setsuccessMessage('Category has been successfully added!')
                setTimeout(() => {
                    setsuccessMessage(null)
                }, 2000)
                category_dispatch({ type: 'CREATE_CATEGORY', payload: response.data.category })


            }
            setisLoading(false)
        } catch (e) {
            setisLoading(false)
            setsuccessMessage(null)
            setErrorCat(e.response.data.err)

        }

    }

    const [productName, setproductName] = useState('')
    const [productCategory, setproductCategory] = useState('')
    const [productDesc, setproductDesc] = useState('')
    const [productPrc, setproductPrc] = useState(parseFloat(0).toFixed(2))
    const [productImg, setproductImg] = useState('empty')

    const handleProductSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            return
        }
        seterrorProduct(null)
        setisLoading(true)
        setsuccessMessage(null)
        try {

            const { data } = await axios.post('/api/product/store', {
                name: productName,
                category: productCategory,
                description: productDesc,
                price: parseFloat(productPrc).toFixed(2),
                image: productImg
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (data) {
                setproductName('')
                setproductCategory('')
                setproductDesc('')
                setproductPrc(parseFloat(0).toFixed(2))
                setproductImg('empty')
                setproductModal(false)
                setsuccessMessage('Product has been successfully added!')
                setTimeout(() => {
                    setsuccessMessage(null)
                }, 2000)

            }
            setisLoading(false)
        } catch (e) {
            setisLoading(false)
            setsuccessMessage(null)
            seterrorProduct(e.response.data.err)
        }
    }

    const destroyCategory = async (id) => {

        const { data } = await axios.delete(`/api/category/destroy/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        category_dispatch({ type: 'DELETE_CATEGORY', payload: data.category })

    }

    useEffect(() => {
        const GET_CATEGORY = async () => {

            const { data } = await axios.get('/api/category', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            category_dispatch({ type: 'GET_CATEGORY', payload: data.categories })

        }

        GET_CATEGORY()

    }, [])


    return (

        <>
            <Sidebar />
            <div className="content">
                <div className="container">
                    <div className="row p-3 ">
                        <div className="col-lg-12 d-flex mb-3">
                            <button className="btn btn-dark rounded-5 mx-1" onClick={(e) => setproductModal(true)}><i className="bx bx-layer-plus"></i>Add Product</button>
                            <button className="btn btn-dark rounded-5" onClick={(e) => setcategoryModal(true)}><i className="bx bx-category"></i>Add Category</button>
                        </div>
                        {
                            successMessage && <div className="col-lg-12"><MessageAlert msg={successMessage} type={'success'} /></div>
                        }
                        <div className="col-lg-7">
                            <h5 className="fw-bold">Saved products</h5>
                            <table className="">
                                <thead>
                                    <tr>
                                        <th>
                                            Category name
                                        </th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>

                        <div className="col-lg-5" style={{ maxHeight: '600px', overflowX: 'auto' }}>
                            <h5 className="fw-bold">Saved categories</h5>
                            <table className="">
                                <thead>
                                    <tr>
                                        <th>
                                            Category name
                                        </th>
                                        <th>Description</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        category.length ? category.map((v, i) =>

                                            <tr key={v._id}>
                                                <td>{v.name}</td>
                                                <td>{v.description}</td>
                                                <td className="text-center fs-6">
                                                    <i onClick={(e) => destroyCategory(v._id)} className="bx bx-trash" style={{ cursor: 'pointer' }}></i>
                                                </td>
                                            </tr>

                                        ) : <p className="p-3">No data.</p>
                                    }
                                </tbody>
                            </table>
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
                            errorCat && <MessageAlert msg={errorCat} type={'error'} />
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
                        <div className="">

                            {
                                errorProduct && <MessageAlert msg={errorProduct} type={'error'} />
                            }

                            <form onSubmit={handleProductSubmit} className="row">
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="">Product name</label>
                                    <input type="text" className="form-control"
                                        placeholder="Product name"
                                        vavlue={productName}
                                        onChange={(e) => setproductName(e.target.value)} />
                                </div>

                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="">Product category</label>
                                    <select name="category" className="form-select"
                                        onChange={(e) => setproductCategory(e.target.value)}>
                                        <option value="">Choose one</option>
                                        {
                                            category.length ? category.map((v, i) =>
                                                <option className="text-capitalize" key={v._id} value={v._id}>{v.name}</option>) : ''
                                        }
                                    </select>
                                </div>

                                <div className="col-lg-12">
                                    <textarea name="" id="" cols="58" rows="4"
                                        className="form-control"
                                        value={productDesc} onChange={(e) => setproductDesc(e.target.value)} >

                                    </textarea>
                                </div>

                                <div className="col-lg-4 mb-2">
                                    <label htmlFor="">Product price</label>
                                    <input type="text" className="form-control"
                                        placeholder="Product price"
                                        value={productPrc} onChange={(e) => setproductPrc(e.target.value)} />
                                </div>

                                <div className="col-lg-8 mb-2">
                                    <label htmlFor="">Product image</label>
                                    <input type="file" accept="image/jpeg,image/jpg,image/png"
                                        className="form-control"
                                        onChange={(e) => setproductImg(e.target.value)}
                                        placeholder="Product image" />
                                </div>
                                <div className="mt-4 d-flex justify-content-end">
                                    <button className="btn btn-primary mx-1 mb-1" > <i className="bx bx-save"></i> Save</button>
                                    <button className="btn btn-default border mb-1" onClick={(e) => setproductModal(false)}>Cancel</button>
                                </div>
                            </form>

                        </div>

                    </div>

                </div > : ''
            }

        </>
    );
}

export default Product

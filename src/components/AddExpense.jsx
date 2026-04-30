import React,{useState} from "react";
import { Breadcrumb } from "react-bootstrap";
import { Icon, loadIcon } from "@iconify/react";
import { expenseCategories } from "../helper/ExpenseCategories";
import { SAVE_EXPENSE } from "../api-routes";
import { toast } from "react-toastify";
import api from "../Api";
const AddExpense=()=>{

    const [loading,setLoading]=useState(false)
    const [expenseData,setExpenseData]=useState({
        amount:'',
        category:'',
        date:'',
        description:''
    })

    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        setExpenseData({...expenseData,[name]:value})

    }
    const resetForm=()=>{
        setExpenseData({amount:'',
        category:'',
        date:'',
        description:''})
    }
    const isFormValid=expenseData.amount && expenseData.category && expenseData.date && expenseData.description

    const handleSubmit=async(e)=>{
            e.preventDefault()
            try{
            setLoading(true)
        
        const response=await api.post(SAVE_EXPENSE,expenseData);
        if(response.status===200 || response.status===201){
            console.log(response.data)
            toast.success(response.data.message)
        }
            }
            catch(error){
                    console.log(error)
                    toast.error(error?.response?.data?.message ||'Something Went Wrong')
            }
            finally{
                setLoading(false)
                resetForm()
            }
    }


    return(
        <>
        <Breadcrumb title="Add Expense"/>
        <div className="d-flex flex-column align-items-center ">
         <div className="col-md-6 ">
            <div className="card">
                {/* <div className="card-header">
                    <h5 className="card-title mb-0">Add Expense</h5>
                </div> */}
                <div className="card-body">
                    <div className="d-flex flex-row align-items-center fw-bold  justify-items-center align-content-center justify-content-center gap-1 create-header-fs">
                                    
                                      <Icon icon="solar:bill-check-linear" height='24'  className="text-lilac-600 "/>  <span className="text-lilac-600  ">Add Expense</span>
                                </div>
                                <form onSubmit={handleSubmit}> 
                    <div className="row gy-3">
                        <div className="col-12">
                            <label className="form-label">Amount</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="si:money-line" />
                                </span>
                                <input
                                    type="number"
                                    name="amount"
                                    value={expenseData.amount}
                                    className="form-control"
                                    placeholder="Enter Amount"
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Date</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="clarity:date-line" />
                                </span>
                                <input
                                    type="date"
                                    name="date"
                                    value={expenseData.date}
                                    className="form-control"
                                    placeholder="Enter Date"
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Category</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="iconamoon:category-thin" />
                                </span>
                                 <select name="category" className="form-control" value={expenseData.category} onChange={handleOnChange}>
                                    <option value='' disabled>Select Category</option>
                                  {
                                    
                                    expenseCategories.map((status)=>(<option key={status} value={status}> {status}</option>))
                                  }
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Description</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="material-symbols-light:description-outline-sharp" />
                                </span>
                                <textarea
                                   
                                    name="description"
                                    value={expenseData.description}
                                    className="form-control"
                                    placeholder="Enter description"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="mt-24 col-md-12 d-flex align-items-center justify-content-center">
                        <div className="col-12">
                            <button type="submit" className="btn btn-lilac-600 w-100"
                            disabled={loading || !isFormValid}
                            >
                               {loading ?'Adding...':'Add'} 
                            </button>
                        </div></div>
                    </div></form>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default AddExpense;
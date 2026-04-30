import React,{useState} from "react";
import { Breadcrumb } from "react-bootstrap";
import { Icon, loadIcon } from "@iconify/react";
import { expenseCategories } from "../helper/ExpenseCategories";
import { SAVE_EXPENSE, SAVE_FEEDBACK } from "../api-routes";
import { toast } from "react-toastify";
import api from "../Api";
const AddFeedback=()=>{
    const [rating,setRating]=useState(0)
    const [loading,setLoading]=useState(false)
    const [description,setDescription]=useState('')
   
    const resetForm=()=>{
        setRating(0)
        setDescription('')
    }
   
    const isFormValid=rating && description

    const handleSubmit=async(e)=>{
            e.preventDefault()
            try{
            setLoading(true)
        
        const response=await api.post(SAVE_FEEDBACK,{ratingStars:rating,message:description});
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
        <Breadcrumb title="Send Feedback"/>
        <div className="d-flex flex-column align-items-center ">
         <div className="col-md-6 ">
            <div className="card">
                {/* <div className="card-header">
                    <h5 className="card-title mb-0">Add Expense</h5>
                </div> */}
                <div className="card-body">
                    <div className="d-flex flex-row align-items-center fw-bold  justify-items-center align-content-center justify-content-center gap-1 create-header-fs">
                                    
                                      <Icon icon="material-symbols:feedback-outline-rounded" height='24'  className="text-lilac-600 "/>  <span className="text-lilac-600  ">Feedback</span>
                                </div>
                                <form onSubmit={handleSubmit}> 
                    <div className="row gy-3">
                        <div className="col-12">
                            <label className="form-label">Rating</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field">
                                {/* <span className="icon">
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
                                />  */}
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                 <div style={{ fontSize: "40px", cursor: "pointer" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{
              color: star <= rating ? "#facc15" : "#d1d5db"
            }}
          >
            ★ &nbsp;
          </span>
        ))}
      </div></div>
                            </div>
                        </div>
                        
                        <div className="col-12">
                            <label className="form-label">Feedback</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field">
                                <span className="icon">
                                    <Icon icon="material-symbols-light:description-outline-sharp" />
                                </span>
                                <textarea
                                   rows={7}
                                    name="description"
                                    value={description}
                                     onChange={(e) => setDescription(e.target.value)}
                                    className="form-control"
                                    placeholder="Write your feedback here..."
                                  
                                />
                            </div>
                        </div>
                        <div className="mt-24  mb-8 col-md-12 d-flex align-items-center justify-content-center">
                        <div className="col-12">
                            <button type="submit" className="btn btn-lilac-600 w-100"
                            disabled={loading || !isFormValid}
                            >
                               {loading ?'Submitting...':'Submit'} 
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
export default AddFeedback;
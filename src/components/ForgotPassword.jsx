import {Icon} from '@iconify/react'
import axios from 'axios'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FORGOT_PASSWORD_CREATE } from '../api-routes';
const ForgotPassword=()=>{

const [loading,setLoading]=useState(false)
const [formData,setFormData]=useState({
    email:"",
    
})
 const handleOnChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    //const isPasswordValid=formData.password.length>=8;
    const isFormValid=formData.email.length!=0
        const resetForm=()=>{setFormData({email:''})}
    const handleSubmit=async(e)=>{

        e.preventDefault();
        console.log(formData)
        setLoading(true)
        try{
            const baseUrl=process.env.REACT_APP_API_URL
           const response= await axios.post(`${baseUrl}${FORGOT_PASSWORD_CREATE}`,formData);
           if(response.status===200){
            console.log(response.data)
            toast.success(response.data.message)
           }

        }
        catch(error){
                
            toast.error(error?.response?.data?.message || 'Something went Wrong')
        }
        finally{
            setLoading(false);
            resetForm()
        }
    }


    return(
        <>
          <div className="center-container register-bg">
              <div className="col-lg-4 ">
                    <div className="card radius-40 ">
                        {/* <div className="card-header">
                            <h6 className="card-title mb-0 text-center text-primary-600">Create Account</h6>
                        </div> */}
                        <div className="card-body ">
                            <form className="row gy-3 " onSubmit={handleSubmit}>
                                <div className="d-flex flex-row align-items-center fw-bold  justify-items-center align-content-center justify-content-center gap-1 create-header-fs">
                                    
                                      <Icon icon="hugeicons:forgot-password" height='24'  className="text-lilac-600 "/>  <span className="text-lilac-600  ">Forgot Password</span>
                                </div>
                               
                               
                                <div className="col-md-12">
                                    <label className="form-label">Email</label>&nbsp;<small className="text-danger">*</small>
                                    <div className="icon-field ">
                                        <span className="icon">
                                            <Icon icon="mage:email" />
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            required
                                            onChange={(e)=>handleOnChange(e)}
                                            value={formData.email}
                                        />
                                        
                                    </div>
                                </div>
                                
                              
                              
                                {/* <div className="col-md-12">
                                    <label className="form-label">Password</label>&nbsp;<small className="text-danger">*</small>
                                    <div className="icon-field ">
                                        <span className="icon">
                                            <Icon icon="solar:lock-password-outline" />
                                        </span>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            required
                                            onChange={(e)=>handleOnChange(e)}
                                            value={formData.password}
                                        />
                                    </div>
                                </div> */}

                               
                               
                                <div className="mt-24 col-md-12 d-flex align-items-center justify-content-center">
                                    <button className="btn btn-lilac-600 w-100" type="submit"
                                    disabled={!isFormValid || loading}
                                    >
                                       {loading ? 'Sending...':'Send Email'}
                                    </button>
                                </div>
                                <div className='mt-12 text-center text-sm'>
                                 <p className='mb-0'> Back to Login ?{" "}
                        <Link to='/' className='text-primary-600 fw-semibold'>
                          Sign in
                        </Link>
                      </p>
                    </div>
        
                            </form>
                        </div>
                    </div>
                </div>
        
        
        </div>
        </>
    )

}
export default ForgotPassword;
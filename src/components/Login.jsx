import {Icon} from '@iconify/react'
import axios from 'axios'
import { useState } from 'react';
import { Link, replace, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOGIN } from '../api-routes';
import Cookies from 'js-cookie';
const Login=()=>{
const baseUrl=process.env.REACT_APP_API_URL
const [loading,setLoading]=useState(false)
const navigate=useNavigate()
const [formData,setFormData]=useState({
    email:"",
    password:""
})
 const handleOnChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const isFormValid=formData.password.length!==0 && formData.email.length!==0

  const resetForm=()=>{
    setFormData({email:'',password:''})
  }
    const handleSubmit=async(e)=>{

        e.preventDefault();
        console.log(formData)
        setLoading(true)
        try{
           const response= await axios.post(`${baseUrl}${LOGIN}`,formData);
           if(response.status===200){
            console.log(response.data)
            localStorage.setItem("ACCESS_TOKEN",response.data.data.accessToken)
            localStorage.setItem("REFRESH_TOKEN",response.data.data.refreshToken)
            Cookies.set("userId",response.data.data.userId,{path:'/',expires:7})
            Cookies.set("userName",response.data.data.userName,{path:'/',expires:7})
            Cookies.set("monthlySalary",response.data.data.monthlySalary,{path:'/',expires:7})

            toast.success(response.data.message)
            navigate('/dboard',{replace:true})
           }

        }
        catch(error){
            console.log(error)
            if(error.response.data.message  ){
                toast.error(error.response.data.message)
            }
            else{
                toast.error('Something went wrong')
            }
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
                    <div className="card radius-12 ">
                        {/* <div className="card-header">
                            <h6 className="card-title mb-0 text-center text-primary-600">Create Account</h6>
                        </div> */}
                        <div className="card-body  shadow-4 ">
                            <form className="row gy-3 " onSubmit={handleSubmit}>
                                <div className="d-flex flex-row align-items-center fw-bold  justify-items-center align-content-center justify-content-center gap-1 create-header-fs">
                                    
                                      <Icon icon="material-symbols:login-rounded" height='24'  className="text-lilac-600 "/>  <span className="text-lilac-600  ">Sign in</span>
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
                                
                              
                              
                                <div className="col-md-12">
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
                                </div>

                                <div className='d-flex flex-column align-items-end justify-content-end'>
                                    <Link to='/forgot-password' className='text-primary-600 fw-semibold'>
                          Forgot Password?
                        </Link>
                                </div>
                               
                                <div className="mt-24 col-md-12 d-flex align-items-center justify-content-center">
                                    <button className="btn btn-lilac-600 w-100" type="submit"
                                    disabled={!isFormValid || loading}
                                    >
                                       {loading ? 'Logging in...':'Login'}
                                    </button>
                                </div>
                                <div className='mt-12 text-center text-sm'>
                                 <p className='mb-0'> Don't have an account?{" "}
                        <Link to='/register' className='text-primary-600 fw-semibold'>
                          Sign up
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
export default Login
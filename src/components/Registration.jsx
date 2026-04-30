import React,{useState} from "react";
import {Icon} from '@iconify/react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { REGISTER } from "../api-routes";
const Registration=()=>{

    const baseURL=process.env.REACT_APP_API_URL
    const [loading,setLoading]=useState(false);
    const [formData,setFormData]=useState({
    "username":"",
    "email":"",
    "password":"",
    "confirmPassword":"",
    "age":"",
    "maritalStatus":"",
    "monthlySalary":"",
    "employmentDomain":""
    })

    const resetForm=()=>{
        setFormData({
    "username":"",
    "email":"",
    "password":"",
    "confirmPassword":"",
    "age":"",
    "maritalStatus":"",
    "monthlySalary":"",
    "employmentDomain":""
        })
    }
    const handleOnChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const isPasswordValid=formData.password.length>=8;
    const isPasswordsMatched=formData.confirmPassword.length>0 && formData.password===formData.confirmPassword
    const passwordValidation=isPasswordValid&&formData.password===formData.confirmPassword

const domains = [
  "Information Technology",
  "Software Development",
  "Healthcare & Medical",
  "Banking & Finance",
  "Education & Training",
  "Engineering ",
  "Sales",
  "Marketing & Advertising",
  "Human Resources (HR)",
  "Operations & Management",
  "Customer Support / BPO",
  "Legal & Compliance",
  "Accounting & Auditing",
  "Manufacturing & Production",
  "Construction & Real Estate",
  "Logistics & Supply Chain",
  "Retail & E-commerce",
  "Telecommunications",
  "Media & Entertainment",
  "Consulting",
  "Freelancer / Self-employed",
  "Business Owner / Entrepreneur"
];
const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
                setLoading(true)
                console.log(formData)
const { confirmPassword, ...payload } = formData;
                console.log(formData)
                const response=await axios.post(`${baseURL}${REGISTER}`,payload);
                if(response.status===200 || response.status===201){
                    console.log(response.data)
                    toast.success(response.data.message)
                }
        }
        catch(error){
            toast.error(error?.response?.data?.message|| 'Something went wrong')
        }
        finally{
            resetForm();
            setLoading(false)
        }
}
return(
    <>
    <div className="center-container register-bg">
      <div className="col-lg-6 ">
            <div className="card radius-40 ">
                {/* <div className="card-header">
                    <h6 className="card-title mb-0 text-center text-primary-600">Create Account</h6>
                </div> */}
                <div className="card-body shadow-4 ">
                    <form className="row gy-3 " onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center fw-bold  justify-items-center align-content-center justify-content-center gap-1 create-header-fs">
                            
                              <Icon icon="mdi:register-outline" height='24'  className="text-lilac-600 "/>  <span className="text-lilac-600  ">Create an Account </span>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field ">
                                <span className="icon">
                                    <Icon icon="f7:person" />
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="Enter Username"
                                    required
                                    onChange={(e)=>handleOnChange(e)}
                                    value={formData.username}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Age</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field ">
                                <span className="icon">
                                    <Icon icon="streamline-flex:number-sign" />
                                </span>
                                <input
                                    type="number"
                                    name="age"
                                    className="form-control"
                                    placeholder="Enter Age"
                                    required
                                    onChange={(e)=>handleOnChange(e)}
                                    value={formData.age}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
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
                        <div className="col-md-6">
                            <label className="form-label">Monthly Salary</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field ">
                                <span className="icon">
                                    <Icon icon="solar:money-bag-outline" />
                                </span>
                                <input
                                    type="number"
                                    name="monthlySalary"
                                    className="form-control"
                                    placeholder="Enter Monthly Salary"
                                    required
                                    onChange={(e)=>handleOnChange(e)}
                                    value={formData.monthlySalary}
                                />
                               
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Employment Domain</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field ">
                                <span className="icon">
                                    <Icon icon="oui:ml-create-single-metric-job" />
                                </span>
                               <select name="employmentDomain" className="form-control" onChange={(e)=>handleOnChange(e)} value={formData.employmentDomain}>
                                <option value="" disabled>Select Domain</option>
                                {domains.map((domain)=>(<option key={domain} value={domain}>{domain}</option>))}
                               </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Marital Status</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field ">
                                <span className="icon">
                                    <Icon icon="tabler:circles-relation" />
                                </span>
                               
                                <select name="maritalStatus" className="form-control" value={formData.maritalStatus} onChange={(e)=>handleOnChange(e)}>
                                    <option value='' disabled>Select status</option>
                                  {
                                    
                                    ['Single','Married','Divorced'].map((status)=>(<option key={status} value={status}> {status}</option>))
                                  }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field ">
                                <span className="icon">
                                    <Icon icon="solar:lock-password-outline" />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="It should be atleast 8 characters"
                                    required
                                    onChange={(e)=>handleOnChange(e)}
                                    value={formData.password}
                                />
                            </div>
                            { formData.password.length>0 &&  !isPasswordValid &&( <small className="text-danger-600 text-sm ">password should be atleast 8 characters</small>)}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Confirm Password</label>&nbsp;<small className="text-danger">*</small>
                            <div className="icon-field ">
                                <span className="icon">
                                    <Icon icon="solar:lock-password-outline" />
                                </span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    placeholder="Passwords should match"
                                    required
                                    onChange={(e)=>handleOnChange(e)}
                                    value={formData.confirmPassword}
                                />
                            </div>
                            
                            { formData.confirmPassword.length>0 &&  formData.confirmPassword!==formData.password &&( <small className="text-danger-600 text-sm ">Both passwords should match</small>)}

                        </div>
                        <div className="mt-24 col-md-12 d-flex align-items-center justify-content-center">
                            <button className="btn btn-lilac-600 w-100" type="submit"
                            disabled={!passwordValidation || loading}
                            >
                               {loading ? 'Signing up...':'Sign up'}
                            </button>
                        </div>
                        <div className='mt-12 text-center text-sm'>
                         <p className='mb-0'> Already have an account?{" "}
                <Link to='/' className='text-primary-600 fw-semibold'>
                  Sign In
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
export default Registration;
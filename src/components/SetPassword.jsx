import React,{useState,useEffect} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import axios from "axios";
import { RESET_PASSWORD_CREATE } from "../api-routes";


const SetPassword=()=>{
const [loading,setLoading]=useState(false);
const [searchParams]=useSearchParams();
const token=searchParams.get("token")
const [showPassword,setShowPassword]=useState(false)
const [showConfirmPassword,setShowConfirmPassword]=useState(false)
 const [success, setSuccess] = useState(false);     
  const [countdown, setCountdown] = useState(5);
  const navigate=useNavigate()
const baseUrl=process.env.REACT_APP_API_URL
const [formData,setFormData]=useState({
    newPassword:'',
    confirmPassword:''
})
 const passwordToggleVisibility=()=>{
            setShowPassword(prev=>!prev)
   }
    const passwordToggleVisibility1=()=>{
            setShowConfirmPassword(prev=>!prev)
   }

const handleOnChange=(e)=>{
    const {name,value}=e.target

    setFormData({...formData,[name]:value})

}

const resetForm=()=>{
    setFormData({
    newPassword:'',
    confirmPassword:''})
}
 useEffect(() => {
    if (!success) return;
    if (countdown === 0) {
      navigate("/", { replace: true });
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [success, countdown, navigate]);
const isFormValid=formData.newPassword.length>=8 && formData.newPassword===formData.confirmPassword

const handleSubmit=async(e)=>{
    
    e.preventDefault()
    setLoading(true)
    try {
       const response= await axios.post(`${baseUrl}${RESET_PASSWORD_CREATE}`,
        {"token":token,"newPassword":formData.newPassword})
       if(response.status===200){
        setSuccess(true)
        console.log(response.data)
        toast.success(response.data.message)
       }

    } catch (error) {
        console.log(error)
        if(error.response){
            toast.error(error.response.data.message)
        }else{
            toast.error("Something went Wrong")
        }
    }
    finally{
        setLoading(false)
        resetForm();
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
                                    
                                      <Icon icon="mdi:password-reset" height='24'  className="text-lilac-600 "/>  <span className="text-lilac-600  ">Reset Password</span>
                                </div>
                               
                               
                                
                                
                              
                              
                                <div className="col-md-12">
                                    <label className="form-label">New Password</label>&nbsp;<small className="text-danger">*</small>
                                    <div className="position-relative">
                                    <div className="icon-field ">
                                        <span className="icon">
                                            <Icon icon="solar:lock-password-outline" />
                                        </span>
                                        <input
                                            type={showPassword?'text':'password'}
                                            name="newPassword"
                                            className="form-control"
                                            placeholder="Enter New Password"
                                            required
                                            onChange={handleOnChange}
                                            value={formData.newPassword}
                                        />
                                    </div>
                                  <span
    className={`toggle-password ${
      showPassword ? "ri-eye-line" : "ri-eye-off-line"
    } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-3 text-secondary-light`}
    onClick={passwordToggleVisibility}
  />
                                    </div>
                                    <div className="text-center">
                                    {formData.newPassword.length !=0 && formData.newPassword.length<8 && (
                                        <small className="mt-12 text-danger-600 text-xs ">Password length should be atleast 8 characters</small>
                                    )}</div>
                                </div>

                                <div className="col-md-12">
                                    <label className="form-label">Confirm Password</label>&nbsp;<small className="text-danger">*</small>
                                   <div className="position-relative">
                                    <div className="icon-field ">
                                        <span className="icon">
                                            <Icon icon="solar:lock-password-outline" />
                                        </span>
                                        <input
                                            type={showConfirmPassword?'text':'password'}
                                            name="confirmPassword"
                                            className="form-control"
                                            placeholder="Confirm Password"
                                            required
                                            onChange={handleOnChange}
                                            value={formData.confirmPassword}
                                        />
                                        <span
    className={`toggle-password ${
      showConfirmPassword ? "ri-eye-line" : "ri-eye-off-line"
    } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-3 text-secondary-light`}
    onClick={passwordToggleVisibility1}
  />
                                        </div>
                                    </div>
                                     <div className="text-center">
                                    {formData.confirmPassword.length !=0 && formData.newPassword!==formData.confirmPassword && (
                                        <small className="mt-12 text-danger-600 text-xs ">Passwords does not match</small>
                                    )}</div>
                                </div>
                               
                                <div className="mt-24 col-md-12 d-flex align-items-center justify-content-center">
                                    <button className="btn btn-lilac-600 w-100" type="submit"
                                    disabled={!isFormValid|| loading}
                                    >
                                       {loading ? 'Setting...':'Set Password'}
                                    </button>
                                </div>
                                 <div className='mt-12 text-center text-sm'>
                                    {success && 
                                 <p className='mb-0 text-success-600'> You will be redirected to login in {countdown} seconds</p>
                                    }
                       
                      
                    </div> 
        
                            </form>
                        </div>
                    </div>
                </div>
        
        
        </div>
    
    
    
    
    </>
)





}
export default SetPassword;
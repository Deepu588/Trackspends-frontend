import React,{useState} from "react";
import Breadcrumb from "./child/BreadCrumb";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { GET_MONTHLY_SAVINGS } from "../api-routes";
import api from "../Api";
import Cookies from 'js-cookie'
import ExpenseDonutChart from "./child/ExpenseDonutChart";
const MonthlySavings=()=>{

    const monthlySalary=Cookies.get("monthlySalary")
    const [loading,setLoading]=useState(false)
    const [graphData,SetGraphData]=useState(null)
    const [savingsData,setSavingsData]=useState({
        expenseMonth:'',
        expenseYear:'',
        salary:monthlySalary
    })
   const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" }
  ];

  const handleOnChange=(e)=>{
    setSavingsData({...savingsData,[e.target.name]:e.target.value})
  }
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const isDataValid=savingsData.expenseMonth && savingsData.expenseYear && savingsData.salary


  const handleSubmit=async(e)=>{

    e.preventDefault()
    setLoading(true)
    try{
            const response=await api.post(`${GET_MONTHLY_SAVINGS}`,savingsData);
            if(response.status===200){
                toast.success('Monthly Savings Caluclated Successfully')
                console.log(response.data)
                SetGraphData(response.data?.data)

            }
    }
    catch(error){
        
        toast.error(error?.response?.data?.message || 'Something went wrong')
    }
    finally{
        setLoading(false)
    }
  }


    return(<>
    <Breadcrumb title="Monthly Savings"/>
                            <form onSubmit={handleSubmit}> 

    <div className="card card-body">
     <div className="p-2 d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                   <div className="d-flex flex-wrap align-items-center gap-3">
   
                       
                        <div className="icon-field ">
                         <span className="icon">
                            <Icon icon="iwwa:month" />
                         </span>
                                                          
                    <select className="form-control " required
                        value={savingsData.expenseMonth}
                        name="expenseMonth"
                        onChange={handleOnChange}
                    >
                        <option value="" disabled >Select Month</option>
                         {months.map((month) => (<option value={month.value} key={month.value}>{month.label.toUpperCase()}</option>))

                        } 

                    </select>

                    </div>

                     <div className="icon-field ">
                         <span className="icon">
                            <Icon icon="fluent-mdl2:calendar-year" />
                         </span>
                         <select className="form-control" required
                        value={savingsData.expenseYear}
                        name="expenseYear"
                        onChange={handleOnChange}
                    >
                        <option value="" disabled >Select Year</option>
                         {years.map((year) => (<option value={year} key={year}>{year}</option>))

                        } 

                    </select></div>
                     <div className="icon-field ">
                                                    <span className="icon">
                                                        <Icon icon="solar:money-bag-outline" />
                                                    </span>
                                                    <input
                                                        type="number"
                                                        name="salary"
                                                        className="form-control"
                                                        placeholder="Enter Salary"
                                                        required
                                                        onChange={handleOnChange}
                                                        value={savingsData.salary}
                                                    />
                                                   
                    </div>
                </div>
                        <div>
                              <div className=" d-flex align-items-center justify-content-center">
                            <button className="btn btn-lilac-600 " type="submit"
                            disabled={!isDataValid || loading}
                            >
                               
                                {loading ? 'Get Savings...':'Get Savings'} 
                            </button>
                            </div>
                        </div>

   </div></div>
   {graphData && (
                        <div className="card card-body mt-8">
                        <div className=" row gy-4">

                                <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
                                
                            <ExpenseDonutChart data={graphData} />
                            </div>
                            <div className="col-lg-6  d-flex flex-column align-items-center justify-content-center">
                                <p>Salary: {graphData?.salaryInMonth}</p>
                                <p>Expenses: {graphData?.sumOfAllExpensesInGivenMonth}</p>
                                <p>Savings: {graphData?.calculatedSavingsInMonth }</p>

                            </div>
                        </div></div>)}
   
   
   
   
   </form>
    </>)


}
export default MonthlySavings;
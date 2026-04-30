import React from "react";
import Breadcrumb from "./child/BreadCrumb";
import Kpi from "./child/Kpi";
import WeeklyExpensesChart from "./WeeklyExpensesChart";
import CategoryExpensesChart from "./CategoryExpensesChart";

const Dboard=()=>{

    return (
        <>
        
        <Breadcrumb title="Dashboard"/>
        <Kpi/>
        <WeeklyExpensesChart/>
        <CategoryExpensesChart/>
        </>
    )
}

export default Dboard
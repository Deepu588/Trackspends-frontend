import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../Api'
import { Icon } from '@iconify/react'
import { UPDATE_EXPENSE } from '../api-routes'
import { expenseCategories } from "../helper/ExpenseCategories";


/*
    How data gets here:
    - AllExpenses calls: navigate(`/edit-expense/${id}`, { state: { expense } })
    - This page reads it via: useLocation().state.expense
    - No prop drilling, no Redux needed for this simple case
*/
const EditExpense = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
  
    // ── Read expense passed from AllExpenses ─────────
    const { expense } = location.state || {}
const [formData, setFormData] = useState({
        amount: expense.amount || '',
        category: expense.category || '',
        description: expense.description || '',
        date: expense.date || ''
    })
    // ── If someone navigates here directly without data ──
    if (!expense) {
        return (
            <div className="text-center mt-5">
                <p className="text-muted">No expense data found.</p>
                <button className="btn btn-lilac-600" onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
        )
    }

    // ── Form State — pre-filled with existing data ────
  

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await api.patch(`${UPDATE_EXPENSE}${expense.expenseId}`, formData)
            toast.success("Expense updated successfully!")
            navigate(-1)  // go back to AllExpenses
        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.message || "Update failed. Try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="col-lg-5 col-md-8">
                <div className="card radius-12">
                    <div className="card-body">

                        {/* Header */}
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => navigate(-1)}
                            >
                                <i className="ri-arrow-left-line" />
                            </button>
                            <h6 className="fw-bold text-lilac-600 mb-0">Edit Expense</h6>
                        </div>

                        <form onSubmit={handleSubmit} className="row gy-3">

                            {/* Amount */}
                            <div className="col-md-12">
                                <label className="form-label fw-semibold">
                                    Amount <small className="text-danger">*</small>
                                </label>
                                <div className="icon-field">
                                    <span className="icon">
                                        <Icon icon="mdi:currency-inr" />
                                    </span>
                                    <input
                                        type="number"
                                        name="amount"
                                        className="form-control"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        required
                                        min={1}
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="col-md-12">
                                <label className="form-label fw-semibold">
                                    Category <small className="text-danger">*</small>
                                </label>
                                <select
                                    name="category"
                                    className="form-select"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                     <option value='' disabled>Select Category</option>
                                                                     {
                                                                       
                                                                       expenseCategories.map((status)=>(<option key={status} value={status}> {status}</option>))
                                                                     }
                                </select>
                            </div>

                            {/* Date */}
                            <div className="col-md-12">
                                <label className="form-label fw-semibold">
                                    Date <small className="text-danger">*</small>
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Optional description..."
                                />
                            </div>

                            {/* Buttons */}
                            <div className="col-md-12 d-flex gap-2 mt-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary w-50"
                                    onClick={() => navigate(-1)}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-lilac-600 w-50"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Updating...
                                        </>
                                    ) : "Update Expense"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditExpense
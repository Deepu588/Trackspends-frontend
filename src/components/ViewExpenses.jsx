import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import api from '../Api'
import { DELETE_EXPENSE, GET_ALL_EXPENSES } from '../api-routes'
import Breadcrumb from './child/BreadCrumb'

const AllExpenses = () => {
    const navigate = useNavigate()

    const [expensesData, setExpensesData] = useState([])
    const [totalElements, setTotalElements] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [nextPage, setNextPage] = useState(null)
    const [previousPage, setPreviousPage] = useState(null)

    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedExpense, setSelectedExpense] = useState(null)  // holds expense to delete
    const [deleteLoading, setDeleteLoading] = useState(false)

    const fetchExpenses = useCallback(async () => {
        try {
            setLoading(true)
            setError("")
            const res = await api.get(GET_ALL_EXPENSES, {
                params: { page }
            })
            if (res.status === 200) {
                setExpensesData(res.data.data)
                setTotalElements(res.data.totalElements)
                setTotalPages(res.data.totalPages)
                setNextPage(res.data.nextPage)
                setPreviousPage(res.data.previousPage)
            }
        } catch (err) {
            console.error(err)
            setError("Failed to fetch expenses. Please try again.")
        } finally {
            setLoading(false)
        }
    }, [page])  // re-runs whenever page changes

    useEffect(() => {
        fetchExpenses()
    }, [fetchExpenses])


    const handleDeleteClick = (expense) => {
        setSelectedExpense(expense)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            setDeleteLoading(true)
            await api.delete(`${DELETE_EXPENSE}${selectedExpense.expenseId}`)
            setShowDeleteModal(false)
            setSelectedExpense(null)
            // If last item on page, go back one page
            if (expensesData.length === 1 && page > 0) {
                setPage((prev) => prev - 1)
            } else {
                fetchExpenses()  // refresh current page
            }
        } catch (err) {
            console.error(err)
            setError("Failed to delete expense.")
        } finally {
            setDeleteLoading(false)
        }
    }

    // Step 3: User cancels → close modal, clear selection
    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
        setSelectedExpense(null)
    }

    // ── Edit Handler ─────────────────────────────────
    // Navigate to edit page, passing expense data as state (no prop drilling needed)
    const handleEditClick = (expense) => {
        navigate(`/edit-expense/${expense.expenseId}`, {
            state: { expense }   // ← expense data passed via router state
        })
    }

    return (
        <>
        <Breadcrumb title='All Expenses'/>
        <div className="card radius-12">
            <div className="card-body">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    {/* <h6 className="fw-bold text-lilac-600 mb-0">All Expenses</h6> */}
                    <small className="text-muted">Total: {totalElements} records</small>
                </div>

                {/* Error */}
                {error && (
                    <div className="alert alert-danger py-2 text-center">{error}</div>
                )}

                {/* Table */}
                <div className="table-responsive">
                    <table className="table table-bordered table-hover text-sm align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th className="text-end">Amount (₹)</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Loading...
                                    </td>
                                </tr>
                            ) : expensesData.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted py-4">
                                        No expenses found.
                                    </td>
                                </tr>
                            ) : (
                                expensesData.map((expense, index) => (
                                    <tr key={expense.expenseId}>
                                        {/* Serial number continues across pages */}
                                        <td>{page * 2 + index + 1}</td>
                                        <td>{expense.date}</td>
                                        <td>
                                            <span className="badge bg-lilac-100 text-lilac-600 p-8">
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td className='desc-cell'>{expense.description || "—"}</td>
                                        <td className="text-end fw-semibold text-danger">
                                            ₹{expense.amount?.toLocaleString('en-IN')}
                                        </td>
                                        <td className="text-center">
                                            {/* Edit → navigates to EditExpense page */}
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => handleEditClick(expense)}
                                                title="Edit"
                                            >
                                                <i className="ri-edit-line" />
                                            </button>
                                            {/* Delete → opens confirmation modal */}
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDeleteClick(expense)}
                                                title="Delete"
                                            >
                                                <i className="ri-delete-bin-line" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                        {expensesData.length > 0 && !loading && (
                            <tfoot>
                                <tr className="table-light fw-bold">
                                    <td colSpan="5" className="text-end">Total Records:</td>
                                    <td className="text-center">{totalElements}</td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <small className="text-muted">
                            Page {page + 1} of {totalPages}
                        </small>
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                disabled={!previousPage || loading}
                                onClick={() => setPage((prev) => prev - 1)}
                            >
                                ← Previous
                            </button>
                            <button
                                className="btn btn-sm btn-lilac-600"
                                disabled={!nextPage || loading}
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Delete Confirmation Modal ──────────────────── */}
            {/*
                React Bootstrap Modal
                show     → controls visibility
                onHide   → called when backdrop clicked or Esc pressed
                centered → vertically centers the modal
            */}
            <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger fw-normal ">
                        <i className="ri-delete-bin-line me-2" />
                        Delete Expense
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedExpense && (
                        <>
                            <p className="mb-3">Are you sure you want to delete this expense?</p>
                            {/* Show summary of what's being deleted */}
                            <div className="bg-light rounded p-3">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-muted">Category:</span>
                                    <span className="fw-semibold">{selectedExpense.category}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-muted">Amount:</span>
                                    <span className="fw-semibold text-danger">
                                        ₹{selectedExpense.amount?.toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Date:</span>
                                    <span className="fw-semibold">{selectedExpense.date}</span>
                                </div>
                            </div>
                            <small className="text-danger mt-2 d-block">
                                This action cannot be undone.
                            </small>
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    {/* Cancel → closes modal */}
                    <Button variant="secondary" onClick={handleDeleteCancel} disabled={deleteLoading}>
                        Cancel
                    </Button>
                    {/* Confirm → calls delete API */}
                    <Button variant="danger" onClick={handleDeleteConfirm} disabled={deleteLoading}>
                        {deleteLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Deleting...
                            </>
                        ) : "Yes, Delete"}
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
        </>
    )
}

export default AllExpenses
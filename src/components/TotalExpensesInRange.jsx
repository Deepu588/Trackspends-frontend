import React, { useState, useEffect, useCallback } from 'react'
import { GET_ALL_EXPENSES_WITHIN_RANGE } from '../api-routes'
import api from '../Api'
import { formatDate, getDateRange } from '../helper/DateFormatter'
import Breadcrumb from './child/BreadCrumb'

const TotalExpensesInRange = () => {
    const { startDate: defaultStart, endDate: defaultEnd } = getDateRange(7);

    const [loading, setLoading] = useState(false)
    const [totalElements, setTotalElements] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(0)
    const [nextPage, setNextPage] = useState(null)      // ← full URL from response
    const [previousPage, setPreviousPage] = useState(null)  // ← full URL from response
    const [expensesData, setExpensesData] = useState([])
    const [startDate, setStartDate] = useState(defaultStart)
    const [endDate, setEndDate] = useState(defaultEnd)
    const [searchDates, setSearchDates] = useState({ start: defaultStart, end: defaultEnd })
    const [error, setError] = useState("")

    const getExpensesWithInRange = useCallback(async () => {
        try {
            setLoading(true)
            setError("")
            const res = await api.get(GET_ALL_EXPENSES_WITHIN_RANGE, {
                params: {
                    startDate: searchDates.start,
                    endDate: searchDates.end,
                    page: page
                }
            });
            if (res.status === 200) {
                setTotalElements(res.data.totalElements)
                setTotalPages(res.data.totalPages)
                setNextPage(res.data.nextPage)          // ← full URL or null
                setPreviousPage(res.data.previousPage)  // ← full URL or null
                setExpensesData(res.data.data)
            }
        } catch (error) {
            console.log(error)
            setError("Failed to fetch expenses. Please try again.")
        } finally {
            setLoading(false)
        }
    }, [page, searchDates])

    useEffect(() => {
        getExpensesWithInRange()
    }, [getExpensesWithInRange])

    const handleSearch = () => {
        if (!startDate || !endDate) {
            setError("Please select both dates.")
            return
        }
        if (startDate > endDate) {
            setError("Start date cannot be after end date.")
            return
        }
        setPage(0)
        setSearchDates({ start: startDate, end: endDate })
    }

    return (
        <>
        <Breadcrumb title='Total Expenses'/>
        <div className="card radius-12">
            <div className="card-body">

                {/* Title */}
                {/* <h6 className="fw-bold text-lilac-600 mb-4">Expenses In Range</h6> */}

                {/* Date Filter */}
                <div className="row g-3 align-items-end mb-4">
                    <div className="col-md-4">
                        <label className="form-label fw-semibold">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            max={endDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-semibold">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            min={startDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <button
                            className="btn btn-lilac-600 w-100"
                            onClick={handleSearch}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                                    Fetching...
                                </>
                            ) : "Search"}
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="alert alert-danger py-2 text-center">{error}</div>
                )}

                {/* Table */}
                <div className="table-responsive mt-24 ">
                    <table className="table table-bordered table-hover text-sm radius-4">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th className="text-end">Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Loading...
                                    </td>
                                </tr>
                            ) : expensesData.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted py-4">
                                        No expenses found for the selected range.
                                    </td>
                                </tr>
                            ) : (
                                expensesData.map((expense, index) => (
                                    <tr key={expense.expenseId}>
                                        <td>{page * 2 + index + 1}</td>
                                        {/* ↑ page * 2 because your page size is 2 */}
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
                                    </tr>
                                ))
                            )}
                        </tbody>

                        {expensesData.length > 0 && (
                            <tfoot>
                                <tr className="table-light fw-bold">
                                    <td colSpan="4" className="text-end">Total Records:</td>
                                    <td className="text-end">{totalElements}</td>
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
                                disabled={!previousPage || loading}  // ← null = disabled
                                onClick={() => setPage((prev) => prev - 1)}
                            >
                                ← Previous
                            </button>
                            <button
                                className="btn btn-sm btn-lilac-600"
                                disabled={!nextPage || loading}      // ← null = disabled
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div></>
    )
}

export default TotalExpensesInRange;
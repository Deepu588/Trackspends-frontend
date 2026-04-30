import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";
import { EMAIL_VERIFICATION } from "../api-routes";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const hasCalled = useRef(false);

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const verifyToken = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing token.");
        return;
      }

      const baseURL = process.env.REACT_APP_API_URL;

      if (!baseURL) {
        setStatus("error");
        setMessage("Server configuration error.");
        return;
      }

      try {
        const response = await axios.get(
          `${baseURL}${EMAIL_VERIFICATION}?token=${token}`
        );
        setStatus("success");
        setMessage(response?.data?.message || "Email verified successfully!");
      } catch (error) {
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "Verification failed. Please try again."
        );
      }
    };

    verifyToken();
  }, [token]);

  useEffect(() => {
    let timer;
    if (status === "success") {
      timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [status, navigate]);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-neutral-100">
      <div className="col-xxl-5 col-sm-8">
        <div className="card radius-18 shadow-lg">
          <div className="card-body p-14 text-center bg-gradient-purple">

            {/* Icon */}
            <div className="mb-3">
              {status === "loading" && (
                <Icon
                  icon="ic:outline-email"
                  style={{ fontSize: "48px", color: "#6c63ff" }}
                />
              )}
              {status === "success" && (
                <Icon
                  icon="ic:round-check-circle"
                  style={{ fontSize: "48px", color: "#28a745" }}
                />
              )}
              {status === "error" && (
                <Icon
                  icon="ic:round-error"
                  style={{ fontSize: "48px", color: "#dc3545" }}
                />
              )}
            </div>

            {/* Title */}
            <h5 className="mb-3">Email Verification</h5>

            {/* Status Messages */}
            {status === "loading" && (
              <div>
                <div
                  className="spinner-border text-primary mb-3"
                  role="status"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mb-0">Verifying your email...</p>
              </div>
            )}

            {status === "success" && (
              <div>
                <p className="text-success fw-semibold mb-1">{message}</p>
                <small className="text-muted">
                  Redirecting to login in 3 seconds...
                </small>
              </div>
            )}

            {status === "error" && (
              <div>
                <p className="text-danger fw-semibold mb-3">{message}</p>
               
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";

const HotelError = ({
  title = "Something went wrong",
  message = "We are unable to complete your request right now.",
  retry = null,
}) => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlMessage = searchParams.get("msg");

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fa",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "420px",
          background: "#fff",
          borderRadius: "12px",
          padding: "32px 28px",
          boxShadow: "0px 5px 18px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <TbFaceIdError size={60} color="#e63946" style={{ marginBottom: 15 }} />

        <h2 style={{ marginBottom: 10, color: "#222" }}>{title}</h2>

        <p style={{ marginBottom: 25, color: "#555", fontSize: "15px" }}>
          {urlMessage ? urlMessage.replace("_", " ") : message}
        </p>

        {retry && (
          <button
            onClick={retry}
            style={{
              width: "100%",
              background: "#1e88e5",
              color: "#fff",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontSize: "15px",
              cursor: "pointer",
              marginBottom: "12px",
            }}
          >
            Try Again
          </button>
        )}

        <button
          onClick={() => navigate("/hotel")}
          style={{
            width: "100%",
            background: "#e0e0e0",
            color: "#333",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Go to Hotels
        </button>
      </div>
    </div>
  );
};

export default HotelError;
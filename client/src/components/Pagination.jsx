import React from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

const Pagination = ({ setPage, pagination }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, hasPrevPage, hasNextPage } = pagination;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        marginTop: "20px",
        padding: "10px",
      }}
    >
      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={!hasPrevPage}
        style={{
          padding: "8px 16px",
          backgroundColor: hasPrevPage
            ? "var(---component-color)"
            : "var(---secondary-color)",
          color: hasPrevPage ? "#fff" : "var(---support-text)",
          border: "none",
          borderRadius: "8px",
          cursor: hasPrevPage ? "pointer" : "not-allowed",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          transition: "opacity 0.2s",
        }}
      >
        <TbChevronLeft /> Prev
      </button>

      <span
        style={{
          color: "var(---heading-text-color)",
          fontSize: "var(---font-sm)",
          fontWeight: "500",
        }}
      >
        Page <span style={{ color: "var(---component-color)" }}>{page}</span> of{" "}
        {totalPages}
      </span>

      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={!hasNextPage}
        style={{
          padding: "8px 16px",
          backgroundColor: hasNextPage
            ? "var(---component-color)"
            : "var(---secondary-color)",
          color: hasNextPage ? "#fff" : "var(---support-text)",
          border: "none",
          borderRadius: "8px",
          cursor: hasNextPage ? "pointer" : "not-allowed",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          transition: "opacity 0.2s",
        }}
      >
        Next <TbChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
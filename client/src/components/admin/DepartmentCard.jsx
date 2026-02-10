import React from "react";
import { TbPencil, TbToggleLeftFilled, TbToggleRightFilled, TbUsers } from "react-icons/tb";

const DepartmentCard = ({ department, onEdit, onDelete }) => {
    return (
        <div className="department-card background">
            <div className="card-header">
                <h3>{department.name}</h3>
                <div className="card-actions">
                    <button
                        className="action-btn edit-btn"
                        onClick={() => onEdit(true, department)}
                        title="Edit"
                    >
                        <TbPencil />
                    </button>
                    <button
                        className={`action-btn delete-btn ${department.isActive ? 'active' : 'inactive'}`}
                        onClick={() => onDelete(department._id)}
                        title={department.isActive ? "Deactivate" : "Activate"}
                    >
                        {department.isActive ? (
                            <TbToggleLeftFilled />
                        ) : (
                            <TbToggleRightFilled />
                        )}
                    </button>
                </div>
            </div>

            <div className="card-body">
                <p className="description">{department.description}</p>
            </div>

            <div className="card-footer">
                <div className="stat-item">
                    <TbUsers />
                    <span>{department.members?.length || 0} Members</span>
                </div>
                <span className={`status-badge ${department.isActive ? 'active' : 'inactive'}`}>
                    {department.isActive ? "Active" : "Inactive"}
                </span>
            </div>
        </div>
    );
};

export default DepartmentCard;

import React from "react";
import { TbPencil, TbToggleLeftFilled, TbToggleRightFilled, TbMapPin } from "react-icons/tb";

const PlaceCard = ({ place, onEdit, onDelete }) => {
    return (
        <div className="department-card background">
            <div className="card-header">
                <h3>{place.name}</h3>
                <div className="card-actions">
                    <button
                        className="action-btn edit-btn"
                        onClick={() => onEdit(true, place)}
                        title="Edit"
                    >
                        <TbPencil />
                    </button>
                    <button
                        className={`action-btn delete-btn ${place.isActive ? 'active' : 'inactive'}`}
                        onClick={() => onDelete(place._id)}
                        title={place.isActive ? "Deactivate" : "Activate"}
                    >
                        {place.isActive ? (
                            <TbToggleLeftFilled />
                        ) : (
                            <TbToggleRightFilled />
                        )}
                    </button>
                </div>
            </div>

            <div className="card-body">
                <div className="stat-item" style={{ marginTop: '10px', color: 'var(---support-text)' }}>
                    <TbMapPin size={20} />
                    <span>ID: {place._id}</span>
                </div>
            </div>

            <div className="card-footer">
                <span className={`status-badge ${place.isActive ? 'active' : 'inactive'}`}>
                    {place.isActive ? "Active" : "Inactive"}
                </span>
            </div>
        </div>
    );
};

export default PlaceCard;

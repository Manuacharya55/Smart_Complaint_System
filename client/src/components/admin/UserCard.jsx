import React from "react";
import {
    TbPencil,
    TbToggleLeftFilled,
    TbToggleRightFilled,
    TbUser,
    TbMail,
    TbPhone,
    TbBuildingSkyscraper
} from "react-icons/tb";

const UserCard = ({ user, onEdit, onDelete }) => {
    return (
        <div className="department-card background">
            <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(---component-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000',
                        fontWeight: 'bold'
                    }}>
                        {user.fullname?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.1rem' }}>{user.fullname}</h3>
                        <span style={{ fontSize: '0.8rem', color: 'var(---support-text)' }}>{user.role}</span>
                    </div>
                </div>

                <div className="card-actions">
                    <button
                        className="action-btn edit-btn"
                        onClick={() => onEdit(true, user)}
                        title="Edit"
                    >
                        <TbPencil />
                    </button>
                    <button
                        className={`action-btn delete-btn ${user.isActive ? 'active' : 'inactive'}`}
                        onClick={() => onDelete(user._id)}
                        title={user.isActive ? "Deactivate" : "Activate"}
                    >
                        {user.isActive ? (
                            <TbToggleLeftFilled />
                        ) : (
                            <TbToggleRightFilled />
                        )}
                    </button>
                </div>
            </div>

            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                <div className="stat-item" style={{ color: 'var(---support-text)' }}>
                    <TbMail />
                    <span>{user.email}</span>
                </div>
                <div className="stat-item" style={{ color: 'var(---support-text)' }}>
                    <TbPhone />
                    <span>{user.phone}</span>
                </div>
                <div className="stat-item" style={{ color: 'var(---support-text)' }}>
                    <TbBuildingSkyscraper />
                    <span>{user.department?.name || "Public"}</span>
                </div>
            </div>

            <div className="card-footer">
                <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? "Active" : "Inactive"}
                </span>
            </div>
        </div>
    );
};

export default UserCard;

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/UserContext";
import PlaceCard from "../../components/admin/PlaceCard";
import { TbPlus } from "react-icons/tb";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import usePlace from "../../hooks/usePlace";
import "../../styles/department.css";

const Place = () => {
  const { user } = useAuth();
  const {
    places,
    isLoading,
    pagination,
    fetchPlaces,
    addPlace,
    updatePlace,
    deletePlace,
  } = usePlace();

  const [data, setData] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const openModal = (editMode = false, item = null) => {
    setIsEditing(editMode);
    if (editMode && item) {
      setData(item.name);
      setId(item._id);
    } else {
      setData("");
      setId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setData("");
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);

    let success = false;
    if (isEditing) {
      success = await updatePlace(id, { name: data });
    } else {
      success = await addPlace({ name: data });
    }

    if (success) {
      closeModal();
    }
    setIsClicked(false);
  };

  useEffect(() => {
    if (user?.token) {
      fetchPlaces(page);
    }
  }, [user?.token, page, fetchPlaces]);

  return isLoading ? (
    <Loader />
  ) : (
    <div id="container">
      <div className="flex justify-between items-center mb-6 px-4">
        <h1 id="title" style={{ marginBottom: 0, textAlign: "left" }}>
          Places
        </h1>
        <button
          onClick={() => openModal(false)}
          style={{
            marginLeft: "auto",
          }}
        >
          <TbPlus /> Add Place
        </button>
      </div>

      <div className="card-grid">
        {places.map((place) => (
          <PlaceCard
            key={place._id}
            place={place}
            onEdit={openModal}
            onDelete={deletePlace}
          />
        ))}
      </div>

      <Pagination setPage={setPage} page={page} pagination={pagination} />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditing ? "Edit Place" : "Add Place"}
      >
        <div id="add-department" style={{ padding: 0, marginBottom: 0 }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label htmlFor="name" style={{ color: "var(---support-text)" }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={data}
                onChange={handleChange}
                placeholder="Enter Place Name"
                required
              />
            </div>
            <button disabled={isClicked} type="submit">
              {isClicked ? "Processing..." : isEditing ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Place;

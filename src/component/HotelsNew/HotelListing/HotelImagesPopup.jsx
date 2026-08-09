import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./HotelImagesPopup.css";

const HotelImagesGallery = ({ show, onClose, images = [], name }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (show) setCurrent(0);
  }, [show]);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const jumpToImage = (index) => {
    setCurrent(index);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered className="image-modal">
      <div className="modal-content">

        {/* HEADER */}
        <div className="image-modal-header modal-header">
          <div className="image-modal-title modal-title h4">{name}</div>

          <div className="image-modal-header-buttons">
            <button className="image-modal-download-btn btn btn-link" title="Download image"
              onClick={() => window.open(images[current], "_blank")}>
              ⬇
            </button>

            <button className="image-modal-fullscreen-btn btn btn-link" title="Fullscreen"
              onClick={() => document.querySelector(".image-modal-main-image")?.requestFullscreen()}>
              ⛶
            </button>

            <button className="image-modal-close-btn btn btn-link" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="image-modal-body modal-body">

          <div className="image-modal-main">

            {/* PREVIOUS BUTTON */}
            <button className="image-modal-nav-btn image-modal-prev-btn btn btn-link"
              onClick={prevImage}>
              ←
            </button>

            {/* MAIN IMAGE */}
            <div className="image-modal-image-container">
              <img
                src={images[current]}
                alt={`${name} - Image`}
                className="image-modal-main-image"
              />

              <div className="image-modal-counter">
                {current + 1} / {images.length}
              </div>
            </div>

            {/* NEXT BUTTON */}
            <button className="image-modal-nav-btn image-modal-next-btn btn btn-link"
              onClick={nextImage}>
              →
            </button>

          </div>

          {/* PROGRESS BAR */}
          <div className="image-modal-progress">
            <div
              className="image-modal-progress-bar"
              style={{ width: `${((current + 1) / images.length) * 100}%` }}
            />
          </div>

          {/* THUMBNAILS */}
          <div className="image-modal-thumbnails">
            {images.map((img, index) => (
              <div
                key={index}
                className={`image-modal-thumbnail ${current === index ? "active" : ""}`}
                onClick={() => jumpToImage(index)}
              >
                <img src={img} className="image-modal-thumbnail-img" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default HotelImagesGallery;

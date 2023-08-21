import { useState } from "react";

export default function CarCard({ car, handleGoToDetail }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    handleGoToDetail(car.id);
  };
    return (
      <div
      className={`card w-96 bg-base-100 shadow-xl mx-5 my-3 ${
        isHovered ? "transform scale-110" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <figure className="px-10 pt-10">
        <img src={car.carPicture} alt="Car" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{car.carName}</h2>
        <span className=" text-red-600 font-semibold my-7">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(car.price)}
        </span>
      </div>
    </div>
    );
  }
  
export default function CarCard({ car, handleGoToDetail }) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl mx-5 my-3">
        <figure className="px-10 pt-10">
          <img
            src={car.carPicture}
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{car.carName}</h2>
          <span className=" text-red-600 font-semibold my-7">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(car.price)}
          </span>
          <div className="card-actions">
            <a
              className="btn"
              onClick={() => handleGoToDetail(car.id)}>
              Details
            </a>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    );
  }
  
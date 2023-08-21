import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { formattedDate, formattedDateInput } from "../helper";
import { addCar, fetchOneCars } from "../store/actions/carAction";

export default function Form() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.userReducer);

  let [input, setInput] = useState({
    carName: "",
    description: "",
    price: "",
    address: "",
    mileage: "",
    carPicture: "",
    promotionEndDate: "",
  });

  const handleChange = (ev) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value,
    });
  };

  useEffect(() => {
    if(!isLogin){
      navigate("/login")
    }
    //fetch data ONE CAR
    if (type === "edit") {
      dispatch(fetchOneCars(id))
        .then((data) => {
          const {
            carName,
            description,
            price,
            address,
            mileage,
            carPicture,
            promotionEndDate,
          } = data;
          const formatDate = formattedDate(promotionEndDate);

          setInput({
            carName,
            description,
            price,
            carPicture,
            address,
            mileage,
            promotionEndDate: formatDate,
          });
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        })
        .finally(() => {
        });
    }
  }, []);

  useEffect(() => {
    if (type === "create") {
      setInput({
        carName: "",
        description: "",
        price: "",
        address: "",
        mileage: "",
        carPicture: "",
        promotionEndDate: new Date(),
      });
    }
  }, [type]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    Swal.fire({
      html: "Please wait...",
      timer: 0,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setInput({
      ...input,
      promotionEndDate: formattedDateInput(input.promotionEndDate),
    });
    dispatch(addCar(input))
      .then((data) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Success add ${data.carName}`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        return error;
      })
      .then((data) => {
        if (data) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${data.message}`,
            confirmButtonText: "Try again",
          });
        }
      })
      .finally(() => {
        navigate("/my-cars");
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form
          className="card-body"
          onSubmit={handleSubmit}>
          <h1>{type === "create" ? "ADD" : "EDIT"} CAR</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Car Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              value={input.carName}
              onChange={handleChange}
              name="carName"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered"
              value={input.price}
              onChange={handleChange}
              name="price"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="address"
              className="input input-bordered"
              value={input.address}
              onChange={handleChange}
              name="address"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Mileage</span>
            </label>
            <input
              type="text"
              placeholder="mileage"
              className="input input-bordered"
              value={input.mileage}
              onChange={handleChange}
              name="mileage"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Car Picture</span>
            </label>
            <input
              type="text"
              placeholder="Car Picture"
              className="input input-bordered"
              value={input.carPicture}
              onChange={handleChange}
              name="carPicture"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Description"
              className="input input-bordered"
              value={input.description}
              onChange={handleChange}
              name="description"
              rows="4" // Jumlah baris tampilan textarea
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Set Promotion Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered"
              value={input.promotionEndDate}
              onChange={handleChange}
              name="promotionEndDate"
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-info">
              {type === "create" ? "ADD" : "EDIT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

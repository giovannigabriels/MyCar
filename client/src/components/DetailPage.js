import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMyCar,
  fetchMyCars,
  fetchOneCars,
} from "../store/actions/carAction";
import Swal from "sweetalert2";
import {
  addCarComment,
  fetchCarComment,
} from "../store/actions/carCommentAction";
import BubbleComment from "./BubbleComment";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.userReducer);
  const [comments, setComments] = useState([]);

  let [loading, setLoading] = useState(true);
  let [twoButton, setThreeButton] = useState(false);
  let [inputComment, setInputComment] = useState({
    text: "",
    carId: id,
  });
  let [input, setInput] = useState({
    name: "",
    price: "",
    imgUrl: "",
    author: "",
    description: "",
  });
  const handleSubmitComment = (ev) => {
    ev.preventDefault();
    const names = localStorage.getItem("name");
    socket.emit("comment", {
      text: inputComment.text,
      carId: id,
      User: { name: names },
      createdAt: new Date(),
    });
    dispatch(addCarComment(inputComment));
    setInputComment({
      text: "",
      carId: id,
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: `Are you sure you want to delete ${input.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          html: "Please wait...",
          timer: 0,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        dispatch(deleteMyCar(id))
          .then(() => {
            Swal.fire({
              position: "top",
              icon: "success",
              title: `Delete ${input.name} Success!`,
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch(fetchMyCars());
            navigate("/my-cars");
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
          });
      }
    });
  };

  const handleChange = (ev) => {
    setInputComment({
      ...inputComment,
      [ev.target.name]: ev.target.value,
    });
  };
  useEffect(() => {
    //fetch data ONE CAR
    dispatch(fetchOneCars(id))
      .then((data) => {
        console.log(
          data.User.id === +localStorage.id_user,
          data.User.id,
          localStorage.id_user
        );
        setInput({
          name: data.carName,
          price: data.price,
          imgUrl: data.carPicture,
          author: data.User.name,
          description: data.description,
        });
        if (data.User.id === +localStorage.id_user) {
          setThreeButton(true);
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });

    //fetch index CAR COMMENT
    dispatch(fetchCarComment(id))
      .then((data) => {
        setComments(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    socket.on("comment", (comment) => {
      if (comment.carId === id) {
        const allComment = [...comments, comment];
        setComments(allComment);
      }
    });
  }, [comments]);

  return (
    <div>
      <div className="bg-white">
        <p className="  font-bold text-2xl text-black text-center mt-20">
          {input.name}
        </p>
      </div>
      <div className="mx-96 my-10">
        {loading === false ? (
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className=" ml-5">
              <img
                src={input.imgUrl}
                alt="Album"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-red-600 font-semibold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(input.price)}
              </h2>
              <span>Description: {input.description}</span>
              <h2 className="font-bold">Author: {input.author}</h2>

              {twoButton === true ? (
                <div className="mt-4 flex justify-between">
                  <Link
                    to={`/my-cars/edit/${id}`}
                    className="btn btn-secondary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-error"
                    onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <progress className="progress w-96"></progress>
        )}
      </div>
      <div className="mx-96 my-10">
        {comments.map((data) => {
          return (
            <BubbleComment
              comment={data}
              key={data.id}
            />
          );
        })}
      </div>
      {isLogin ? (
        <div>
          <form
            onSubmit={handleSubmitComment}
            className="mx-96 my-10 flex flex-row">
            <div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs mt-5"
                value={inputComment.text}
                onChange={handleChange}
                name="text"
              />
            </div>

            <div className="form-control mx-5 my-5">
              <button className="btn btn-secondary">comments</button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneCars } from "../store/actions/carAction";
import { fetchCarComment } from "../store/actions/carCommentAction";
import BubbleComment from "./BubbleComment";

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { carComment } = useSelector((state) => state.carCommentReducer);
  let [loading, setLoading] = useState(true);
  let [input, setInput] = useState({
    name: "",
    price: "",
    imgUrl: "",
    author: "",
    description: ""
  });
  useEffect(() => {
    //fetch data
    dispatch(fetchOneCars(id))
      .then((data) => {
        setInput({
          name: data.carName,
          price: data.price,
          imgUrl: data.carPicture,
          author: data.User.name,
          description: data.description
        });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      })
      .finally(()=>{
        setLoading(false);
      })
      dispatch(fetchCarComment(id))
      .finally(()=>{
       setLoading(false)
       });
  }, []);
  return (
    <div>
      <div className="bg-yellow-500">
        <p className="  font-bold text-2xl text-white text-center">
          {input.name}
        </p>
      </div>
      <div className="mx-96 my-10">
        {
          loading === false ? (        
          <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure className=" ml-5">
            <img
              src={input.imgUrl}
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title  text-red-600 font-semibold">
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(input.price)}
            </h2>
            <span>Description : {input.description}</span>
            <h2 className=" font-bold">Author : {input.author}</h2>
            <div className="card-actions justify-end">
              <Link
                to={"/"}
                className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>) : (
        <progress className="progress w-96"></progress>
        )
        }
      </div>
      <div className="mx-96 my-10">
        {
          console.log(carComment,"ini carcomment")
        }
        {
          carComment.map((data)=>{
            return (
              <BubbleComment
              comment={data}
              key={data.id}
              />
            )
          })
        }

      </div>
    </div>
  );
}

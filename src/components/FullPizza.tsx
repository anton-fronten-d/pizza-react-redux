import React from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://67c336a41851890165ae7a86.mockapi.io/items/${id}`
        );
        setData(data);
      } catch (err) {
        console.log(err);
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!data) {
    return (
      <div className="container">
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={data.imageUrl} alt="Pizza.png" />
      <h2>{data.title}</h2>
      <p></p>
      <h4>{data.price}</h4>
      <Link to={"/"}>
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};
export default FullPizza;

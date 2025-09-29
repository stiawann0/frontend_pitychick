import { useEffect, useState } from "react";
import api from "../api/axios"; // Instance axios
import DishesCard from "../layouts/DishesCard";

export default function Dishes() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    api.get("/api/menus")
      .then((response) => {
        setMenus(response.data.data || []);
      })
      .catch((error) => {
        console.error("Gagal mengambil data menu:", error);
      });
  }, []);

  const categories = [
    { key: "original", title: "ORIGINAL" },
    { key: "tambahan", title: "ADD" },
    { key: "snack", title: "SNACK" },
    { key: "minuman", title: "DRINK" },
  ];

  return (
    <div
      id="dishes"
      className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5"
    >
      {categories.map(({ key, title }) => (
        <div key={key}>
          <h1
            id={`dishes-${key}`}
            className="text-4xl font-semibold text-center pt-24 pb-10"
          >
            {title}
          </h1>
          <div className="flex flex-wrap gap-8 justify-center">
            {menus
              .filter((menu) => menu.category === key)
              .map((menu, index) => (
                <DishesCard
                  key={menu.id}
                  image={menu.image}
                  title={menu.name}
                  description={menu.description}
                  price={`Rp.${parseInt(menu.price).toLocaleString("id-ID")}`}
                  index={index}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

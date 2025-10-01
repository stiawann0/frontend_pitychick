import { useEffect, useState } from "react";
import apiService from "../services/apiService"; // Gunakan apiService, bukan api langsung
import DishesCard from "../layouts/DishesCard";

export default function Dishes() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getMenus()
      .then((menusData) => {
        setMenus(menusData);
      })
      .catch((error) => {
        console.error("Gagal mengambil data menu:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = [
    { key: "original", title: "ORIGINAL" },
    { key: "tambahan", title: "ADD" },
    { key: "snack", title: "SNACK" },
    { key: "minuman", title: "DRINK" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menus...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="dishes"
      className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5"
    >
      {categories.map(({ key, title }) => {
        const categoryMenus = menus.filter((menu) => menu.category === key);
        
        if (categoryMenus.length === 0) return null;

        return (
          <div key={key}>
            <h1
              id={`dishes-${key}`}
              className="text-4xl font-semibold text-center pt-24 pb-10"
            >
              {title}
            </h1>
            <div className="flex flex-wrap gap-8 justify-center">
              {categoryMenus.map((menu, index) => (
                <DishesCard
                  key={menu.id}
                  image={menu.image_url} // Gunakan image_url yang sudah full URL
                  title={menu.name}
                  description={menu.description}
                  price={`Rp.${parseInt(menu.price).toLocaleString("id-ID")}`}
                  index={index}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
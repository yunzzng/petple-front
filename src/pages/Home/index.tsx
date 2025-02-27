import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import carouselData from "@/consts/mainBannerData";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import menuList from "@/consts/menuList";
import pettalkBanner from "/images/pettalkBanner.png";
import Menu from "@/components/Menu";
import PopularPosts from "./components/PopularPosts";
import { Loading } from "@/components";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homewrapper}>
      <div className={styles.container}>
        <Carousel>
          <Carousel.ItemList>
            {carouselData.map((banner, index) => (
              <Carousel.Item key={banner.id} index={index}>
                <div
                  className={`${styles.banner} ${
                    index % 2 === 0 ? styles.bannerLeft : styles.bannerRight
                  }`}
                  style={{ backgroundColor: banner.backgroundColor }}
                >
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className={styles.bannerImage}
                  />
                  <div className={styles.bannerText}>
                    <span className={styles.highlight}>{banner.highlight}</span>
                    <h2>{banner.title}</h2>

                    <p>{banner.description}</p>
                    {index !== 0 && (
                      <Button
                        label={banner.linkText}
                        onClick={() => navigate(banner.link)}
                        className={styles.linkBtn}
                      />
                    )}
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel.ItemList>
          <Carousel.Navigator />
          <Carousel.Indicator />
        </Carousel>

        <Menu menuList={menuList} className={styles.homeMenu} />

        <div className={styles.postSection}>
          <div
            className={styles.postText}
            style={{ backgroundImage: `url(${pettalkBanner})` }}
            onClick={() => navigate("/community")}
          ></div>
          <div className={styles.postsWrapper}>
            <div className={styles.postsContainer}>
              <Suspense fallback={<Loading />}>
                <PopularPosts />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

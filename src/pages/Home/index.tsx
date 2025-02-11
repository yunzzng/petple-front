import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import carouselData from "@/consts/mainBannerData";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import menuList, { MenuItem } from "@/consts/menuList";
import pettalkBanner from "/images/pettalkBanner.png";

interface Post {}

const Home = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <>
      <Header />
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
                    <h2>
                      <span className={styles.highlight}>
                        {banner.highlight}
                      </span>
                      {banner.title}
                    </h2>
                    <p>{banner.description}</p>
                    {index !== 0 && (
                      <Button
                        label={banner.linkText}
                        onClick={() => navigate(banner.link)}
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

        <div className={styles.petMenuSection}>
          <div className={styles.menuContainer}>
            {menuList.map((item: MenuItem) => (
              <a key={item.id} href={item.link} className={styles.menuItem}>
                <img src={item.image} alt={item.label} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.postSection}>
          <div
            className={styles.postText}
            style={{ backgroundImage: `url(${pettalkBanner})` }}
          ></div>
          <div className={styles.postsWrapper}>
            <div className={styles.postsContainer}>{/* 게시글 부분 */}</div>
          </div>
          <div className={styles.postsButton}>
            <Button
              label="펫톡 이야기 보러 가기"
              onClick={() => navigate("/community")}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

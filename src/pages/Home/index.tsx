import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import carouselData from "@/consts/mainBannerData";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";

interface Post {}

const Home = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <>
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

        {/* <div className={styles.postSection}>
        <h2>
          반려인들의 커뮤니티, <span className={styles.highlight}>펫톡!</span>
        </h2>
        {posts?.length ? (
          <div></div>
        ) : (
          <p className={styles.noPosts}>게시글이 없습니다.</p>
        )}
        <Button
          label="펫톡 이야기 보러 가기"
          onClick={() => navigate("/community")}
        />
      </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import carouselData from "@/consts/mainBannerData";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import menuList, { MenuItem } from "@/consts/menuList";

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
          <h2>
            반려인들의 커뮤니티, <span className={styles.highlight}>펫톡!</span>
          </h2>
          <p>
            반려동물을 키우는 사람들과 정보를 나누고 소통하는 공간!
            강아지ㆍ고양이 건강, 일상 이야기부터 추천 장소까지 궁금한 점을
            질문하고, 반려인들의 생생한 후기와 경험을 공유하며 더 행복한 반려
            생활을 만들어 보세요.
          </p>
          <div className={styles.postsWrapper}>
            <div className={styles.postsContainer}>
              {/* 게시글 부분 */}
            </div>
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

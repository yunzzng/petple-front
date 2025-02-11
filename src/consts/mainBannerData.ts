import banner1 from "/images/banner1.png";
import banner2 from "/images/banner2.png";
import banner3 from "/images/banner3.png";

const carouselData = [
  {
    id: 1,
    highlight: "",
    title: "우리 아이와 함께하는 삶,\n더 쉽고 편리하게! 🐾",
    description:
      "반려동물 병원 · 약국 위치 및 정보부터\n동반 가능 카페, 숙소, 서비스까지 한 눈에 확인하고,\n보호자들과 소통하는 커뮤니티까지",
    image: banner1,
    link: "/community",
    linkText: "커뮤니티 가기",
  },
  {
    id: 2,
    highlight: "펫메디 ",
    title: "우리 아이 건강을 위한 병원 & 약국찾기",
    description:
      "반려동물의 건강을 위해!\n펫메디에서 내 주변 동물병원과 약국 정보를\n지도에서 편리하게 확인하고, 위치와 운영시간까지\n한 번에 찾아보세요.",
    image: banner2,
    link: "/petmedi",
    linkText: "펫메디에서 병원 · 약국 찾기",
  },
  {
    id: 3,
    highlight: "펫플레이스 ",
    title: "반려동물과 함께할 수 있는 모든 곳",
    description:
      "반려동물과 함께 여행하고 싶다면?\n펫플레이스에서 애견 동반 가능한 관광지, 축제, 숙박, 식당,\n레저, 쇼핑 정보를 지도에서 쉽게 찾아보세요.\n\n특별한 순간을 만들고 잊지 못할 추억을 쌓아보세요!",
    image: banner3,
    link: "/petplace",
    linkText: "반려동물 핫플 둘러보기",
  },
];

export default carouselData; 
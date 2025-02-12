import banner1 from "/images/banner1.png";
import banner2 from "/images/banner2.png";
import banner3 from "/images/banner3.png";
import banner4 from "/images/banner4.png";

const carouselData = [
  {
    id: 0,
    highlight: "우리 아이와 함께하는 삶,\n더 쉽고 편리하게! 🐾",
    title: "",
    description:
      "반려동물 병원 · 약국 위치 및 정보부터 동반 가능 카페, 숙소, 서비스까지 한 눈에 확인하고,\n보호자들과 소통하는 커뮤니티까지",
    image: banner1,
    link: "",
    linkText: "",
    backgroundColor: "#F5EFEA", 
  },
  {
    id: 1,
    highlight: "펫메디 ",
    title: "우리 아이 건강을 위한 병원 & 약국찾기",
    description:
      "반려동물의 건강을 위해!\n펫메디에서 내 주변 동물병원과 약국 정보를 지도에서 \n편리하게 확인하고, 위치와 운영시간까지 한 번에 \n찾아보세요.",
    image: banner2,
    link: "/petmedi",
    linkText: "펫메디에서 병원 · 약국 찾기",
    backgroundColor: "#F4EEFF", 
  },
  {
    id: 2,
    highlight: "펫플레이스 ",
    title: "반려동물과 함께할 수 있는 모든 곳",
    description:
      "펫플레이스에서 애견 동반 가능한 관광지, 축제, 숙박, 식당, 레저, 쇼핑 정보를 지도에서 쉽게 찾아보세요.\n특별한 순간을 만들고 잊지 못할 추억을 쌓아보세요!",
    image: banner3,
    link: "/petplace",
    linkText: "반려동물 핫플 둘러보기",
    backgroundColor: "#DFE9F3", 
  },
  {
    id: 3,
    highlight: "펫퓨너럴",
    title: "반려동물과의 아름다운 이별을 준비하세요.",
    description:
      "무지개 다리를 건너는 반려동물을 위한 마지막 배웅. \n 펫 장례 절차부터 신뢰할 수 있는 장례업체까지, 필요한 모든 정보를 제공합니다.",
    image: banner4,
    link: "/petfuneral",
    linkText: "펫 장례 서비스 찾기",
    backgroundColor: "#FFEFD5", 
  },
];

export default carouselData; 
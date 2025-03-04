export const mapCurrentPathToMetaTagInfo: Record<
  string,
  { title: string; description: string }
> = {
  "/": {
    title: "PetPle | 반려인 커뮤니티",
    description:
      "반려동물 애호가들을 위한 커뮤니티, PetPle에서 정보 공유와 소통을 즐기세요.",
  },
  "/community": {
    title: "PetPle | 커뮤니티",
    description: "반려동물과 관련된 다양한 이야기를 나누고 정보를 공유하세요.",
  },
  "/community/create": {
    title: "PetPle | 글 작성",
    description: "커뮤니티에 새로운 글을 작성하고 반려인들과 소통해보세요.",
  },
  "/login": {
    title: "PetPle | 로그인",
    description: "PetPle 계정으로 로그인하고 더 많은 기능을 이용하세요.",
  },
  "/petmedi": {
    title: "PetPle | 반려동물 의료",
    description: "반려동물 건강과 관련된 정보를 확인하세요.",
  },
  "/petplace": {
    title: "PetPle | 반려동물 장소",
    description: "반려동물과 함께 방문할 수 있는 장소를 찾아보세요.",
  },
  "/petfuneral": {
    title: "PetPle | 반려동물 장례",
    description: "반려동물 장례 관련 정보를 제공하는 페이지입니다.",
  },
  "/petfood": {
    title: "PetPle | 반려동물 음식",
    description: "반려동물에게 적합한 음식을 확인하세요.",
  },
  "/petwalk": {
    title: "PetPle | 반려동물 산책",
    description: "반려동물과 함께 산책할 수 있는 장소와 팁을 확인하세요.",
  },
  "/petwalk/detail": {
    title: "PetPle | 산책 상세",
    description: "반려동물 산책 기록에 대한 상세 정보를 확인하세요.",
  },
  "/profile": {
    title: "PetPle | 프로필",
    description: "내 프로필을 확인하고 수정하세요.",
  },
  "/profile/:nickname": {
    title: "PetPle | 선택한 유저 프로필",
    description: "다른 유저의 프로필을 확인해보세요.",
  },
  "/createpet": {
    title: "PetPle | 반려동물 프로필 생성",
    description: "반려동물의 프로필을 생성하고 관리하세요.",
  },
  "/petfriends": {
    title: "PetPle | 반려동물 친구",
    description: "반려동물 친구를 찾고 교류하세요.",
  },
  "/roulette": {
    title: "PetPle | 룰렛 게임",
    description: "반려동물 랜덤 네이밍 룰렛 게임을 즐겨보세요.",
  },
  "/menu": {
    title: "PetPle | 메뉴",
    description: "PetPle의 다양한 기능을 확인할 수 있는 메뉴 페이지입니다.",
  },
  "*": {
    title: "PetPle | 페이지를 찾을 수 없습니다",
    description: "요청하신 페이지를 찾을 수 없습니다.",
  },
};

export const dynamicPaths = [
  "/community/post/:id",
  "/community/update/:id",
  "/chat/:nickname",
  "profile/:nickname",
];

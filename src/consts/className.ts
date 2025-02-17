const prefixCls = "petple";
export const getBaseCls = (suffix: string) => {
    return `${prefixCls}-${suffix}`;
};

// Button Component
export const buttonBaseCls= getBaseCls("button");

// Carousel Component
export const carouselBaseCls= getBaseCls("carousel");
export const carouselItemListBaseCls = getBaseCls("carousel-item-list");
export const carouselItemBaseCls = getBaseCls("carousel-item");
export const carouselNavigatorBaseCls = getBaseCls("carousel-navigator");
export const carouselIndicatorBaseCls = getBaseCls("carousel-indicator");

// Iput Component
export const inputBaseCls= getBaseCls("input");
export const inputBoxBaseCls = getBaseCls("input-box");
export const inputLabelBaseCls = getBaseCls("input-label");

// Search Component
export const searchBaseCls= getBaseCls("search");

// Menu Component
export const menuBaseCls= getBaseCls("menu");

// Region Component
export const regionBaseCls= getBaseCls("region");
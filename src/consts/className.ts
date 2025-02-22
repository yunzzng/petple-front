const prefixCls = "petple";
export const getBaseCls = (suffix: string) => {
  return `${prefixCls}-${suffix}`;
};

// Button Component
export const buttonBaseCls = getBaseCls("button");

// Carousel Component
export const carouselBaseCls = getBaseCls("carousel");
export const carouselItemListBaseCls = getBaseCls("carousel-item-list");
export const carouselItemBaseCls = getBaseCls("carousel-item");
export const carouselNavigatorBaseCls = getBaseCls("carousel-navigator");
export const carouselIndicatorBaseCls = getBaseCls("carousel-indicator");

// Iput Component
export const inputBaseCls = getBaseCls("input");
export const inputBoxBaseCls = getBaseCls("input-box");
export const inputLabelBaseCls = getBaseCls("input-label");

// Search Component
export const searchBaseCls = getBaseCls("search");

// Menu Component
export const menuBaseCls = getBaseCls("menu");

// Region Component
export const regionBaseCls = getBaseCls("region");

/* Tabs Component */
export const tabsBaseCls = getBaseCls("tabs");
export const tabsMenuListBaseCls = getBaseCls("tabs-menu-list");
export const tabsMenuBaseCls = getBaseCls("tabs-menu");
export const tabsPannelBaseCls = getBaseCls("tabs-pannel");

/* Modal */
export const ModalBaseCls = getBaseCls("modal");
export const ModalBackdropBaseCls = getBaseCls("modal-backdrop");
export const ModalContentBaseCls = getBaseCls("modal-content");
export const ModalTriggerBaseCls = getBaseCls("modal-trigger");
export const ModalCloseBaseCls = getBaseCls("modal-close");

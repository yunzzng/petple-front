const prefixCls = "petple";
export const getBaseCls = (suffix: string) => {
    return `${prefixCls}-${suffix}`;
};

// Button Component
export const buttonBaseCls= getBaseCls("button");

// Iput Component
export const inputBaseCls= getBaseCls("input");
export const inputBoxBaseCls = getBaseCls("input-box");
export const inputLabelBaseCls = getBaseCls("input-label");

// Search Component
export const searchBaseCls= getBaseCls("search");

// Menu Component
export const menuBaseCls= getBaseCls("menu");
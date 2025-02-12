const prefixCls = "petple";
export const getBaseCls = (suffix: string) => {
    return `${prefixCls}-${suffix}`;
};

// Button Component
export const buttonBaseCls= getBaseCls("button");
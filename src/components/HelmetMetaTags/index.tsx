import { dynamicPaths, mapCurrentPathToMetaTagInfo } from "@/consts/metaData";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { matchPath } from "react-router-dom";

interface HelmetMetaTagsProps {
  currentPath: string;
}

const HelmetMetaTags = ({ currentPath }: HelmetMetaTagsProps) => {
  const isDynamicPage = useMemo(() => {
    return dynamicPaths.some((path) => matchPath(path, currentPath));
  }, [currentPath]);

  if (isDynamicPage) return null;
  return (
    <Helmet>
      <title>{mapCurrentPathToMetaTagInfo[currentPath].title}</title>
      <meta
        name="description"
        content={mapCurrentPathToMetaTagInfo[currentPath].description}
      />
    </Helmet>
  );
};

export default HelmetMetaTags;

import { mapCurrentPathToMetaTagInfo } from "@/consts/metaData";
import { Helmet } from "react-helmet-async";

interface HelmetMetaTagsProps {
  currentPath: string;
}

const HelmetMetaTags = ({ currentPath }: HelmetMetaTagsProps) => {
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

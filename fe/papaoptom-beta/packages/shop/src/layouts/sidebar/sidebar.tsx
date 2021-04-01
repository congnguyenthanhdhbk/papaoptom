import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Sticky from "react-stickynode";
import { Scrollbar } from "components/scrollbar/scrollbar";
import { useAppState } from "contexts/app/app.provider";
import {
  SidebarLoader,
  SidebarMobileLoader,
} from "components/placeholder/placeholder";
import {
  CategoryWrapper,
  PopoverWrapper,
  SidebarWrapper,
  TreeWrapper,
} from "./sidebar.style";

import { TreeMenu } from "components/tree-menu/tree-menu";
import { GET_CATEGORIES } from "graphql/query/category.query";

import CategoryWalker from "components/category-walker/category-walker";

type SidebarCategoryProps = {
  deviceType: {
    mobile: string;
    tablet: string;
    desktop: boolean;
  };
};

const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  deviceType: { mobile, tablet, desktop },
}) => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_CATEGORIES);
  const { pathname, query } = router;
  console.log(pathname);
  console.log(query);
  const selectedQueries = query.category;

  const onCategoryClick = (slug: string) => {
    // const { type, ...rest } = query;
    // if (type) {
    //   router.push(
    //     {
    //       pathname,
    //       query: { ...rest, category: slug },
    //     },
    //     {
    //       pathname: `/${type}`,
    //       query: { ...rest, category: slug },
    //     }
    //   );
    // } else {
    //   router.push({
    //     pathname,
    //     query: { ...rest, category: slug },
    //   });
    // }
    return;
  };
  const isSidebarSticky = useAppState("isSidebarSticky");

  if (!data || loading) {
    if (mobile || tablet) {
      return <SidebarMobileLoader />;
    }
    return <SidebarLoader />;
  }
  return (
    <CategoryWrapper>
      <PopoverWrapper>
        <CategoryWalker>
          <TreeMenu
            data={data.categories}
            onClick={onCategoryClick}
            active={selectedQueries}
          />
        </CategoryWalker>
      </PopoverWrapper>

      <SidebarWrapper style={{ paddingTop: 45 }}>
        <Sticky enabled={isSidebarSticky} top={110}>
          <Scrollbar className="sidebar-scrollbar">
            <TreeWrapper>
              <TreeMenu
                data={data.categories}
                onClick={onCategoryClick}
                active={selectedQueries}
              />
            </TreeWrapper>
          </Scrollbar>
        </Sticky>
      </SidebarWrapper>
    </CategoryWrapper>
  );
};

export default SidebarCategory;

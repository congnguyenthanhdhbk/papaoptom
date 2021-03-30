import { useQuery } from '@apollo/client';
import CategoryWalker from 'components/category-walker/category-walker';
import {
  SidebarLoader, SidebarMobileLoader
} from 'components/placeholder/placeholder';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import { TreeMenu } from 'components/tree-menu/tree-menu';
import { useAppState } from 'contexts/app/app.provider';
import { GET_CATEGORIES } from 'graphql/query/category.query';
import { useRouter } from 'next/router';
import React from 'react';
import Sticky from 'react-stickynode';
import {
  CategoryWrapper,

  PopoverWrapper,
  SidebarWrapper, TreeWrapper
} from './sidebar.style';

type SidebarCategoryProps = {
  deviceType: {
    mobile: string;
    tablet: string;
    desktop: boolean;
  };
  type: string;
};

const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  deviceType: { mobile, tablet, desktop },
  type,
}) => {
  const router = useRouter();
  // const { data, loading } = useQuery(GET_CATEGORIES, {
  const { loading } = useQuery(GET_CATEGORIES, {
    variables: { type },
  });
  // TODO: hardcode categories
  const data = {
    "categories": [
      {
        "__typename": "Category",
        "id": 14,
        "title": "Men",
        "slug": "men",
        "icon": "HandBags",
        "children": []
      },
      {
        "__typename": "Category",
        "id": 15,
        "title": "Women",
        "slug": "women",
        "icon": "ShoulderBags",
        "children": []
      },

    ]
  }

  const { pathname, query } = router;
  const selectedQueries = query.category;

  const onCategoryClick = (slug: string) => {
    const { type, ...rest } = query;
    if (type) {
      router.push(
        {
          pathname,
          query: { ...rest, category: slug },
        },
        {
          pathname: `/${type}`,
          query: { ...rest, category: slug },
        }
      );
    } else {
      router.push({
        pathname,
        query: { ...rest, category: slug },
      });
    }
  };
  const isSidebarSticky = useAppState('isSidebarSticky');

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

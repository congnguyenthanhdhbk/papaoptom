import React, { useState } from "react";
import { SearchBox } from "components/search-box/search-box";
import { useAppState, useAppDispatch } from "contexts/app/app.provider";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

interface Props {
  minimal?: boolean;
  showButtonText?: boolean;
  onSubmit?: () => void;
  [key: string]: unknown;
}

const Search: React.FC<Props> = ({ onSubmit, ...props }) => {
  const searchTerm = useAppState("searchTerm");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const intl = useIntl();

  const [searchValue, setSearchValue] = useState("");

  const handleOnChange = (e) => {
    const { value } = e.target;
    // dispatch({ type: "SET_SEARCH_TERM", payload: value });
    setSearchValue(value);
  };
  const { pathname, query } = router;
  // const onSearch = (e) => {
  //   e.preventDefault();
  //   const { type, ...rest } = query;
  //   if (type) {
  //     router.push(
  //       {
  //         pathname,
  //         query: { ...rest, text: searchTerm },
  //       },
  //       {
  //         pathname: `/${type}`,
  //         query: { ...rest, text: searchTerm },
  //       }
  //     );
  //   } else {
  //     router.push({
  //       pathname,
  //       query: { ...rest, text: searchTerm },
  //     });
  //   }
  //   dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
  //   if (onSubmit) {
  //     onSubmit();
  //   }
  // };
  const onSearch = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_SEARCH_TERM", payload: searchValue });
    const { type, ...rest } = query;
    // router.push(
    //   {
    //     pathname,
    //     query: { ...rest, text: searchValue },
    //   },
    //   {
    //     pathname: `/${type}`,
    //     query: { ...rest, text: searchValue },
    //   },
    // );
    // dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    if (type) {
      router.push(
        {
          pathname,
          query: { ...rest, text: searchValue },
        },
        {
          pathname: `/${type}`,
          query: { ...rest, text: searchValue },
        },
      );
    } else {
      router.push({
        pathname,
        query: { ...rest, text: searchValue },
      });
    }
    // dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    if (onSubmit) {
      onSubmit();
    }
  };
  return (
    <SearchBox
      onEnter={onSearch}
      onChange={handleOnChange}
      value={searchValue}
      name="search"
      placeholder={intl.formatMessage({
        id: "searchPlaceholder",
        defaultMessage: "Search your products from here",
      })}
      categoryType={query.type || "bakery"}
      buttonText={intl.formatMessage({
        id: "searchButtonText",
        defaultMessage: "Search",
      })}
      {...props}
    />
  );
};

export default Search;

import { HOME_PAGE, BAGS_PAGE, SHOES_PAGE } from "site-settings/site-navigation";
const arr = [HOME_PAGE, BAGS_PAGE, SHOES_PAGE];
export function isCategoryPage(pathname) {
  return arr.includes(`/${pathname}`);
}

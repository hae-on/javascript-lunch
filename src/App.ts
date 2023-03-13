import { Constants, OptionValue, Selector } from "./utils/Constants";
import Header from "./components/Header";
import RestaurantFormBottomSheet from "./components/RestaurantFormBottomSheet";
import RestaurantList from "./components/RestaurantList";
import restaurantListHandler from "./domain/restaurantListHandler";
import type { Restaurant } from "./types/type";
import NavigatorContainer from "./components/NavigatorContainer";
import { $$, showOrHide } from "./utils/Dom";
import RestaurantItemBottomSheet from "./components/RestaurantItemBottomSheet";
import SelectContainer from "./components/SelectContainer";

class App {
  restaurantList: Restaurant[];
  target: HTMLElement;
  currentPage: string;

  constructor(body: Element) {
    this.target = <HTMLElement>body;
    this.restaurantList = restaurantListHandler.getRestaurants();
    this.currentPage = Constants.TOTAL;

    Header.initialize(this.target);
    RestaurantFormBottomSheet.initialize(
      this.target,
      this.addRestaurantItemToList.bind(this)
    );
    NavigatorContainer.initialize(
      this.target,
      this.setPageAndRerender,
      this.rerenderList
    );
    SelectContainer.initialize(body, this.setSortListFilterById);
    RestaurantList.initialize(
      body,
      this.restaurantList,
      this.createItemBottomSheet,
      this.rerenderList
    );

    this.rerenderList();
  }

  addRestaurantItemToList(data: Restaurant) {
    restaurantListHandler.addRestaurant(data);

    this.rerenderList();
  }

  setPageAndRerender = (pageName: string) => {
    this.currentPage = pageName;

    if (pageName === Constants.TOTAL) {
      showOrHide(Selector.SELECT_FILTER_CONTAINER);
      return;
    }
    showOrHide(Selector.SELECT_FILTER_CONTAINER);

    this.rerenderList();
  };

  deletePageSection() {
    $$(Selector.SECTION)?.forEach((section) => {
      section.remove();
    });
  }

  setSortListFilterById = (id: string, value: string) => {
    if (id === Constants.CATEGORY_FILTER) {
      this.restaurantList =
        value === ""
          ? restaurantListHandler.getRestaurants()
          : restaurantListHandler.getFilteredByCategory(value);
    }

    if (id === Constants.SORTING_FILTER) {
      this.restaurantList =
        value === OptionValue.TAKING_TIME_ORDER
          ? restaurantListHandler.getSortedByTakingTime(this.restaurantList)
          : restaurantListHandler.getSortedByName(this.restaurantList);
    }

    RestaurantList.updateRestaurantList(this.restaurantList);
  };

  createItemBottomSheet = (id: string) => {
    this.restaurantList = restaurantListHandler.getRestaurants();

    const restaurant = <Restaurant>(
      restaurantListHandler.getSelectedItem(id, this.restaurantList)
    );
    const itemSheet = new RestaurantItemBottomSheet(
      restaurant,
      this.deleteRestaurantItem
    );
    itemSheet.initialize(this.rerenderList);
  };

  deleteRestaurantItem = (id: string): void => {
    restaurantListHandler.setDeleteItem(id, this.restaurantList);
    this.rerenderList();
  };

  getFilteredRestaurantListByPage(page: string) {
    if (page === Constants.TOTAL) {
      return restaurantListHandler.getRestaurants();
    }
    return restaurantListHandler.getBookmarkRestaurants();
  }

  rerenderList = () => {
    const newRestaurants = this.getFilteredRestaurantListByPage(
      this.currentPage
    );

    RestaurantList.updateRestaurantList(newRestaurants);
  };
}

export default App;

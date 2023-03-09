import { categoryToSrc } from "../utils/convertor";
import { $ } from "../utils/Dom";
import { Category, Restaurant } from "./../types/type";

class RestaurantItemBottomSheet {
  restaurant: Restaurant;
  deleteItem: (id: string) => void;

  constructor(restaurant: Restaurant, deleteItem: (id: string) => void) {
    this.restaurant = restaurant;
    this.deleteItem = deleteItem;
  }

  template() {
    return `<div class="item-sheet">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="restaurant__category">
          <img src=${categoryToSrc(<Category>this.restaurant.category)} alt=${
      this.restaurant.category
    } class="category-icon">
            </div>
            <div class="restaurant__bookmark">${
              this.restaurant.bookMark ? "★" : "✩"
            }</div>
            <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${
            this.restaurant.name
          }</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${
            this.restaurant.takingTime
          }분 내</span>
          <p class="restaurant__description text-body">${
            this.restaurant.description
          }</p>
          <p>${this.restaurant.link}</p>
        </div>
          <div class="button-container">
          <button type="submit" class="button button--secondary text-caption item-sheet--delete">삭제하기</button>
          <button type="button" class="button button--primary text-caption item-sheet--close">닫기</button>
          </div>
        </div>
    </div>`;
  }

  initialize() {
    this.render();
    this.addEvent();
  }

  render() {
    $("body")?.insertAdjacentHTML("beforeend", this.template());
  }

  addEvent() {
    this.handleSheetDelete();
    this.handleSheetClose();
  }

  handleSheetDelete() {
    $(".item-sheet--delete")?.addEventListener("click", () => {
      this.deleteItem(this.restaurant.id);
      this.closeSheet();
    });
  }

  handleSheetClose() {
    $(".item-sheet--close")?.addEventListener("click", () => {
      this.closeSheet();
    });
  }

  closeSheet() {
    $(".item-sheet")?.remove();
  }
}

export default RestaurantItemBottomSheet;

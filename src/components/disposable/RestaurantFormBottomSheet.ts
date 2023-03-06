import { validateUrl } from "../../utils/validate";
import { OptionValue, RestaurantSelect } from "../../utils/Constants";
import { Category, TakingTime, Restaurant } from "../../types/type";
import { $ } from "../../utils/Dom";
import Select from "../reusable/Select";

class RestaurantFormBottomSheet {
  categorySelect;
  takingTimeSelect;

  constructor() {
    this.categorySelect = new Select(
      { name: "category", id: "category", required: true },
      [OptionValue.CHOICE, ...RestaurantSelect.CATEGORY]
    );
    this.takingTimeSelect = new Select(
      { name: "takingTime", id: "takingTime", required: true },
      [OptionValue.CHOICE, ...RestaurantSelect.TAKING_TIME]
    );
  }

  template() {
    return `<div class="modal">
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form class="modal-form">
        <div class="form-item form-item--required">
          <label for="category text-caption">카테고리</label>
          ${this.categorySelect.template()}
        </div>

        <div class="form-item form-item--required">
          <label for="name text-caption">이름</label>
          <input type="text" name="name" id="name" required>
        </div>

        <div class="form-item form-item--required">
          <label for="takingTime text-caption">거리(도보 이동 시간) </label>
         ${this.takingTimeSelect.template()}
        </div>

        <div class="form-item">
          <label for="description text-caption">설명</label>
          <textarea name="description" id="description" cols="30" rows="5"></textarea>
          <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
        </div>

        <div class="form-item">
          <label for="link text-caption">참고 링크</label>
          <input type="text" name="link" id="link">
          <span class="help-text text-caption url-warning">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
        </div>

        <div class="button-container">
          <button type="button" class="button button--secondary text-caption modal--close">취소하기</button>
          <button type="submit" class="button button--primary text-caption modal--submit">추가하기</button>
        </div>
      </form>
    </div>
  </div>`;
  }

  initialize(target: Element, makeRestaurantItem: (data: Restaurant) => void) {
    this.render(target);
    this.addEvent(makeRestaurantItem);
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  addEvent(makeRestaurantItem: (data: Restaurant) => void) {
    this.handleSheetClose();
    this.handleFormSubmit(makeRestaurantItem);
  }

  handleSheetClose() {
    $(".modal--close")?.addEventListener("click", () => {
      this.resetFormValues();
      this.closeModal();
    });
  }

  handleFormSubmit(makeRestaurantItem: (data: Restaurant) => void) {
    $(".modal-form")?.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = this.getFormData();
      makeRestaurantItem(data);

      this.resetFormValues();
      this.closeModal();
    });
  }

  getFormData(): Restaurant {
    const $modal = $(".modal-form") as HTMLFormElement;
    const formData = Object.fromEntries(new FormData($modal).entries());

    const data = {
      name: formData.name as string,
      takingTime: formData.takingTime as TakingTime,
      category: formData.category as Category,
      link: this.getValidateLink(formData.link as string),
      description: formData.description as string,
    };

    return data;
  }

  getValidateLink(url: string) {
    try {
      return validateUrl(url);
    } catch (error: unknown) {
      const warning = $(".url-warning") as HTMLElement;
      if (error instanceof Error) warning.textContent = error.message;
      throw error;
    }
  }

  resetFormValues() {
    const modalForm = $(".modal-form") as HTMLFormElement;
    modalForm.reset();
  }

  closeModal() {
    $(".modal")?.classList.remove("modal--open");
  }
}

export default new RestaurantFormBottomSheet();

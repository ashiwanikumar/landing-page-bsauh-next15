import { EVENT_FILTER } from "../actionTypes";

const resetEventFilter = () => {
  type: EVENT_FILTER.RESET_FILTERS;
};

export const setCurrentCategory = (category) => {
  return {
    type: EVENT_FILTER.SET_CATEGORY,
    category: category,
  };
};

export const setCurrentTag = (tag) => {
  return {
    type: EVENT_FILTER.SET_TAG,
    tag: tag,
  };
};

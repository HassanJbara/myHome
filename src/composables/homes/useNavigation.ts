import type { Home } from "@/modules";
import { computed, ref, type Ref } from "vue";

export default (
  homeListings: Ref<Home[]>,
  numberOfEntriesInPage: number,
  currentPage: number
) => {
  const nOEIP = ref(numberOfEntriesInPage);
  const cP = ref(currentPage);

  function setCurrentPage(newPageNumber: number) {
    cP.value = newPageNumber;
    console.log(homeListings.value);
  }

  const pagesCount = computed(() => {
    return Array.from(
      {
        length: Math.ceil(homeListings.value.length / nOEIP.value),
      },
      (_, i) => i + 1
    );
  });

  // Which pages should actually be displayed? Is determined by displayPageNumber method. Also add ellipsis in place of truncated pages.
  const pagesToDisplay = computed(() => {
    const arr = pagesCount.value.filter((i) => displayPageNumber(i));
    for (let i = 0; i < arr.length; i++) {
      if (i == 0) {
        continue;
      }
      // -1 is truncation mark for ellipsis
      if (arr[i] > arr[i - 1] + 1) {
        arr.splice(i, 0, -1);
        i++;
      }
    }
    return arr;
  });

  // Which entries show in which page? Thoe are the entries that will be displayed, i.e. the end result of the pagenation.
  const entriesToDisplay = computed(() => {
    const arr = Array.from(
      { length: nOEIP.value },
      (_, i) => i + (cP.value - 1) * nOEIP.value
    );
    return arr.filter((i) => i < homeListings.value.length);
  });

  // Should pageNumber n be displayed or omitted?
  function displayPageNumber(pageNumber: number) {
    if (pageNumber == pagesCount.value.length || pageNumber == 1) {
      return true;
    } else if (pageNumber > cP.value + 1) {
      return false;
    } else if (pageNumber < cP.value - 1) {
      return false;
    } else {
      return true;
    }
  }

  return {
    nOEIP,
    cP,
    setCurrentPage,
    pagesCount,
    pagesToDisplay,
    entriesToDisplay,
    displayPageNumber,
  };
};

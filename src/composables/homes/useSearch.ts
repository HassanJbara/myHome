import type { HomesSearch } from "@/modules";
import { ref, computed } from "vue";
import type { Ref } from "vue";

export default () => {
  const initialHomeSearch: HomesSearch = {
    city: undefined,
    home_type: undefined,
    property_type: undefined,
    rooms: undefined,
    features: undefined,
    rent: undefined, //Rent should be reset if necessary, thus null
  };

  const searchData: Ref<HomesSearch> = ref(initialHomeSearch);

  function setFeatures(homeFeatures: string[] | undefined) {
    searchData.value.features = homeFeatures?.join(",");
  }

  return {
    searchData,
    setFeatures,
  };
};

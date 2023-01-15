import { home_types, property_types, type HomesNewProperty } from "@/modules";
import { ref, computed } from "vue";

export default () => {
  const initialHome: HomesNewProperty = {
    info: {
      home_name: "",
      home_type: "",
      rent: 0,
      property_type: "",
      listing_text: "",
    },
    address: { city: "", street: "", house_number: 0, plz: "" },
    features: {
      pet_friendly: false,
      balcony: false,
      clubhouse: false,
      dishwasher: false,
      elevator: false,
      spa: false,
      fitness_center: false,
      pool: false,
      modern_kitchen: false,
    },
    specifications: { rooms: 0, baths: 0, space: 0 },
  };
  const dataDict = ref<HomesNewProperty>(initialHome);

  const validators = computed(() => ({
    has_name: !!dataDict.value?.info.home_name,
    has_city: !!dataDict.value?.address.city,
    has_street: !!dataDict.value?.address.street,
    has_house_number: !!dataDict.value?.address.house_number,
    has_plz: !!dataDict.value?.address.plz,
    has_rooms: !!dataDict.value?.specifications.rooms,
    has_baths: !!dataDict.value?.specifications.baths,
    has_space: !!dataDict.value?.specifications.space,
    house_number_is_valid:
      parseInt(String(dataDict?.value?.address.house_number)) >= 1,
    house_rent_is_valid: parseInt(String(dataDict?.value?.info.rent)) >= 100,
    plz_is_valid: parseInt(String(dataDict?.value?.address.plz)) >= 10000,
  }));

  //   function changeFeature(
  //     feature:
  //       | "pet_friendly"
  //       | "balcony"
  //       | "clubhouse"
  //       | "dishwasher"
  //       | "elevator"
  //       | "spa"
  //       | "fitness_center"
  //       | "pool"
  //       | "modern_kitchen"
  //   ) {
  //     dataDict.value.features[feature] = !dataDict.value.features[feature];
  //   }

  //   function changeSpecification(specifications: "rooms" | "baths" | "space") {
  //     const newValue = (
  //       document.getElementById(specifications) as HTMLInputElement
  //     ).value;
  //     dataDict.value.specifications[specifications] = parseInt(newValue);
  //   }

  function clearFields() {
    dataDict.value = {
      info: {
        home_name: "",
        home_type: home_types[0],
        property_type: property_types[0],
        listing_text: "",
        rent: 0,
      },
      address: { city: "", street: "", house_number: 0, plz: "" },
      features: {
        pet_friendly: false,
        balcony: false,
        clubhouse: false,
        dishwasher: false,
        elevator: false,
        spa: false,
        fitness_center: false,
        pool: false,
        modern_kitchen: false,
      },
      specifications: { rooms: 0, baths: 0, space: 0 },
    };

    (document.getElementById("rooms") as HTMLInputElement).value = "";
    (document.getElementById("space") as HTMLInputElement).value = "";
    (document.getElementById("baths") as HTMLInputElement).value = "";
  }

  return {
    // changeSpecification,
    // changeFeature,
    clearFields,
    dataDict,
    validators,
  };
};

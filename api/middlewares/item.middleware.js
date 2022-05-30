export const validateItem = (
  name,
  category,
  description,
  selling_price,
  unit
) => {
  if (name.length === 0) {
    return {
      status: false,
      message: "Item name is required",
    };
  } else if (unit.length === 0) {
    return {
      status: false,
      message: "Item unit is required",
    };
  } else if (category === 0) {
    return {
      status: false,
      message: "Item category is required",
    };
  } else if (selling_price === 0) {
    return {
      status: false,
      message: "Item selling price is required",
    };
  } else if (description.length === 0) {
    return {
      status: false,
      message: "Item description is required",
    };
  } else {
    return {
      status: true,
      message: "",
    };
  }
};

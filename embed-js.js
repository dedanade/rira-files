const onePriceQty = (document.getElementById("product_price_hidden") || {})
  .value;
if (onePriceQty > 0) {
  const container = document.getElementById("one_price_container");
  const justify_delivery_info = document.getElementById("all-del-info");
  container.style.display = "block";
  justify_delivery_info.style.display = "none";
  const input = container.querySelector("input");
  input.setAttribute("required", "");

  function showPriceString(e) {
    const inputValue = e.target.value;
    const tot =
      document.getElementById("product_price_hidden").value * inputValue;
    const total = `That's ₦${tot.toLocaleString()}`;
    document.getElementById("show_Product_total").value = total;
  }

  const showProductQTY = document.getElementById("show_Product_Quantity");

  showProductQTY.addEventListener("keyup", (e) => {
    showPriceString(e);
  });
  showProductQTY.addEventListener("click", (e) => {
    showPriceString(e);
  });
} else {
  const newVariantPrice = document.getElementById("product-variant-price")
    .value;
  const selectPromoPrice = document.getElementById("selectPromoPrice");
  const container = document.getElementById("variant_price_Quanity_container");
  if (container.style.display === "none") {
    container.style.display = "block";
    const select = container.querySelector("select");
    select.setAttribute("required", "");
    const PromoQtyArray = newVariantPrice.split(",");
    const newPromoQtyArray = PromoQtyArray.filter((e) => e !== " = ₦");
    for (var i = 0; i < newPromoQtyArray.length; i++) {
      var opt = newPromoQtyArray[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      selectPromoPrice.appendChild(el);
    }
  }
  selectPromoPrice.addEventListener("change", (e) => {
    const justify_delivery_info = document.getElementById("all-del-info");
    justify_delivery_info.style.display = "block";
    const promoPriceValue = e.target.value.split("= ₦")[1];
    const locPromoPriceValue = parseInt(promoPriceValue);
    const deliveryTotalInfo = document.getElementById("show_total_price");
    deliveryTotalInfo.innerHTML = `₦${locPromoPriceValue.toLocaleString()}`;
  });
}

const newVariantColours = (
  document.getElementById("product-variant-color") || {}
).value;

if (newVariantColours != "") {
  const container = document.getElementById("variant_colours_container");
  if (container.style.display === "none") {
    container.style.display = "block";
    const select = container.querySelector("select");
    select.setAttribute("required", "");
    const selectColours = document.getElementById("selectColours");
    const coloursOptions = newVariantColours.split(",");
    for (var i = 0; i < coloursOptions.length; i++) {
      var opt = coloursOptions[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      selectColours.appendChild(el);
    }
  }
}

const newVariantSizes = (document.getElementById("product-variant-size") || {})
  .value;
if (newVariantSizes != "") {
  const container = document.getElementById("variant_size_container");
  if (container.style.display === "none") {
    container.style.display = "block";
    const select = container.querySelector("select");
    select.setAttribute("required", "");
    const selectSizes = document.getElementById("selectSizes");
    const sizesOptions = newVariantSizes.split(",");
    for (var i = 0; i < sizesOptions.length; i++) {
      var opt = sizesOptions[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      selectSizes.appendChild(el);
    }
  }
}

const creaEmbedOrderForm = document.querySelector(".embed-order-form");
if (creaEmbedOrderForm)
  creaEmbedOrderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitButton = creaEmbedOrderForm.querySelector('[type="submit"]');
    const submitButtonText = document.getElementById("submitButtonText").value;
    const email = document.getElementById("embedEmail").value;
    const name = document.getElementById("embedName").value;
    const address = document.getElementById("embedAddress").value;
    const state = document.getElementById("embedState").value;
    const area = document.getElementById("embedArea").value;
    const phone = document.getElementById("embedPhone").value;
    const altPhone = document.getElementById("embedPhone2").value;
    const size = selectSizes.options[selectSizes.selectedIndex].value;
    const colour = selectColours.options[selectColours.selectedIndex].value;
    const product = document.getElementById("embedProduct").value;
    const businessAccount = document.getElementById("embedBusinessAccount")
      .value;

    const onePriceQty = document.getElementById("product_price_hidden").value;

    if (onePriceQty > 0) {
      var productEmbedQty = document.getElementById("show_Product_Quantity")
        .value;
      const total = document
        .getElementById("show_Product_total")
        .value.replace("₦", " ")
        .replace(/\D/g, "");
      var productEmbedTotal = parseInt(total);
    } else {
      var productQtyValue = document.getElementById("selectPromoPrice").value;
      var productEmbedQty = productQtyValue
        .split("=")[0]
        .replace(/^\s+|\s+$/gm, "");
      const total = productQtyValue.split("= ₦")[1];
      var productEmbedTotal = parseInt(total);
    }
    console.log(submitButtonText);
    submitButton.innerHTML = "Processing Order...";
    createOrderAPI(
      businessAccount,
      product,
      name,
      email,
      address,
      state,
      area,
      phone,
      altPhone,
      productEmbedQty,
      productEmbedTotal,
      colour,
      size,
      submitButton,
      submitButtonText
    );
  });

const createOrderAPI = async (
  businessAccount,
  product,
  name,
  email,
  address,
  state,
  area,
  phone,
  altPhone,
  qty,
  total,
  colour,
  size,
  submitButton,
  submitButtonText
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://rirapay.com/api/v1/orders",
      data: {
        businessAccount,
        product,
        name,
        email,
        address,
        state,
        area,
        phone,
        altPhone,
        qty,
        total,
        colour,
        size,
      },
    });

    const orderId = res.data.data.newOrder._id;

    if (res.data.status === "success") {
      const orderId = res.data.data.newOrder._id;
      const thankYouPage = res.data.data.product.facebookPixel.thankYouPage;
      if (thankYouPage) {
        if (thankYouPage.indexOf("http") === -1) {
          window.location.assign(
            `http://${thankYouPage}?riraEmbedId=${orderId}`
          );
        } else {
          window.location.assign(`${thankYouPage}?riraEmbedId=${orderId}`);
        }
      } else {
        window.location.assign(`https://rirapay.com/orderInfo/${orderId}`);
      }
    }
  } catch (err) {
    submitButton.innerHTML = submitButtonText;

    if (err.response) {
      alert(err.response.data.message);
      console.log(err.response.data.message);
    } else console.log(err);
    alert(`Unable to create this order, kindly retry. Thanks`);
  }
};

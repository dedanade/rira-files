
const newVariantPrice = (document.getElementById('product-variant-price')|| {})
  .value;
  
  if (newVariantPrice != ""){
    const selectPromoPrice = document.getElementById('selectPromoPrice');
    const container = document.getElementById('variant_price_Quanity_container');
    container.style.display = 'block';
   const select = container.querySelector('select');
   select.setAttribute("required", "");
  const PromoQtyArray = newVariantPrice.split(',');
  const newPromoQtyArray = PromoQtyArray.filter(e => e !== ' 0 = 0 Naira');
  for (var i = 0; i < newPromoQtyArray.length; i++) {
    var opt = newPromoQtyArray[i];
    var el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    selectPromoPrice.appendChild(el);
  }
}
const onePriceQty = (document.getElementById('product_price_hidden')|| {})
  .value;
if (onePriceQty > 0 && newVariantPrice === "" ){
    const container = document.getElementById('one_price_container');
    container.style.display = 'block';
   const input = container.querySelector('input');
   input.setAttribute("required", "");
$('#show_Product_Quantity').on('keyup click', function() {
  const tot = $('#product_price_hidden').val() * this.value;
  const total = `That's ₦${tot.toLocaleString()}`;
  $('#show_Product_total').val(total);
});
};

const newVariantColours = (document.getElementById('product-variant-color')|| {})
  .value;

if(newVariantColours != ""){
    const container = document.getElementById('variant_colours_container');
    container.style.display = 'block';
   const select = container.querySelector('select');
   select.setAttribute("required", "");
    const selectColours = document.getElementById('selectColours');
  const coloursOptions = newVariantColours.split(',');
  for (var i = 0; i < coloursOptions.length; i++) {
    var opt = coloursOptions[i];
    var el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    selectColours.appendChild(el);
  }
}

const newVariantSizes = (document.getElementById('product-variant-size')|| {})
  .value;
  if(newVariantSizes != ""){
    const container = document.getElementById('variant_size_container');
    container.style.display = 'block';
   const select = container.querySelector('select');
   select.setAttribute("required", "");
    const selectSizes = document.getElementById('selectSizes');
  const sizesOptions = newVariantSizes.split(',');
  for (var i = 0; i < sizesOptions.length; i++) {
    var opt = sizesOptions[i];
    var el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    selectSizes.appendChild(el);
  }
  }

const creaEmbedOrderForm = document.querySelector('.embed-order-form');
if (creaEmbedOrderForm)
creaEmbedOrderForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    console.log('dfghjkl');
const submitButton = e.submitter;
const email = (document.getElementById('embedEmail') || {}).value;
const name = (document.getElementById('embedName') || {}).value;
const address = (document.getElementById('embedAddress') || {}).value;
const state = (document.getElementById('embedState') || {}).value;
const area = (document.getElementById('embedArea') || {}).value;
const phone = (document.getElementById('embedPhone') || {}).value;
const altphone = (document.getElementById('embedPhone2') || {}).value;
const qty = (document.getElementById('embedQty') || {}).value;
const size = (selectSizes.options[selectSizes.selectedIndex] || {}).value;
const colour = (selectColours.options[selectColours.selectedIndex] ||{}).value;
const product = (document.getElementById('embedProduct') || {}).value;
const businessAccount = (document.getElementById('embedBusinessAccount') || {}).value;

const onePriceQty = (document.getElementById('product_price_hidden')|| {})
  .value;

if (onePriceQty > 0) {
    var productEmbedQty = document.getElementById('show_Product_Quantity').value;
    const total = document
      .getElementById('show_Product_total')
      .value.replace('₦', ' ')
      .replace(/\D/g, '');
    var productEmbedTotal = parseInt(total);
  } else {
    var productQtyValue = document.getElementById('selectPromoPrice').value;
    var productEmbedQty = productQtyValue.split('=')[0].replace(/^\s+|\s+$/gm, '');
    const total = productQtyValue.split('=')[1].split(' ')[1];
    var productEmbedTotal = parseInt(total);
  }

submitButton.classList.add('btnLoadingSpiner');
submitButton.disabled = true;
setTimeout(() => {
submitButton.classList.remove('btnLoadingSpiner'), submitButton.disabled=false;
}, 20000);
createOrderAPI(businessAccount, product, name, 
email, address, state, area, phone, altphone, productEmbedQty, 
productEmbedTotal, colour, size, submitButton)
});

 const stopLoadingBtnSpinner = (submitButton) => {
  submitButton.classList.remove('btnLoadingSpiner');
  submitButton.disabled = false;
}


const createOrderAPI = async(businessAccount, product, name, 
email, address, state, area, phone, altphone, qty, 
total, colour, size, submitButton) => {
try{
const res = await axios({
    method: 'POST',
    url:'http://127.0.0.1:3000/api/v1/orders',
      data: {
        businessAccount,
        product,
        name,
        email,
        address,
        state,
        area,
        phone,
        altphone,
        qty,
        total,
        colour,
        size
      }
    });

    const orderId = res.data.data.newOrder._id;

    if (res.data.status === 'success') {
        console.log(res.data);
        window.location.assign(`https://rirapay.com/orderInfo/${orderId}`);
    }
  } catch (err) {
    stopLoadingBtnSpinner(submitButton);
      alert(err.response.data.message);
  };
};

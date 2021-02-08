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

const creaEmbedOrderForm = document.querySelectorAll('.embed-order-form');
if (creaEmbedOrderForm)
creaEmbedOrderForm.addEventListener('submit', (e) =>{
const submitButton = e.submitter;
submitButton.classList.add('btnLoadingSpiner');
submitButton.disabled = true;
setTimeout(() => {
submitButton.classList.remove('btnLoadingSpiner'), submitButton.disabled=false;
}, 20000);
});

const onePriceQty = (document.getElementById('product_price_hidden')|| {})
  .value;

if (onePriceQty > 0 ){
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

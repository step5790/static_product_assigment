const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("id");

const id = query;
const url = "https://kea-alt-del.dk/t7/api/products/" + id;

fetch(url)
  .then(function (reply) {
    return reply.json();
  })

  .then(function (data) {
    showProduct(data);
  });

function showProduct(product) {
  const productTemplate = document.querySelector("template").content;
  const copy = productTemplate.cloneNode(true);

  const percent = product.discount;
  const price = product.price;
  const soldOut = product.soldout;

  if (percent == null) {
    result = price;
    copy.querySelector(".calculated_price").style.display = "none";
  } else {
    result = (percent / 100) * price;
  }

  if (soldOut == 1) {
    copy.querySelector("img").style.filter = "grayscale(100%)";
    copy.querySelector("img").style.zIndex = "-1";
  } else {
    copy.querySelector(".sold_out").style.display = "none";
  }

  copy.querySelector(".first_sub span").textContent = product.category;
  copy.querySelector(".second_sub span").textContent = product.brandname;
  copy.querySelector(".third_sub").textContent = product.productdisplayname;

  copy.querySelector("img").src = product.brandimage;
  copy.querySelector(".item_name").textContent = product.productdisplayname;
  copy.querySelector(".item_id span").textContent = product.id;
  copy.querySelector(".item_cat").textContent = product.category;
  copy.querySelector(".item_brand").textContent = product.brandname;
  copy.querySelector(".description").innerHTML = product.description;
  copy.querySelector(".item_material").innerHTML = product.materialcaredesc;
  copy.querySelector(".discount_rate span").textContent = product.discount;
  copy.querySelector(".item_discount_price").textContent = product.price;
  copy.querySelector(".item_price").textContent = result;

  document.querySelector("body").appendChild(copy);
}

const url = "https://kea-alt-del.dk/t7/api/products";

fetch(url)
  .then(function (reply) {
    return reply.json();
  })

  .then(function (data) {
    getProducts(data);
  });

function getProducts(data) {
  data.forEach(showProduct);
}

function showProduct(product) {
  const productTemplate = document.querySelector("template").content;
  const copy = productTemplate.cloneNode(true);

  const percent = product.discount;
  const price = product.price;
  const soldOut = product.soldout;

  copy.querySelector("a").href = `items.html?id=${product.id}`;

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

  copy.querySelector("img").src = product.brandimage;
  copy.querySelector(".item_name").textContent = product.productdisplayname;
  copy.querySelector(".item_sub_cat").textContent =
    product.category + product.brandname;
  copy.querySelector(".discount_rate span").textContent = product.discount;
  copy.querySelector(".item_discount_price").textContent = product.price;
  copy.querySelector(".item_price").textContent = result;

  document.querySelector("body").appendChild(copy);
}

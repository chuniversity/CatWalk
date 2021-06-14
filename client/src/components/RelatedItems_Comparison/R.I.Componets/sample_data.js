//List Products
var listProducts = [
  {
    id: 1,
    name: "Camo Onesie",
    slogan: "Blend in to your crowd",
    description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    category: "Jackets",
    default_price: "140"
  },
  {
    id: 2,
    name: "Bright Future Sunglasses",
    slogan: "You've got to wear shades",
    description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    category: "Accessories",
    default_price: "69"
  },
  {
    id: 3,
    name: "Morning Joggers",
    slogan: "Make yourself a morning person",
    description: "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
    category: "Pants",
    default_price: "40"
  }
];

// Product Information for one product
var productInformation = {
  id: 1,
  name: "Camo Onesie",
  slogan: "Blend in to your crowd",
  description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  category: "Jackets",
  default_price: "140",
  features: [
    {
      feature: "Sole",
      value: "Rubber"
    },
    {
      feature: "Material",
      value: "FullControlSkin"
    }
  ]
};

//  Product Styles
var productStyles = {
  product_id: "1",
  results: [
    {
      style_id: 1,
      name: "Forest Green & Black",
      original_price: "140",
      sale_price: "0",
      default: true,
      photos: [
        {
          thumbnail_url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          url: "urlplaceholder/style_1_photo_number.jpg"
        },
        {
          thumbnail_url: "urlplaceholder/style_1_photo_number_thumbnail.jpg",
          url: "urlplaceholder/style_1_photo_number.jpg"
        }
      ],
      skus: {
        37: {
          quantity: 8,
          size: "XS"
        },
        38: {
          quantity: 16,
          size: "S"
        },
        39: {
          quantity: 17,
          size: "M"
        },
      }
    }
  ]
}


var relatedProducts = [
    2,
    3,
    8,
    7
  ];



var sampleData = {
  relatedProducts,
  productStyles,
  productInformation,
  listProducts
}

export default sampleData;
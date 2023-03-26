const Hotels = [
  {
    id: 1,
    brand: "Movembek",
    city_id: 1,
    phone: 487573,
    email: "test0@test.com",
    city:{id:1, name:'makka'},
    isActive:true,
    hotel_persons: [
      {
        id: 1,
        name: "Ahmed",
        title: "manager",
        phone: 7467334,
        email: "test@test.com",
      },
      {
        id: 2,
        name: "Mohamed",
        title: "manager",
        phone: 4377334,
        email: "test0@test.com",
      },
    ],
    rooms: [
      { id: "2,3", typeId: 2, viewId: 3, type: "Double Side view", stock: 200 },
      {
        id: "1,1",
        typeId: 1,
        viewId: 1,
        type: "Single Kaaba view",
        stock: 100,
      },
      {
        id: "3,1",
        typeId: 3,
        viewId: 1,
        type: "Triple Kaaba view",
        stock: 400,
      },
    ],
    meals: [
      { id: 1, title: "Full board", code:'FB', isActive: true},
      { id: 2, title: "Half board" , code:'HB', isActive: true},
      { id: 3, title: "Breakfast" , code:'BF', isActive: true},
    ],
    extras: [
      { id: 1, type: "Meal", title: "Dinner", price: 200 , isActive: true},
      { id: 2, type: "Meal", title: "Breakfast", price: 120, isActive: true },
      { id: 3, type: "Furniture", title: "Bed", price: 300 , isActive: true},
      { id: 4, type: "Furniture", title: "Sofa", price: 500 , isActive: true},
    ],
  },
  {
    id: 2,
    brand: "Movembek2",
    city_id: 2,
    phone: 487573,
    email: "test@test.com",
    city:{id:1, name:'Gadda'},
    isActive:true,
    hotel_persons: [
      {
        id: 3,
        name: "Ahmed2",
        title: "manager",
        phone: 7467334,
        email: "test@test.com",
      },
      {
        id: 4,
        name: "Mohamed2",
        title: "manager",
        phone: 4377334,
        email: "test2@test.com",
      },
    ],
    rooms: [
      {
        id: "1,1",
        typeId: 1,
        viewId: 1,
        type: "Single Kaaba view",
        stock: 200,
      },
      { id: "2,2", typeId: 2, viewId: 2, type: "Double City view", stock: 100 },
      { id: "3,3", typeId: 3, viewId: 3, type: "Triple Side view", stock: 400 },
    ],
    meals: [
      { id: 1, title: "Full board", code:'FB', isActive: true},
      { id: 2, title: "Half board" , code:'HB', isActive: true},
      { id: 3, title: "Breakfast" , code:'BF', isActive: true},
    ],
    extras: [
      { id: 1, type: "Meal", title: "Dinner", price: 200 , isActive: true},
      { id: 2, type: "Meal", title: "Breakfast", price: 120, isActive: true },
      { id: 3, type: "Furniture", title: "Bed", price: 300 , isActive: true},
      { id: 4, type: "Furniture", title: "Sofa", price: 500 , isActive: true},
    ],
  },
  {
    id: 3,
    brand: "Movembek",
    isActive:true,
    city_id: 1,
    phone: 487573,
    email: "test@test.com",
    city:{id:1, name:'makka'},
    hotel_persons: [
      {
        id: 5,
        name: "Ahmed",
        title: "manager",
        phone: 7467334,
        email: "test@test.com",
      },
      {
        id: 6,
        name: "Mohamed",
        title: "manager",
        phone: 4377334,
        email: "test2@test.com",
      },
    ],
    rooms: [
        { id: "2,3", typeId: 2, viewId: 3, type: "Double Side view", stock: 200 },
        {
        id: "1,1",
        typeId: 1,
        viewId: 1,
        type: "Single Kaaba view",
        stock: 100,
        },
        ,
        {
        id: "3,1",
        typeId: 3,
        viewId: 1,
        type: "Triple Kaaba view",
        stock: 400,
        },
    ],
    meals: [
      { id: 1, title: "Full board", code:'FB', isActive: true},
      { id: 2, title: "Half board" , code:'HB', isActive: true},
      { id: 3, title: "Breakfast" , code:'BF', isActive: true},
    ],
    extras: [
      { id: 1, type: "Meal", title: "Dinner", price: 200 , isActive: true},
      { id: 2, type: "Meal", title: "Breakfast", price: 120, isActive: true },
      { id: 3, type: "Furniture", title: "Bed", price: 300 , isActive: true},
      { id: 4, type: "Furniture", title: "Sofa", price: 500 , isActive: true},
    ],
    },
    {
    id: 4,
    brand: "Movembek2",
    city_id: 2,
    phone: 487573,
    email: "test@test.com",
    city:{id:2, name:'Gadda'},
    isActive:true,
    hotel_persons: [
        {
        id: 7,
        name: "Ahmed2",
        title: "manager",
        phone: 7467334,
        email: "test@test.com",
        },
        {
        id: 8,
        name: "Mohamed2",
        title: "manager",
        phone: 4377334,
        email: "test2@test.com",
        },
    ],
    rooms: [
        {
        id: "1,1",
        typeId: 1,
        viewId: 1,
        type: "Single Kaaba view",
        stock: 200,
        },
        { id: "2,2", typeId: 2, viewId: 2, type: "Double City view", stock: 100 },
        { id: "3,3", typeId: 3, viewId: 3, type: "Triple Side view", stock: 400 },
    ],
    meals: [
      { id: 1, title: "Full board", code:'FB', isActive: true},
      { id: 2, title: "Half board" , code:'HB', isActive: true},
      { id: 3, title: "Breakfast" , code:'BF', isActive: true},
    ],
    extras: [
      { id: 1, type: "Meal", title: "Dinner", price: 200 , isActive: true},
      { id: 2, type: "Meal", title: "Breakfast", price: 120, isActive: true },
      { id: 3, type: "Furniture", title: "Bed", price: 300 , isActive: true},
      { id: 4, type: "Furniture", title: "Sofa", price: 500 , isActive: true},
    ],
    },
    {
    id: 5,
    brand: "Movembek",
    city_id: 1,
    phone: 487573,
    email: "test@test.com",
    city:{id:1, name:'makka'},
    isActive:true,
    hotel_persons: [
        {
        id: 9,
        name: "Ahmed",
        title: "manager",
        phone: 7467334,
        email: "test@test.com",
        },
        {
        id: 10,
        name: "Mohamed",
        title: "manager",
        phone: 4377334,
        email: "test2@test.com",
        },
    ],
    rooms: [
        { id: "2,3", typeId: 2, viewId: 3, type: "Double Side view", stock: 200 },
        {
        id: "1,1",
        typeId: 1,
        viewId: 1,
        type: "Single Kaaba view",
        stock: 100,
        },
        ,
        {
        id: "3,1",
        typeId: 3,
        viewId: 1,
        type: "Triple Kaaba view",
        stock: 400,
        },
    ],
    meals: [
      { id: 1, title: "Full board", code:'FB', isActive: true},
      { id: 2, title: "Half board" , code:'HB', isActive: true},
      { id: 3, title: "Breakfast" , code:'BF', isActive: true},
    ],
    extras: [
      { id: 1, type: "Meal", title: "Dinner", price: 200 , isActive: true},
      { id: 2, type: "Meal", title: "Breakfast", price: 120, isActive: true },
      { id: 3, type: "Furniture", title: "Bed", price: 300 , isActive: true},
      { id: 4, type: "Furniture", title: "Sofa", price: 500 , isActive: true},
    ],
    },
    {
    id: 6,
    brand: "Movembek2",
    city_id: 2,
    phone: 487573,
    email: "test@test.com",
    city:{id:2, name:'Gadda'},
    isActive:true,
    hotel_persons: [
        {
        id: 11,
        name: "Ahmed2",
        title: "manager",
        phone: 7467334,
        email: "test@test.com",
        },
        {
        id: 12,
        name: "Mohamed2",
        title: "manager",
        phone: 4377334,
        email: "test2@test.com",
        },
    ],
    rooms: [
        {
        id: "1,1",
        typeId: 1,
        viewId: 1,
        type: "Single Kaaba view",
        stock: 200,
        },
        { id: "2,2", typeId: 2, viewId: 2, type: "Double City view", stock: 100 },
        { id: "3,3", typeId: 3, viewId: 3, type: "Triple Side view", stock: 400 },
    ],
    meals: [
      { id: 1, title: "Full board", code:'FB', isActive: true},
      { id: 2, title: "Half board" , code:'HB', isActive: true},
      { id: 3, title: "Breakfast" , code:'BF', isActive: true},
    ],
    extras: [
      { id: 1, type: "Meal", title: "Dinner", price: 200 , isActive: true},
      { id: 2, type: "Meal", title: "Breakfast", price: 120, isActive: true },
      { id: 3, type: "Furniture", title: "Bed", price: 300 , isActive: true},
      { id: 4, type: "Furniture", title: "Sofa", price: 500 , isActive: true},
    ],
    },
];

export const roomsMatrixInventory = [
    { id: "1,1", typeId: 1, viewId: 1, type: "Single Kaaba view", stock: 0 },
    { id: "1,2", typeId: 1, viewId: 2, type: "Single City view", stock: 0 },
    { id: "1,3", typeId: 1, viewId: 3, type: "Single Side view", stock: 0 },
    { id: "1,4", typeId: 1, viewId: 4, type: "Single Full view", stock: 0 },
    { id: "2,1", typeId: 2, viewId: 1, type: "Double Kaaba view", stock: 0 },
    { id: "2,2", typeId: 2, viewId: 2, type: "Double City view", stock: 0 },
    { id: "2,3", typeId: 2, viewId: 3, type: "Double Side view", stock: 0 },
    { id: "2,4", typeId: 2, viewId: 4, type: "Double Full view", stock: 0 },
    { id: "3,1", typeId: 3, viewId: 1, type: "Triple Full view", stock: 0 },
    { id: "3,2", typeId: 3, viewId: 2, type: "Triple Full view", stock: 0 },
    { id: "3,3", typeId: 3, viewId: 3, type: "Triple Full view", stock: 0 },
    { id: "3,4", typeId: 3, viewId: 4, type: "Triple Full view", stock: 0 },
];
export default Hotels;
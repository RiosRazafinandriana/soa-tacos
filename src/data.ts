type Product = {
    id: number;
    title: string;
    img?: string;
    price: number;
    options?: { title: string, additionalPrice: number }[];
}

type Products = Product[];

export const pizzas: Products = [
    {
        id: 1,
        title: "triple meat",
        img: "/meat-pizza.png",
        price: 15000, 
        options: [
            {
                title: "PM",
                additionalPrice: 0,
            },
            {
                title: "GM",
                additionalPrice: 10000
            }
        ]
    },
    {
        id: 2,
        title: "triple meat",
        img: "/meat-pizza.png",
        price: 15000, 
        options: [
            {
                title: "PM",
                additionalPrice: 0,
            },
            {
                title: "GM",
                additionalPrice: 10000
            }
        ]
    },
    {
        id: 3,
        title: "triple meat",
        img: "/meat-pizza.png",
        price: 15000, 
        options: [
            {
                title: "PM",
                additionalPrice: 0,
            },
            {
                title: "GM",
                additionalPrice: 10000
            }
        ]
    },
]

type Menu = {
    id: number;
    slug: string;
    title: string;
    desc?: string;
    img?: string;
    color: string;
    bgcolor: string;
}[];

export const menu: Menu = [
    {
        id: 1,
        slug: "tacos",
        title: "French Tacos",
        desc: "Tacos matsiro be",
        img: "/french-tacos.png",
        color: "white",
        bgcolor: "bg-red-500",
    },
    {
        id: 2,
        slug: "pizzas",
        title: "Meat Pizza",
        desc: "Pizza mahafapo",
        img: "/meat-pizza.png",
        color: "white",
        bgcolor: "bg-orange-300",
    },
]

export const singleProduct: Product = {
    id: 1,
    title: "triple meat",
    img: "/meat-pizza.png",
    price: 15000,
    options: [
        {
            title: "PM",
            additionalPrice: 0,
        },
        {
            title: "GM",
            additionalPrice: 10000
        }
    ]
}
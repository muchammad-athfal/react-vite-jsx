import { Fragment, useState } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import Button from "../components/Elements/Button";

const products = [
    {
        id: 1,
        name: "Sepatu Baru",
        price: 1500000,
        image: "/images/shoes-1.jpg",
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged.`,
    },
    {
        id: 2,
        name: "Sepatu Lama",
        price: 1000000,
        image: "/images/shoes-2.jpg",
        description: `lorem Ipsum is simply dummy text of the printing and typesetting medium`,
    },
];

const email = localStorage.getItem("email");

const ProductsPage = () => {
    const [cart, setCart] = useState([]);
    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");

        window.location.href = "/login";
    };

    const handleAddToCart = (id) => {
        if (cart.find((item) => item.id === id)) {
            setCart(
                cart.map((item) =>
                    item.id === id ? { ...item, qty: item.qty + 1 } : item
                )
            );
        } else {
            setCart([...cart, { id, qty: 1 }]);
        }
    };
    return (
        <Fragment>
            <div className='flex justify-end h-20 bg-blue-600 text-white items-center px-20'>
                {email}
                <Button classname='ml-5 bg-black' onClick={handleLogout}>
                    Logout
                </Button>
            </div>
            <div className='flex justify-center py-5'>
                <div className='w-3/4 flex flex-wrap'>
                    {products.map((product) => (
                        <CardProduct key={product.id}>
                            <CardProduct.Header image={product.image} />
                            <CardProduct.Body name={product.name}>
                                {product.description}
                            </CardProduct.Body>
                            <CardProduct.Footer
                                price={product.price}
                                id={product.id}
                                handleAddToCart={handleAddToCart}
                            ></CardProduct.Footer>
                        </CardProduct>
                    ))}
                </div>

                <div className='w-2/4'>
                    <h1 className='text-3xl font-bold text-blue-600 ml-5 mb-2'>
                        Cart
                    </h1>
                    <table className='text-left table-auto border-separate border-spacing-x-5'>
                        <thead>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </thead>

                        <tbody>
                            {cart.map((item) => {
                                const product = products.find(
                                    (product) => product.id === item.id
                                );

                                return (
                                    <tr key={item.id}>
                                        <td>{product.name}</td>
                                        <td>
                                            Rp{" "}
                                            {product.price.toLocaleString(
                                                "id-ID",
                                                {
                                                    styles: "currency",
                                                    currency: "IDR",
                                                }
                                            )}
                                        </td>
                                        <td>{item.qty}</td>
                                        <td>
                                            Rp{" "}
                                            {(
                                                item.qty * product.price
                                            ).toLocaleString("id-ID", {
                                                styles: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductsPage;

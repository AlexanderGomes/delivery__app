import React, {useState, useEffect} from 'react'
import styles from '../../styles/admin.module.css'
import axios from 'axios';
import Image from 'next/image';
import AddButton from '../../components/AddButton';
import Add from '../../components/Add';

const Index = ({orders, products}) => {
    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["preparing", "on the way", "delivered"];
    const [close, setClose] = useState(true)

    const handleDelete = async (id) => {
        try {
          const res = await axios.delete(
            "https://delivery-519fdlm28-alexandergomes.vercel.app/api/products/" + id
          );
          setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
        } catch (err) {
          console.log(err);
        }
      };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
<div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
            </tr>
            <tr className={styles.td}>
            <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td className={styles.first}>{order._id.slice(0, 5)}...</td>
                <td  className={styles.second}>{order.customer}</td>
                <td className={styles.third}>${order.total}</td>
                <td className={styles.quatro}>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td className={styles.cinco}>{status[order.status]}</td>
                <td className={styles.sexto}>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {<AddButton setClose={setClose} />}
        {!close && <Add setClose={setClose} />}
      </div>
    </div>
  )
}

export default Index



export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  
    const productRes = await axios.get("https://delivery-519fdlm28-alexandergomes.vercel.app/api/products");
    const orderRes = await axios.get("https://delivery-519fdlm28-alexandergomes.vercel.app/api/orders");
  
    return {
      props: {
        orders: orderRes.data,
        products: productRes.data,
      },
    };
  };
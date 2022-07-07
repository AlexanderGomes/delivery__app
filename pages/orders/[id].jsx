import React from 'react'
import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from 'axios';
const Order = ({order}) => {
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
    
  return (
    <div className={styles.container}>
    <div className={styles.left}>
      <div className={styles.row}>
        <table className={styles.table}>
        <tbody>
          <tr className={styles.trTitle}>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Total</th>
          </tr>
        </tbody>
          <tbody>
          <tr className={styles.tr}>
            <td>
              <p className={styles.id}>{order._id}</p>
            </td>
            <td>
              <p className={styles.name}>{order.customer}</p>
            </td>
            <td>
              <p className={styles.address}>{order.address}</p>
            </td>
            <td>
              <p className={styles.total}>${order.total}</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.row}>
        <div className={statusClass(0)}>
          <Image src="/img/paid.png" width={30} height={30} alt="" />
          <div>Payment</div>
          <div className={styles.checkedIcon}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(1)}>
          <Image src="/img/bake.png" width={30} height={30} alt="" />
          <div>Preparing</div>
          <div className={styles.checkedIcon}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(2)}>
          <Image src="/img/bike.png" width={30} height={30} alt="" />
          <div>On the way</div>
          <div className={styles.checkedIcon}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(3)}>
          <Image src="/img/delivered.png" width={30} height={30} alt="" />
          <div>Delivered</div>
          <div className={styles.checkedIcon}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div className={styles.right}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>CART TOTAL</h2>
        <div className={styles.totalText}>
          <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
        </div>
        <div className={styles.totalText}>
          <b className={styles.totalTextTitle}>Discount:</b>$0.00
        </div>
        <div className={styles.totalText}>
          <b className={styles.totalTextTitle}>Total:</b>${order.total}
        </div>
        <button disabled className={styles.button}>
          PAID
        </button>
      </div>
    </div>
  </div>
  )
}

export default Order

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`https://delivery-519fdlm28-alexandergomes.vercel.app/api/orders/${params.id}`);
  return {
    props: {
      order: res?.data,
    },
  };
};

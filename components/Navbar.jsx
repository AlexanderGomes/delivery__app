import React from 'react'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity)

  return (
    <div className={styles.container}>
    <div className={styles.item}>
      <div className={styles.name}>
       A2G Delivery
      </div>
      <div className={styles.texts}>
      </div>
    </div>
    <div className={styles.item}>
      <ul className={styles.list}>
      <Link href={'/'}>
        <li className={styles.listItem}>Homepage</li>
      </Link>
      <Link href={'/admin/login'}>
        <li className={styles.item}>Admin page</li>
      </Link>
      </ul>
    </div>
    <Link href={'/Cart'} passHref>
    <div className={styles.item}>
      <div className={styles.cart}>
        <Image src="/img/cart.png" alt="" width="30px" height="30px" />
        <div className={styles.counter}>{quantity}</div>
      </div>
    </div>
    </Link>
  </div>
  )
}

export default Navbar
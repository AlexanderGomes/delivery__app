import React from 'react'
import styles from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard'

const PizzaList = ({pizzaList}) => {
  return (
    <div className={styles.container}>
    <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
    <p className={styles.desc}>
    Do you think you have ever had a good pizza before ? from monday to monday, 24/7, now you have the opportunity to have the best pizzas ever everyday !
    </p>
    <div className={styles.wrapper}>
      {pizzaList?.map((pizza) => (
        <PizzaCard  key={pizza._id} pizza={pizza}/>
      ))}
    </div>
  </div>
  )
}

export default PizzaList
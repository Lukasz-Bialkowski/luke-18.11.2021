import { Link } from "react-router-dom"
import { HOME_ROUTE, ORDER_BOOK_ROUTE } from "../../constants/routes"

import styles from './Nav.module.css';

const Nav = () => {
  return (
    <nav>
      <ul className={styles.links}>
        <li className={styles.link}>
          <Link to={HOME_ROUTE}>Home</Link>
        </li>
        <li>
          <Link to={ORDER_BOOK_ROUTE}>Order Book</Link>
        </li>
      </ul>
    </nav>
  )
}

export {
  Nav
}

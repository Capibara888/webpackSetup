import { useState } from 'react';
import style from './App.module.scss';
import {Link, Outlet} from 'react-router-dom';
import Search from '@/assets/search.svg'


export const App = () => {
    const [count, setCount] = useState(0);

  return ( 
    <div data-testid="toster1">
      <h3>platform: {__PLATFORM__}</h3>
      <br />
      <img src="src/assets/cat4.ico" alt="" />
      <Outlet/><div><div></div><Link to={'/about'}>to About</Link><br/>
      <Search width="100px" style={{fill:'blue'}} height="100px"/>
      <Link to={'/shop'}>to Shop</Link></div><h1 className={style.title}> counter: {count}</h1><div>
        <button onClick={() => setCount(prev => prev+1)}>setValue</button></div></div>

  )
}

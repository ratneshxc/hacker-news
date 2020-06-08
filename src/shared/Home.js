import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home () {
  return (
    <NavLink activeStyle={{fontWeight: 'bold'}} to={`/news/1`}>
            {'Welcome to hacker news'}
    </NavLink>
  )
}
/*
 * @Author: xx
 * @Date: 2024-03-12 20:28:40
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-30 22:55:27
 * @Description: 
 * @FilePath: \blog-view\src\main.tsx
 */
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

/*
 * @Author: xx
 * @Date: 2024-03-12 20:28:40
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-01 16:13:16
 * @Description: 
 * @FilePath: \blog-view\src\App.tsx
 */
import { Provider } from 'react-redux';
import './App.css'
import Router from './router';
import { store } from './store';
// import setStoreAfterRefresh from './utils/listenRefresh';
function App() {
  // setStoreAfterRefresh()
  return (
    <>
    {/* redux包裹 */}
      <Provider store={store}>
        <div className='appBodyBox'>
          <div className='appBox'>
            <Router />
          </div>
        </div>
      </Provider>
    </>
  )
}

export default App

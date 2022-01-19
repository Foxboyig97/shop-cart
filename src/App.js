
import React from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useSelector } from 'react-redux';
import Loading from './component/loading';
import Cart from './page/cart';
import { Filter } from './page/filter';
import ShopList from './page/shopList';
import './App.css';

const App = () => {
  const { loading } = useSelector(state => state.app)

  return (
    <>
      <Cart />
      <Loading loading={loading} />
      <Content style={{ padding: '50px', }}>
        <Row>
          <Col span="4">
            <Filter />
          </Col>
          <Col span="20">
            <ShopList />
          </Col>
        </Row>
      </Content>
    </>
  )
}
export default App

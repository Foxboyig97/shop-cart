import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Card, Select, Modal, Checkbox, Radio, Image, message, Empty, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { asyncShopList, saveProducts } from '../../features/shop/shoplistSlice';
import { addToShopCart } from '../../features/cart/cartSlice';
import './index.css'
import { hideLoading, showLoading } from '../../features/app/appSlice';
import { accSub } from '../../tools/numcompentued';
import { getBit } from '../../tools';

const ShopList = () => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state?.shop)
    const [productList, setproductList] = useState([]);
    const [skuTips, setskuTips] = useState(false);
    const [selectProduct, setselectProduct] = useState({});
    const [skuList, setskuList] = useState([]);
    const [tempSelect, settempSelect] = useState();
    useEffect(() => {
        setproductList(products)
        return () => {

        }
    }, [products])

    useEffect(() => {
        getPro()
        return () => {

        }
    }, [])

    const getPro = () => dispatch(asyncShopList())

    // 添加购物车
    const addCart = (data) => {
        dispatch(showLoading())
        setTimeout(() => {
            dispatch(hideLoading())
        }, 500);
        dispatch(addToShopCart(data))
    }
    const handleOk = () => {
        let select = { ...selectProduct }
        if (selectProduct.skuSize == undefined) {
            select.skuSize = tempSelect
        }
        addCart(select)
        setskuTips(false)
    }
    const handleCancel = () => {
        setskuTips(false)
    }
    const onChange = (e) => {
        let select = { ...selectProduct }
        select.skuSize = e.target.value
        settempSelect(e.target.value)
        setselectProduct(select);
    }
    return (
        <div className="shop">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>为您找到{productList?.length}件商品</span>
            </div>
            <Row wrap>
                {
                    productList?.length == 0 ?
                        <div style={{ display: "flex", flex: 1, justifyContent: 'center', alignItems: "center" }}>
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        暂无商品
                                    </span>
                                }
                            >
                            </Empty>
                        </div> :
                        productList?.map((item, index) => {
                            return (
                                <Col
                                    style={{ margin: '5px' }}
                                    key={index}
                                    xs={{ span: 12 }}
                                    sm={{ span: 8 }}
                                    md={{ span: 6 }}
                                    lg={{ span: 5 }}>
                                    <Card
                                        hoverable
                                        bordered={false}
                                        actions={[
                                            <Button
                                                onClick={() => {
                                                    setskuList(item?.availableSizes);
                                                    setselectProduct(item)
                                                    settempSelect(item?.availableSizes[0])
                                                    setskuTips(true)
                                                }}
                                                style={{ marginTop: "5px", height: "40px", width: "90%" }} type="primary">
                                                ADD TO CART
                                            </Button>
                                        ]}
                                    >
                                        <Card.Meta
                                            avatar={<img style={{ width: "100%", }} src={require(`../../assets/products/${item?.sku}_1.jpg`)} alt="" />} />
                                        <div style={{ height: '60px' }}>
                                            <div className='card_title'>{item?.title}</div>
                                            <div className='card_desc'>
                                                {`${item?.currencyId} ${getBit(item?.price, 2)} or ${item?.currencyId} ${getBit(item?.installments, 2)}`}
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            )
                        })
                }
            </Row>
            <Modal
                destroyOnClose={true}
                visible={skuTips}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button type='primary' key='go' onClick={handleOk}>
                        确定
                    </Button>
                ]}
            >
                {
                    skuTips ?
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                            <Image width='50%' preview={false} src={require(`../../assets/products/${selectProduct?.sku}_1.jpg`)} />
                            <div style={{ marginTop: '20px', width: "100%", justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
                                <span>尺寸：</span>
                                <Radio.Group defaultValue={tempSelect} onChange={onChange}>
                                    {
                                        skuList.map(item => {
                                            return (
                                                <Radio defaultChecked={true} key={item} value={item}>{item}</Radio>
                                            )
                                        })
                                    }
                                </Radio.Group>
                            </div>
                        </div> : null
                }
            </Modal>
        </div >
    );
}

export default ShopList;

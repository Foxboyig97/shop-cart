import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Button, Drawer, Empty, message, Modal, Space } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToShopCart, clearcart, deleteToShopCart, reduceToShopCart, } from "../../features/cart/cartSlice"
import { getBit } from "../../tools"
import { accMul } from "../../tools/numcompentued"


const Cart = () => {
    const dispatch = useDispatch()
    const [visible, setvisible] = useState(false)
    const { goods } = useSelector(state => state.cart)
    const [carGoodsList, setcarGoodsList] = useState([]);
    const [isModalVisible, setisModalVisible] = useState(false);
    const [isEdit, setisEdit] = useState(false);
    useEffect(() => {
        setcarGoodsList(goods);
        return () => {

        }
    }, [goods])

    const handDrawer = () => {
        let cartList = goods
        setcarGoodsList(cartList);
        setvisible(!visible)
        setisEdit(false)
    }
    const reduce = (data) => {
        if (data.count == 1) return message.error('最少购买一件哦!')
        dispatch(reduceToShopCart(data))
    }
    const addCart = (data) => {
        dispatch(addToShopCart(data))
    }
    const clearCart = () => {
        dispatch(clearcart())
        setisModalVisible(false)
    }
    const deleteSeletCart = (data) => {
        dispatch(deleteToShopCart(data))
    }
    const getTotalMoney = () => {
        let priceArray = []
        goods?.forEach(item => {
            priceArray.push(accMul(item.good.price, item.count))
        });
        return getBit(eval(priceArray.join("+"), 2))
        // return Math.floor(accMul(eval(priceArray.join("+")), 100)) / 100

    }
    const getTotal = () => {
        message.info(`总计 $ ${getTotalMoney()}`);
    }
    return (
        <>
            <span style={{ position: 'absolute', top: 0, right: 0 }}>

                <span style={{ position: "fixed", bottom: 50, left: 50, zIndex: 999 }} onClick={handDrawer}>
                    {
                        carGoodsList?.length == 0 ? null :
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '18px',
                                height: '18px',
                                backgroundColor: "#eabf00",
                                borderRadius: 999,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "12px"
                            }}>{carGoodsList?.length}</div>
                    }
                    <ShoppingCartOutlined style={{ fontSize: 40 }} />
                </span>
                <Drawer
                    title="购物车"
                    placement='right'
                    onClose={handDrawer}
                    visible={visible}
                    extra={
                        carGoodsList.length == 0 ? null :
                            <Space>
                                {
                                    isEdit ?
                                        <Button type='primary' onClick={() => setisModalVisible(true)}>清空购物车</Button> : null
                                }
                                <Button type='text' onClick={() => setisEdit(!isEdit)}>{isEdit ? '完成' : '编辑'}</Button>
                            </Space>
                    }
                    footer={
                        isEdit ? null :
                            <>
                                {
                                    carGoodsList.length == 0 ? null :
                                        <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                                            <span>总计:{getTotalMoney()}</span>
                                            <Button onClick={getTotal} type='primary' size='large'>
                                                <span>结算</span>
                                            </Button>
                                        </div>
                                }
                            </>
                    }
                >
                    {
                        carGoodsList.length == 0 ?
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        购物车空空如也
                                    </span>
                                }
                            >
                                <Button onClick={() => {
                                    setvisible(false)
                                }} type="primary">立即添加</Button>
                            </Empty> :
                            carGoodsList.map((item, index) => {
                                return (
                                    <div key={index} style={{ marginTop: "10px", display: 'flex' }}>
                                        <img style={{ width: 50, height: 70 }} src={require(`../../assets/products/${item?.good?.sku}_1.jpg`)} alt="" />
                                        <div style={{ flex: 1, padding: '0px 5px' }}>
                                            <span style={{ fontSize: '16px', fontWeight: "300" }}>
                                                {item.good.title}
                                            </span>
                                            {
                                                !isEdit ?
                                                    <div>
                                                        <div style={{ fontSize: '12px', color: "#666" }}>尺寸：{item?.good?.skuSize}</div>
                                                        <Button type='text' onClick={() => { addCart(item) }}><PlusOutlined /></Button>
                                                        <span style={{ margin: "0px 5px" }}>{item.count}</span>
                                                        <Button type='text' onClick={() => { reduce(item) }}><MinusOutlined /></Button>
                                                    </div> : null
                                            }
                                        </div>
                                        <div style={{ flexDirection: "column", alignItems: 'flex-end', justifyContent: "flex-end" }}>
                                            {
                                                !isEdit ?
                                                    <div >
                                                        {item.good.currencyFormat}
                                                        {getBit(accMul(item?.good.price, item?.count), 2)}
                                                    </div> :
                                                    <Button
                                                        type='text'
                                                        onClick={() => {
                                                            deleteSeletCart(item)
                                                        }}>
                                                        删除
                                                    </Button>
                                            }

                                        </div>
                                    </div>
                                )
                            })
                    }

                </Drawer>
            </span>

            <Modal title="温馨提示" cancelText='取消' okText='确定' visible={isModalVisible} onOk={clearCart} onCancel={() => setisModalVisible(false)}>
                <p>确定清空购物车吗</p>
            </Modal>
        </>
    )
}
export default Cart
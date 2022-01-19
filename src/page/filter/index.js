import { Checkbox, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopList } from "../../api/soplist";
import { asyncShopList, saveProducts } from "../../features/shop/shoplistSlice";

export const Filter = () => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state?.shop)
    const optionsWithDisabled = [
        { label: 'XS', value: 'XS' },
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'ML', value: 'ML' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' },
        { label: 'XXL', value: 'XXL' },
    ];
    const [tempProducts, settempProducts] = useState([]);
    const [selectSize, setselectSize] = useState([]);
    const [SelectOrderBy, setSelectOrderBy] = useState(0);
    const choseData = [
        {
            lable: '默认', key: 0
        },
        {
            lable: '由低到高', key: 1
        },
        {
            lable: '由高到低', key: 2
        },
    ];
    useEffect(() => {
        handleFilter()
        return () => {

        }
    }, [SelectOrderBy, selectSize])

    const handleFilter = async () => {
        let res = await getShopList()
        let arrAy = [...res.products]
        //排序 
        if (SelectOrderBy == 1) {
            arrAy.sort((item1, item2) => item1.price - item2.price)
        } else if (SelectOrderBy == 2) {
            arrAy.sort((item1, item2) => item2.price - item1.price)
        }
        //筛选尺寸
        let data = arrAy.filter(item => {
            //每个商品的size
            let { availableSizes } = item
            if (selectSize.length == 0) {
                return true;
            }
            let shouldReturn = false;
            for (let i = 0; i < selectSize.length; i++) {
                if (availableSizes.indexOf(selectSize[i]) !== -1) {
                    shouldReturn = true;
                }
            }
            return shouldReturn;
        });
        dispatch(saveProducts(data))
    }

    const onChange = async (data) => setselectSize(data)

    const handleChange = (data) => setSelectOrderBy(data)

    return (
        <div className="filter">
            <div>
                <div>尺寸</div>
                <Checkbox.Group
                    options={optionsWithDisabled}
                    defaultValue={[]}
                    onChange={onChange}
                />
            </div>
            <div>
                <div>
                    价格
                </div>
                <Select defaultValue={choseData[0].lable} style={{ width: 120 }} onChange={handleChange}>
                    {choseData.map(item => (
                        <Select.Option key={item.key}>{item.lable}</Select.Option>
                    ))}
                </Select>
            </div>
        </div>
    )
}
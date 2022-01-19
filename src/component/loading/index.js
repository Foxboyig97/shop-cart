import { Modal, Spin } from 'antd'
import React from 'react'

const Loading = (props) => {
    const { loading } = props
    return (
        <>
            {
                loading ?
                    <Modal
                        centered
                        maskStyle={{
                            backgroundColor:"rgba(0,0,0,0)"
                        }}
                        visible={loading}
                        modalRender={() => {
                            return <div style={{ textAlign: 'center' }}>
                                <Spin size='large' loading={`${loading}`} />
                            </div>
                        }}
                    /> :
                    null
            }
        </>
    )
}

export default Loading
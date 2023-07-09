import React, { useState } from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import ProductSize from "../../components/container/ProductSize/ProductSize"
import { BackTop } from 'antd';
const ProductTypeList = () => {

    return (
        <>
            <PageContainer title="Hóa đơn nhập sản phẩm" description="this is Sample page">
                <DashboardCard title="Danh sách Size sản phẩm">
                    <div hidden>
                        {document.documentElement.scrollTop = 0}
                    </div>
                    <Typography paragraph>
                        <ProductSize />
                    </Typography>
                </DashboardCard>  <BackTop />
                <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
            </PageContainer>
        </>
    );
};
export default ProductTypeList;

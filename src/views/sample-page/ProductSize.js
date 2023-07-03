import React, { useState } from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import ProductSize from "../../components/container/ProductSize/ProductSize"

const ProductTypeList = () => {

    return (
        <>
            <PageContainer title="Hóa đơn nhập sản phẩm" description="this is Sample page">
                <DashboardCard title="Danh sách Size sản phẩm">
                    <Typography paragraph>
                        <ProductSize />
                    </Typography>
                </DashboardCard>
            </PageContainer>
        </>
    );
};
export default ProductTypeList;

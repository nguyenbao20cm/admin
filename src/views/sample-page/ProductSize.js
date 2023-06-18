import React, { useState } from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import ProductSize from "../../components/container/ProductSize/ProductSize"

const ProductTypeList = () => {

    return (
        <>
            <DashboardCard title="ProductSize List">
                <Typography paragraph>
                    <ProductSize />
                </Typography>
            </DashboardCard>
        </>
    );
};
export default ProductTypeList;

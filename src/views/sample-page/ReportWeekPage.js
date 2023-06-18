import React from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ProductType from "../Product/ProductType"


const ProductTypeList = () => {

    return (
        <>
            <PageContainer title="Sample Page" description="this is Sample page">

                <DashboardCard title="ProductTypes List">
                    <Typography paragraph>
                        <ProductType />
                    </Typography>
                </DashboardCard>
            </PageContainer>
        </>
    );
};
export default ProductTypeList;

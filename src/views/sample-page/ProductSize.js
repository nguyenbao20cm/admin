import React from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import ProductSize from "../../components/container/ProductSize/ProductSize"
import { Box } from '@mui/material';

const ProductTypeList = () => {

    return (
        <>
            <PageContainer title="Sample Page" description="this is Sample page">

                <DashboardCard title="ProductSize List">
                    <Typography paragraph>
                        <ProductSize />
                    </Typography>
                </DashboardCard>
            </PageContainer>
        </>
    );
};
export default ProductTypeList;

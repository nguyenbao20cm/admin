import React from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BrandProduts from "../Product/BrandProduts"


const ProductTypeList = () => {

    return (
        <>
            <PageContainer title="Thương hiệu sản phẩm" description="this is Sample page">

                <DashboardCard title="Danh sách thương hiệu sản phẩm ">
                    <Typography paragraph>
                        <BrandProduts />
                    </Typography>
                </DashboardCard>
            </PageContainer>
        </>
    );
};
export default ProductTypeList;

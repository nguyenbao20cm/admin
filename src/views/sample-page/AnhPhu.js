import React from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import AnhPhu from "../Product/AnhPhu"


const ProductTypeList = () => {

    return (
        <>
            <PageContainer title="Ảnh phụ sản phẩm" description="this is Sample page">

                <DashboardCard title="Danh sách hình ảnh sản phẩm ">
                    <Typography paragraph>
                        <AnhPhu />
                    </Typography>
                </DashboardCard>
            </PageContainer>
        </>
    );
};
export default ProductTypeList;

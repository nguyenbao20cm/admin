import React from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BrandProduts from "../Product/BrandProduts"
import { BackTop } from 'antd';

const ProductTypeList = () => {

    return (
        <>
            <PageContainer title="Thương hiệu sản phẩm" description="this is Sample page">

                <DashboardCard title="Danh sách thương hiệu sản phẩm ">
                    <div hidden>
                        {document.documentElement.scrollTop = 0}
                    </div>
                    <Typography paragraph>
                        <BrandProduts />
                    </Typography>
                </DashboardCard>  <BackTop />
                <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
            </PageContainer>
        </>
    );
};
export default ProductTypeList;

import React from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { BackTop } from 'antd';
import InvoicePage from "../Invoice/Invoice"
import { Box } from '@mui/material';

const ProductTypeList = () => {

    return (
        <>
          
            <PageContainer title="Hóa đơn" description="this is Sample page">

                <DashboardCard title="Danh sách Hóa đơn">
                    <div hidden>
                        {document.documentElement.scrollTop = 0}
                    </div>
                    <Typography paragraph>
                        <InvoicePage />
                    </Typography>
                </DashboardCard>  <BackTop />
                <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
            </PageContainer>
        </>
    );
};
export default ProductTypeList;

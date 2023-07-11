import React from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { BackTop } from 'antd';
import Kho from "../Invoice/Kho"
import { Box } from '@mui/material';

const ProductTypeList = () => {

    return (
        <>

            <PageContainer title="Kho Hàng" description="this is Sample page">

                <DashboardCard title="Kho hàng">
                    <div hidden>
                        {document.documentElement.scrollTop = 0}
                    </div>
                    <Typography paragraph>
                        <Kho />
                    </Typography>
                </DashboardCard>  <BackTop />
                <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
            </PageContainer>
        </>
    );
};
export default ProductTypeList;

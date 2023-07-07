import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import ImportInvoice from "../Invoice/ImportInvoice"
const ReviewList = () => {
    return (
        <PageContainer title="Nhập hàng" description="this is Sample page">

            <DashboardCard title="Hóa đơn nhập">
                <Typography paragraph>
                    <ImportInvoice />
                </Typography>
            </DashboardCard>
        </PageContainer>
    );
};
export default ReviewList;

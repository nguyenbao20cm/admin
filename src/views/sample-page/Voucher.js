import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { BackTop } from 'antd';
import Voucher from "../Voucher/VoucherCRUD"
const SamplePage = () => {
    return (
        <PageContainer title="Voucher" description="this is Sample page">
            <div hidden>
                {document.documentElement.scrollTop = 0}
            </div>
            <DashboardCard title="Quản lý Voucher">
                <Typography paragraph>
                    <Voucher />
                </Typography>
            </DashboardCard>
            <BackTop />
            <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
        </PageContainer>
    );
};
export default SamplePage;

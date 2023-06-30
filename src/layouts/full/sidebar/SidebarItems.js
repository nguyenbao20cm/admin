import React from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavGroup from './NavGroup/NavGroup'; import { NavLink } from 'react-router-dom';
import {
  ListItemText, useTheme, styled
} from '@mui/material';
import PropTypes from 'prop-types'; import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus, IconReport,IconUsers,IconBorderAll
} from '@tabler/icons';
import { ListSubheader } from '@mui/material';
import {
  ListItemIcon,
  ListItem,
} from '@mui/material';
import Buttonside from "./Buttonside"
const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const Icon = IconAperture;
  const itemIcon123 = <IconBorderAll stroke={1.5} size="1.3rem" />;
  const itemIcon12 = <IconUsers stroke={1.5} size="1.3rem" />;
  const itemIcon1 = <IconReport stroke={1.5} size="1.3rem" />;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: '700',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      lineHeight: '26px',
      padding: '3px 12px',
    }),
  );

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          }
          else
            if (item.bbb == null && item.aaa == null && item.taikhoan ==null) {
              return (
                <NavItem item={item} key={item.id} pathDirect={pathDirect} />
              );
            }
        })}
        <ListSubheaderStyle></ListSubheaderStyle>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
            button
            component={NavLink}
            target={''}
          >
            <ListItemIcon
              sx={{
                minWidth: '36px',
                p: '3px 0',
                color: 'inherit',
              }}
            >
              {itemIcon123}
            </ListItemIcon>
            <ListItemText>
              <>Sản phẩm</>
            </ListItemText>
          </AccordionSummary>
          <AccordionDetails>
            {Menuitems.map((item) => {
              if (item.bbb == false) {
                return (
                  <Buttonside item={item} key={item.id} pathDirect={pathDirect} />
                );
              }
            })}
          </AccordionDetails>
        </Accordion>
        <ListSubheaderStyle></ListSubheaderStyle>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
            button
            component={NavLink}
            target={''}
          >
            <ListItemIcon
              sx={{
                minWidth: '36px',
                p: '3px 0',
                color: 'inherit',
              }}
            >
              {itemIcon1}
            </ListItemIcon>
            <ListItemText>
              <>Báo cáo</>
            </ListItemText>
          </AccordionSummary>
          <AccordionDetails>
            {Menuitems.map((item) => {
              if (item.bbb == true) {
                return (
                  <Buttonside item={item} key={item.id} pathDirect={pathDirect} />
                );
              }
            })}
          </AccordionDetails>
        </Accordion>
        <ListSubheaderStyle></ListSubheaderStyle>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
            button
            component={NavLink}
            target={''}
          >
            <ListItemIcon
              sx={{
                minWidth: '36px',
                p: '3px 0',
                color: 'inherit',
              }}
            >
              {itemIcon12}
            </ListItemIcon>
            <ListItemText>
              <>Tài khoản</>
            </ListItemText>
          </AccordionSummary>
          <AccordionDetails>
            {Menuitems.map((item) => {
              if (item.taikhoan == true) {
                return (
                  <Buttonside item={item} key={item.id} pathDirect={pathDirect} />
                );
              }
            })}
          </AccordionDetails>
        </Accordion>
        <ListSubheaderStyle>Các chúc năng khác</ListSubheaderStyle>
        {Menuitems.map((item) => {

          if (item.aaa == true) {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;

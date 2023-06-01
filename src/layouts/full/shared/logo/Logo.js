import { Link } from 'react-router-dom';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
   
    <LinkStyled to="/">
      <svg width="174" height="26" viewBox="0 0 174 26" fill="none" xmlns="http://www.w3.org/2000/svg"/>
      <h3 width="174" height="26" viewBox="0 0 174 26" fill="none" >
        BaoDatShop
      </h3>
    </LinkStyled>
  )
};

export default Logo;

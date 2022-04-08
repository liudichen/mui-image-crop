/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-31 15:24:07
 * @LastEditTime: 2022-03-31 23:17:07
 */
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const TitleRender = (props) => {
  const { title } = props;
  return (
    <Typography
      component='div'
      variant='h4'
    >
      {title}
    </Typography>
  );
};

TitleRender.propTypes = {
  title: PropTypes.node,
  onClose: PropTypes.func,
};

export default TitleRender;

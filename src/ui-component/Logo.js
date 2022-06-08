import React from 'react';
import logo from './../assets/images/logo.jpg';
// material-ui
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from './../../assets/images/logo-dark.svg';
 * import logo from './../../assets/images/logo.svg';
 *
 */

//-----------------------|| LOGO SVG ||-----------------------//

const Logo = () => {

    return (
         
          <img src={logo} style={{
              borderRadius:50
          }} alt="Berry" width="100" height="50" />
        
        
            
    );
};

export default Logo;

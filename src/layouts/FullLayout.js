import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Auth from './Auth';
import Admin from './ADMIN/AdminLayout';
import Flotte from './FLOTTE/FlotteLayout';
import axios from 'axios';
import { registerApi } from 'utils/apis';
import Ecole from './ECOLE/EcoleLayout';

function FullLayout(props) {
    const user = useSelector(state=>state.user.userData)
    
  
    return (
        <div>
            {
                user ? <>
                   {
                    user.role==='admin' && <Admin />
                   }
                    {
                    user.role==='flotte' && <Flotte />
                   }

                    {
                    user.role==='ecole' && <Ecole />
                   }
                </> : <>
                  <Auth />
                </>
            }
        </div>
    );
}

export default FullLayout;
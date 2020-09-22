import React, {useContext} from 'react'
import { GeoApiContext } from '../GeoApiContext/GeoApiContext'

export default (WrappedComponent) => {
  return ({ ...props }) => {
    const geoApi = useContext(GeoApiContext); 
    return <WrappedComponent geoApi={geoApi} {...props} />
}   
}

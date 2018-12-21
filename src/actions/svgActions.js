// import each action type into the actions
import * as actionTypes from '../constants/actionTypes';
export const svgRenderingFinished = (svgString) => {
    return {
      type: SVG_RENDERING_FINISHED,
      payload: svgString,
    };
}
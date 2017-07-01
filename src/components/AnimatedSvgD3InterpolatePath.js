import React, { Component } from 'react';
import { Svg } from 'expo';
import * as d3 from 'd3-interpolate-path';
import AnimatedSvgFix from './AnimatedSvgFix';

/**
 * Problem: What is the best way to animate a path with animated.value?
 * Solution: This demonstrates how you can do it with d3 interpolate
 */

const NativeSvgPath = Svg.Path;

function createInterpolator(props) {
    return d3.interpolatePath(props.d1, props.d2);
}

class SvgD3InterpolatePath extends Component {
    static defaultProps = {
        t: 0
    }
    constructor(props) {
        super(props);
        this.interpolator = createInterpolator(props);
    }
    setNativeProps = (props) => {
        if (props.t) {
            props.d = this.interpolator(props.t);
        }
        this._component && this._component.setNativeProps(props);
    }
    componentWillReceiveProps(nextProps) {
        this.interpolator = createInterpolator(nextProps);
    }
    render() {
        const { t, ...props } = this.props;
        const d = this.interpolator(t);
        return (
            <NativeSvgPath
                ref={component => (this._component = component)}
                {...props}
                d={d}
            />
        );
    }
}
SvgD3InterpolatePath = AnimatedSvgFix(SvgD3InterpolatePath);
export default SvgD3InterpolatePath;

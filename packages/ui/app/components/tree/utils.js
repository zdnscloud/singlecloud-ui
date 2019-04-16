import { pointRadial } from 'd3-shape';

export function findCollapsedParent(node) {
  if (!node.data.isExpanded) {
    return node;
  }
  if (node.parent) {
    return findCollapsedParent(node.parent);
  }
  return null;
}

export function getTopLeft(node, layout, orientation) {
  if (layout === 'polar') {
    const [radialX, radialY] = pointRadial(node.x, node.y);
    return {
      top: radialY,
      left: radialX,
    };
  }
  if (orientation === 'vertical') {
    return {
      top: node.y,
      left: node.x,
    };
  }
  return {
    top: node.x,
    left: node.y,
  };
}

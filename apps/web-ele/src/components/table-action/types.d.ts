import type { VNode } from 'vue';

import { TooltipProps } from 'element-plus';

export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: string;
}
export interface ActionItem {
  type?: 'danger' | 'info' | 'primary' | 'success' | 'warning';
  link?: boolean;
  size?: 'large' | 'medium' | 'mini' | 'small';
  onClick?: Fn;
  label?: string;
  color?: 'error' | 'success' | 'warning';
  icon?: string | VNode;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  auth?: string[];
  // 业务控制是否显示
  ifShow?: ((action: ActionItem) => boolean) | boolean;
  tooltip?: string | TooltipProps;
}

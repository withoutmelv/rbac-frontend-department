import { h } from 'vue';

import { globalShareState } from '@vben/common-ui';
import { setupVbenVxeTable, useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { Button, Image } from 'ant-design-vue';

import { componentMap } from '#/components/view/component-map';
import { get } from '#/util/tool';

import { modelPropNameMap, useVbenForm } from './form';
/**
 * 检查触发源是否属于目标节点
 */
function getEventTargetNode(
  evnt: any,
  container: HTMLElement,
  className: string,
) {
  let targetElem;
  let target = evnt.target;
  while (target && target.nodeType && target !== document) {
    if (
      className &&
      target.className &&
      target.className.split &&
      target.className.split(' ').includes(className)
    ) {
      targetElem = target;
    } else if (target === container) {
      return {
        flag: className ? !!targetElem : true,
        container,
        targetElem,
      };
    }
    target = target.parentNode;
  }
  return { flag: false };
}

/**
 * 事件兼容性处理
 */
function handleClearEvent(params: any) {
  const { $event } = params;
  const bodyElem = document.body;
  if (
    // 下拉框
    getEventTargetNode($event, bodyElem, 'ant-select-dropdown').flag ||
    // 级联
    getEventTargetNode($event, bodyElem, 'ant-cascader-menus').flag ||
    // 日期
    getEventTargetNode($event, bodyElem, 'ant-picker-dropdown').flag ||
    getEventTargetNode($event, bodyElem, 'ant-calendar-picker-container')
      .flag ||
    // 时间选择
    getEventTargetNode($event, bodyElem, 'ant-time-picker-panel').flag
  ) {
    return false;
  }
}

function initVxeTable() {
  setupVbenVxeTable({
    configVxeTable: (vxeUI) => {
      vxeUI.setConfig({
        grid: {
          align: 'center',
          border: false,
          columnConfig: {
            resizable: true,
          },
          minHeight: 180,
          formConfig: {
            // 全局禁用vxe-table的表单配置，使用formOptions
            enabled: false,
          },
          proxyConfig: {
            autoLoad: true,
            response: {
              result: 'rows',
              total: 'recordCount',
              list: 'rows',
            },
            showActiveMsg: true,
            showResponseMsg: false,
          },
          round: true,
          showOverflow: true,
          size: 'small',
        },
      });
      vxeUI.interceptor.add('event.clearFilter', handleClearEvent);
      vxeUI.interceptor.add('event.clearEdit', handleClearEvent);
      vxeUI.interceptor.add('event.clearAreas', handleClearEvent);
      // 表格配置项可以用 cellRender: { name: 'CellImage' },
      vxeUI.renderer.add('CellImage', {
        renderTableDefault(_renderOpts, params) {
          const { column, row } = params;
          return h(Image, { src: row[column.field] });
        },
      });

      // 表格配置项可以用 cellRender: { name: 'CellLink' },
      vxeUI.renderer.add('CellLink', {
        renderTableDefault(renderOpts) {
          const { props } = renderOpts;
          return h(
            Button,
            { size: 'small', type: 'link' },
            { default: () => props?.text },
          );
        },
      });
      // 注册@/components/view/下面所有列渲染器
      componentMap.forEach((comp, key) => {
        // 创建一个渲染器
        vxeUI.renderer.add(key, {
          // 默认显示模板
          renderDefault(renderOpts, params) {
            const { row, column } = params;
            return h(comp, {
              ...renderOpts.props,
              value: get(row, column.field),
            });
          },
        });
      });
      // 这里可以自行扩展 vxe-table 的全局配置，比如自定义格式化
      // vxeUI.formats.add
      // 增加编辑组件
      const components = globalShareState.getComponents();
      Object.keys(components).forEach((key: any) => {
        const comp = components[key];
        const modelPropName = modelPropNameMap[key] || 'value';
        vxeUI.renderer.add(key, {
          renderTableEdit(renderOpts, params) {
            const { row, column, $table } = params;
            return h(comp, {
              ...renderOpts.props,
              [modelPropName]: row[column.field],
              [`onUpdate:${modelPropName}`]: (value: any) => {
                params.row[params.column.field] = value;
                $table.updateStatus(params);
              },
            });
          },
          // 可编辑显示模板
          renderTableCell(renderOpts, params) {
            const { props } = renderOpts;
            const comp = (componentMap as any).get(renderOpts.name as any);
            const { column, row } = params;
            const value = get(row, column.field);
            return comp
              ? h(comp, {
                  ...props,
                  value,
                })
              : value;
          },
        });
      });
    },
    useVbenForm,
  });
}

export { initVxeTable, useVbenVxeGrid };

export type * from '@vben/plugins/vxe-table';

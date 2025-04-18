const modules: any = import.meta.glob('./**/*.ts', { eager: true });
export const componentData: any[] = [];
export const componentPropsData: any[] = [
  {
    fieldName: 'componentConfig',
    label: '组件配置',
    component: 'Divider',
    formItemClass: 'col-span-12',
    componentProps: {},
    hideLabel: true,
    renderComponentContent: () => {
      return {
        default: () => {
          return '组件配置';
        },
      };
    },
    dependencies: {
      triggerFields: ['component'],
      if: (values: any) => {
        return componentData.some((item) =>
          item?.props?.some((itemm: any) => itemm?.dependencies?.if(values)),
        );
      },
    },
    ifDetail(e: any) {
      return componentData.some((item) =>
        item?.props?.some((itemm: any) => itemm?.ifDetail(e)),
      );
    },
  },
];
Object.keys(modules).forEach((key) => {
  if (!key.endsWith('index.ts')) {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    componentData.push(...modList);
    modList.forEach((item) => {
      const props = item.props || [];
      props.forEach((itemm: any) => {
        // 子项追加ifShow控制是否显示
        itemm.dependencies = {
          triggerFields: ['component'],
          if: (values: any) => {
            return values.component === item.value;
          },
          ...itemm.dependencies,
        };
        const ifDetail = itemm.ifDetail;
        itemm.ifDetail = (e: any) => {
          if (ifDetail && typeof ifDetail === 'function') {
            return ifDetail(e);
          }
          return e?.values?.component === item.value;
        };
        // 子项key增加组件名称前辍，例：ext.Input_type
        itemm.fieldName = itemm.fieldName.replace('ext.', `ext.${item.value}_`);
      });
      componentPropsData.push(...props);
    });
  }
});

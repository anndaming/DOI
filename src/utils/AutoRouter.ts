export type TypeRoute = {
    path: string,
    component: any,
    meta: { title?: string, icon?: string },
}

const context = require.context("../pages", true, /index\.tsx$/);
const paths: string[] = context.keys(); // 获取了所有文件的路径
const routes: TypeRoute[] = paths.map(path => {
    // 批量获取引入的组件
    const component: any = context(path).default;
    // 组件扩展属性方便渲染菜单
    const meta = component['meta'] || {};
    // 生成预期中的路由Path：如/WorksDOI
    path = path.substr(1).replace(/(\/index\.tsx)$/, "");
    return {path, component, meta};
});

export default routes;
